import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download, MessageCircle } from "lucide-react";

import { createOrder } from "../../actions/orderActions";
import { orderCompleted } from "../../slices/cartSlice";
import { BRAND } from "../../constants/brand";

import { useNavigate } from "react-router-dom";

import Footer from "../footer/Footer";
import CheckoutSteps from "./CheckoutSteps";

const Payment = () => {
    const { shippingInfo: liveShippingInfo, items: liveCartItems } = useSelector((state) => state.cartState);
    const { orderDetail } = useSelector((state) => state.orderState);

    // Snapshot the cart/shipping data the moment we arrive so the invoice keeps
    // rendering correctly after we clear the live cart post-order.
    const [snapshot] = useState(() => ({ items: liveCartItems, shippingInfo: liveShippingInfo }));
    const cartItems = snapshot.items;
    const shippingInfo = snapshot.shippingInfo;

    const invoiceRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orderCreated, setOrderCreated] = useState(false);
    const cartClearedRef = useRef(false);
    // orderDetail is global state and may already hold a *previous* order's id
    // when this page mounts — remember that so we only react to a genuinely
    // new order id appearing, not a stale one left over from earlier.
    const priorOrderIdRef = useRef(orderDetail?._id);

    const calculateTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const calculateDiscount = () => cartItems.reduce((acc, item) => acc + (item.discount || 0) * item.quantity, 0) || 0;
    const calculateNetTotal = () => calculateTotal() - calculateDiscount();

    useEffect(() => {
        // Prevent browser back to cart/checkout
        const handlePopState = () => {
            navigate("/", { replace: true });
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [navigate]);

    // Place the order exactly once per visit to this page, using the snapshot
    // taken on mount (not the live cart, which we intentionally empty below).
    useEffect(() => {
        if (cartItems.length === 0) {
            // Nothing to order (e.g. a stale/duplicate visit after an order was
            // already placed and the cart cleared) — send them somewhere useful
            // instead of creating a blank/duplicate order.
            navigate("/Mycart", { replace: true });
            return;
        }

        const order = {
            orderItems: cartItems,
            shippingInfo,
            totalPrice: calculateNetTotal(),
        };
        dispatch(createOrder(order));
        setOrderCreated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Once the order is confirmed created server-side, clear the live cart so
    // this page (or a stale back/forward navigation to it) can't resubmit it.
    useEffect(() => {
        if (
            orderCreated &&
            orderDetail?._id &&
            orderDetail._id !== priorOrderIdRef.current &&
            !cartClearedRef.current
        ) {
            cartClearedRef.current = true;
            dispatch(orderCompleted());
        }
    }, [orderCreated, orderDetail, dispatch]);

    useEffect(() => {
        invoiceRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const downloadPDF = async () => {
        const invoiceElement = invoiceRef.current;
        if (!invoiceElement) return;

        // Make sure content fits page width
        invoiceElement.style.width = "210mm";

        // Create canvas with scaling
        const canvas = await html2canvas(invoiceElement, {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: -window.scrollY
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save("invoice.pdf");
      };


    return (
        <div>
            <CheckoutSteps current={4} />

            {/* Honest "enquiry received" banner — no online payment is processed here */}
            <div className="section-container pt-8">
                <div className="mx-auto max-w-2xl rounded-card border-2 border-crimson-200 bg-crimson-50 px-6 py-5 text-center">
                    <h3 className="font-display text-base font-semibold text-crimson-900 sm:text-lg">
                        Thank you for your enquiry! To confirm your order,{" "}
                        <strong>download the PDF invoice and send it to us</strong> via WhatsApp.
                    </h3>
                    <p className="mt-2 text-sm text-crimson-800">
                        GPay: <span className="font-semibold">{BRAND.phones.primary}</span>
                        {" "}&middot;{" "}
                        Contact: <span className="font-semibold">{BRAND.phones.secondary}</span>
                    </p>
                </div>
            </div>

            {/* Invoice Section — kept print/PDF friendly for html2canvas capture */}
            <div
                ref={invoiceRef}
                className="mx-auto mt-8 max-w-3xl border border-ink-200 bg-white p-6 sm:p-10"
            >
                <div className="border-b-2 border-ink-900 pb-4 text-center">
                    <img
                        src="/images/logo.png"
                        alt={BRAND.name}
                        className="mx-auto h-16 w-auto object-contain"
                    />
                    <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-ink-900">
                        {BRAND.name}
                    </h1>
                    <p className="mt-2 text-sm text-ink-600">
                        Address: {BRAND.address.full}
                        <br />
                        Phone: {BRAND.phones.primary} / {BRAND.phones.secondary}
                    </p>
                </div>

                {/* Customer Details */}
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div>
                        <h5 className="text-sm font-bold uppercase tracking-wide text-ink-900">
                            Customer Details
                        </h5>
                        <p className="mt-2 text-sm text-ink-700">
                            <strong className="text-ink-900">Name:</strong> {shippingInfo?.name || "Guest"}
                        </p>
                        <p className="text-sm text-ink-700">
                            <strong className="text-ink-900">Phone:</strong> {shippingInfo?.phoneNo || "Not Provided"}
                        </p>
                        <p className="text-sm text-ink-700">
                            <strong className="text-ink-900">Address:</strong> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.state}, {shippingInfo?.country}
                        </p>
                    </div>
                    <div className="text-sm text-ink-700 sm:text-right">
                        <p><strong className="text-ink-900">Order Id:</strong> {orderDetail?.orderNumber || "Loading..."}</p>
                        <p><strong className="text-ink-900">Date:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Order Table */}
                <table className="mt-6 w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-ink-50">
                            <th className="border border-ink-200 px-3 py-2 text-center font-semibold text-ink-900">#</th>
                            <th className="border border-ink-200 px-3 py-2 text-center font-semibold text-ink-900">Product</th>
                            <th className="border border-ink-200 px-3 py-2 text-center font-semibold text-ink-900">Quantity</th>
                            <th className="border border-ink-200 px-3 py-2 text-center font-semibold text-ink-900">Rate</th>
                            <th className="border border-ink-200 px-3 py-2 text-center font-semibold text-ink-900">Discount</th>
                            <th className="border border-ink-200 px-3 py-2 text-center font-semibold text-ink-900">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-ink-200 px-3 py-2 text-center text-ink-700">{index + 1}</td>
                                <td className="border border-ink-200 px-3 py-2 text-center text-ink-700">{item.name}</td>
                                <td className="border border-ink-200 px-3 py-2 text-center text-ink-700">{item.quantity}</td>
                                <td className="border border-ink-200 px-3 py-2 text-center text-ink-700">₹{item.price.toFixed(2)}</td>
                                <td className="border border-ink-200 px-3 py-2 text-center text-ink-700">₹{((item.discount || 0) * item.quantity).toFixed(2)}</td>
                                <td className="border border-ink-200 px-3 py-2 text-center font-medium text-ink-900">₹{(item.price * item.quantity - (item.discount || 0) * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Summary */}
                <div className="mt-6 flex flex-wrap justify-end gap-x-6 gap-y-1 text-sm text-ink-800">
                    <p><strong className="text-ink-900">Total Items:</strong> {cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0}</p>
                    <p><strong className="text-ink-900">Total:</strong> ₹{calculateTotal().toFixed(2)}</p>
                    <p><strong className="text-ink-900">Discount:</strong> -₹{calculateDiscount().toFixed(2)}</p>
                    <p className="font-semibold text-crimson-700"><strong className="text-ink-900 font-semibold">Net Total:</strong> ₹{calculateNetTotal().toFixed(2)}</p>
                </div>
                <p className="mt-3 text-right text-sm italic text-red-600">
                    Note: Extra 3% additional will be charged for packing.
                </p>

                {/* Footer */}
                <div className="mt-10 border-t border-ink-200 pt-4 text-center text-xs text-ink-500">
                    <p>THANK YOU FOR SHOPPING WITH US!</p>
                    <p>{BRAND.address.full}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mx-auto mt-8 mb-12 flex max-w-2xl flex-col gap-4 px-4 sm:flex-row sm:justify-center">
                <button
                    onClick={downloadPDF}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 py-4 font-bold text-white shadow-soft transition-colors hover:bg-ink-800"
                >
                    <Download className="h-5 w-5" />
                    Download PDF Invoice
                </button>

                <button
                    onClick={() => {
                        const message = `Hello SM Crackers! 🎇\n\nI have successfully placed an order.\n*Order ID:* ${orderDetail?.orderNumber || "Pending"}\n*Total Amount:* ₹${calculateNetTotal().toFixed(2)}\n*Name:* ${shippingInfo?.name}\n\nPlease process my order!`;
                        const whatsappUrl = `https://wa.me/${BRAND.whatsapp.orderNotify}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                    <MessageCircle className="h-5 w-5" />
                    Notify Admin via WhatsApp
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default Payment;
