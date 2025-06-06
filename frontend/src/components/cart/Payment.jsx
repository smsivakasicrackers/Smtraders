import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderActions";
import { clearCart } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../footer/Footer";
import "./Invoice.css";

const Payment = () => {
    const { shippingInfo, items: cartItems } = useSelector((state) => state.cartState);
    const { user } = useSelector((state) => state.authState);
    const { orderDetail } = useSelector((state) => state.orderState);
    
    const invoiceRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orderCreated, setOrderCreated] = useState(false);

    const calculateTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const calculateDiscount = () => cartItems.reduce((acc, item) => acc + (item.discount || 0) * item.quantity, 0) || 0;
    const calculateNetTotal = () => calculateTotal() - calculateDiscount();

    useEffect(() => {
        // Prevent page reload duplicate
        if (performance.navigation.type === 1) {
            navigate("/", { replace: true });
        }

        // Prevent browser back to cart/checkout
        const handlePopState = () => {
            navigate("/", { replace: true });
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [navigate]);

    useEffect(() => {
        if (!orderCreated) {
            const order = {
                orderItems: cartItems,
                shippingInfo,
                totalPrice: calculateNetTotal(),
            };
            dispatch(createOrder(order));
            setOrderCreated(true);
        }

        if (orderDetail && orderDetail._id) {
            const invoiceData = {
                orderId: orderDetail._id,
                companyName: "SM CRACKERS",
                companyAddress: "4/89 Vallalar Street, Abirami Nagar, Sennelur, Chennai 600056",
                companyPhone: "6381933039 / 8248450298",
                customerName: shippingInfo.name,
                customerPhone: shippingInfo.phoneNo,
                customerAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`,
                orderItems: cartItems.map((item, index) => ({
                    index: index + 1,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    discount: item.discount || 0,
                    total: (item.price * item.quantity - (item.discount || 0) * item.quantity).toFixed(2),
                })),
                totalAmount: `₹${calculateNetTotal().toFixed(2)}`,
                orderDate: new Date().toLocaleDateString(),
            };

            axios.post("https://smtraders.onrender.com/api/v1/admin/upload-invoice", invoiceData, {
                headers: { "Content-Type": "application/json" },
            })
                .then(() => {
                    toast.success("Invoice sent to admin!");
                    dispatch(clearCart());
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("shippingInfo");

                    setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 8000);
                })
                .catch((error) => {
                    console.error("Failed to send invoice:", error);
                    toast.error("Failed to send invoice to Admin.");
                });
        }
    }, [orderDetail, orderCreated, dispatch, cartItems, shippingInfo, navigate]);

    useEffect(() => {
        invoiceRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const downloadPDF = async () => {
        const invoiceElement = invoiceRef.current;
        if (!invoiceElement) return;

        const canvas = await html2canvas(invoiceElement);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
        pdf.save("invoice.pdf");
    };

    return (
        <div>
            <div className="alert-box">
                <h3>
                    Thank You For Your Enquiry. To Confirm the Order, <strong>Download the PDF and send it</strong>. 
                    Gpay - 8903359989 | Contact: 8248450298
                </h3>
            </div>

            {/* Invoice Section */}
            <div className="invoice-container" ref={invoiceRef}>
                <div className="invoice-header">
                    <h1>SM CRACKERS</h1>
                    <p>
                        Address: 4/89 Vallalar Street, Abirami Nagar, Sennelur, Chennai 600056<br />
                        Phone: 6381933039 / 8248450298
                    </p>
                </div>

                {/* Customer Details */}
                <div className="customer-details d-flex">
                    <div className="left">
                        <h5>Customer Details</h5>
                        <p><strong>Name:</strong> {shippingInfo?.name || "Guest"}</p>
                        <p><strong>Phone:</strong> {shippingInfo?.phoneNo || "Not Provided"}</p>
                        <p><strong>Address:</strong> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.state}, {shippingInfo?.country}</p>
                    </div>
                    <div className="invoice-details">
                        <p><strong>Order Id:</strong> {orderDetail?._id || "Loading..."}</p>
                        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Order Table */}
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price.toFixed(2)}</td>
                                <td>₹{((item.discount || 0) * item.quantity).toFixed(2)}</td>
                                <td>₹{(item.price * item.quantity - (item.discount || 0) * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Summary */}
                <div className="invoice-summary">
                    <p><strong>Total Items:</strong> {cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0}</p>
                    <p><strong>Total:</strong> ₹{calculateTotal().toFixed(2)}</p>
                    <p><strong>Discount:</strong> -₹{calculateDiscount().toFixed(2)}</p>
                    <p><strong>Net Total:</strong> ₹{calculateNetTotal().toFixed(2)}</p>
                </div>

                {/* Footer */}
                <div className="invoice-footer">
                    <p>__________________________________________________________________</p>
                    <p>THANK YOU FOR SHOPPING WITH US!</p>
                    <p>NO: 3/1232/20, Sri Thirupathi Nagar, Parapatti, Sivakasi-89</p>
                </div>
            </div>

            {/* Download Button */}
            <div className="button">
                <button onClick={downloadPDF}>Download PDF</button>
            </div>

            <Footer />
        </div>
    );
};

export default Payment;
