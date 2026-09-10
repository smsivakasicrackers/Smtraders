import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearError,
  clearOrderDeleted,
  clearOrderUpdated,
} from "../../slices/orderSlice";
import { MDBDataTable } from "mdbreact";
import { Modal } from "react-bootstrap";
import { Eye, Download, Trash2, FileSpreadsheet, ClipboardList } from "lucide-react";
import Sidebar from "./Sidebar";
import {
  deleteOrder,
  adminOrders as adminAction,
  updateOrder,
} from "../../actions/orderActions";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button, Badge, EmptyState, TableRowSkeleton } from "../ui";
import "./OrderList.css";

const STATUS_TONE = {
  Pending: "warning",
  Processing: "gold",
  Completed: "success",
};

const statusTone = (status) => STATUS_TONE[status] || "neutral";

const SELECT_CLASSES =
  "rounded-lg border border-ink-200 bg-white px-2 py-1.5 text-sm font-medium text-ink-800 focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100";

const OrderList = () => {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
    isOrderUpdated,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setSelectedOrder(null);
  };

  const handleDownloadInvoice = (order) => {
    const invoiceHtml = `
    <div id="invoice-container" style="
      width: 700px;
      margin: 0 auto;
      font-family: 'Poppins', Arial, sans-serif;
      color: #333;
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      border-radius: 10px;
      border: 1px solid #ddd;
    ">

      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #007bff; padding-bottom: 15px;">
        <div>
          <img src="/images/logo.png" alt="Logo" style="width: 120px;"/>
        </div>
        <div style="text-align: right;">
          <h2 style="margin: 0; color: #007bff;">SM CRACKERS</h2>
          <p style="margin: 2px 0;">4/175/A Sattur to Sivakasi road, Veerapandiyapuram</p>
          <p style="margin: 2px 0;">Near Toll Gate, Sattur - 626203</p>
          <p style="margin: 2px 0;">📞 +91 8903359989 / 6381933039 / 8248450298</p>
        </div>
      </div>

      <!-- Invoice Info -->
      <div style="margin-top: 20px; display: flex; justify-content: space-between; font-size: 14px;">
        <div>
          <p><strong>Invoice No:</strong> ${order._id}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div style="text-align: right;">
          <p><strong>Customer:</strong> ${order.shippingInfo?.name || "N/A"}</p>
          <p><strong>Phone:</strong> ${order.shippingInfo?.phoneNo || "N/A"}</p>
          <p><strong>Address:</strong> ${order.shippingInfo?.address || ""}, ${order.shippingInfo?.city || ""}, ${order.shippingInfo?.state || ""}</p>
        </div>
      </div>

      <!-- Items Table -->
      <div style="page-break-inside: avoid; margin-top: 25px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #007bff; color: #fff;">
              <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">#</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: left;">Product</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: center;">Qty</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">Price (₹)</th>
              <th style="padding: 10px; border: 1px solid #ccc; text-align: right;">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${order.orderItems
              .map(
                (item, index) => `
                <tr style="page-break-inside: avoid;">
                  <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
                  <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <!-- Total -->
      <div style="margin-top: 25px; text-align: right; page-break-inside: avoid;">
        <h3 style="margin: 0; color: #222;">Total Amount: ₹${order.totalPrice.toFixed(2)}</h3>
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; text-align: center; border-top: 1px solid #ddd; padding-top: 10px; font-size: 13px; color: #777; page-break-inside: avoid;">
        <p>Thank you for shopping with <strong>SM CRACKERS</strong> 🎉</p>
        <p>Please verify all items before dispatching.</p>
      </div>
    </div>
    `;

    const options = {
      margin: [20, 10, 20, 10], // Top, Right, Bottom, Left
      filename: `Invoice_${order._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        before: '#invoice-footer', // ensures the footer starts on a new page if cut off
      }
    };

    html2pdf().set(options).from(invoiceHtml).save();
  };




  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrder(orderId, { orderStatus: newStatus }));
  };

  const sortedOrders = [...adminOrders].sort((a, b) => {
    const orderPriority = { Processing: 1, Completed: 2, Delivered: 3 };
    return (orderPriority[a.orderStatus] || 4) - (orderPriority[b.orderStatus] || 4);
  });

  const setOrders = () => {
    const data = {
      columns: [
        { label: "Customer Name", field: "username" },
        { label: "Phone Number", field: "Phoneno" },
        { label: "Items", field: "noofItems" },
        { label: "Amount", field: "Amount" },
        { label: "Status", field: "status" },
        { label: "Invoice", field: "invoice" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };
    sortedOrders.forEach((order) => {
      data.rows.push({
        username: order.shippingInfo?.name || "N/A",
        Phoneno: order.shippingInfo?.phoneNo || "N/A",
        noofItems: order?.orderItems?.length || 0,
        Amount: `₹${order?.totalPrice?.toFixed(2) || "0.00"}`,
        status: (
          <select
            value={order?.orderStatus || "Processing"}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className={SELECT_CLASSES}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        ),
        invoice: (
          <div className="flex flex-col gap-2 md:flex-row">
            <Button
              variant="secondary"
              size="sm"
              icon={Eye}
              onClick={() => handleShowInvoice(order)}
            >
              View
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={() => handleDownloadInvoice(order)}
            >
              Download
            </Button>
          </div>
        ),
        actions: (
          <button
            type="button"
            onClick={() => dispatch(deleteOrder(order._id))}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-white shadow-soft transition hover:bg-red-700"
            aria-label="Delete order"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        ),
      });
    });
    return data;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully!");
      dispatch(clearOrderDeleted());
    }
    if (isOrderUpdated) {
      toast.success("Order Updated Successfully!");
      dispatch(clearOrderUpdated());
    }
    dispatch(adminAction);
  }, [dispatch, error, isOrderDeleted, isOrderUpdated]);

  const handleDownloadAllOrders = () => {
    if (!adminOrders.length) {
      toast.info("No orders to download");
      return;
    }
    const exportData = adminOrders.map((order, index) => ({
      "S.No": index + 1,
      "Customer Name": order.shippingInfo?.name || "N/A",
      "Phone Number": order.shippingInfo?.phoneNo || "N/A",
      Address: order.shippingInfo?.address || "N/A",
      City: order.shippingInfo?.city || "N/A",
      State: order.shippingInfo?.state || "N/A",
      "Postal Code": order.shippingInfo?.postalCode || "N/A",
      "Total Amount (₹)": order.totalPrice ? order.totalPrice.toFixed(2) : "0.00",
      Date: new Date(order.createdAt).toLocaleDateString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `All_Orders_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <Sidebar />

      <main className="p-4 sm:p-6 md:ml-64 lg:p-10">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink-900">Order List</h1>
            <p className="text-sm text-ink-500">
              {loading ? "Loading orders…" : `${adminOrders.length} enquir${adminOrders.length === 1 ? "y" : "ies"} received`}
            </p>
          </div>
          <Button variant="gold" size="sm" icon={FileSpreadsheet} onClick={handleDownloadAllOrders}>
            Download All Orders (Excel)
          </Button>
        </div>

        {loading ? (
          <div className="card-surface overflow-hidden">
            <table className="w-full">
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRowSkeleton key={i} columns={7} />
                ))}
              </tbody>
            </table>
          </div>
        ) : adminOrders.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No enquiries yet"
            description="Orders placed by customers will show up here."
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="card-surface overflow-hidden p-3 md:p-5">
                <div className="overflow-x-auto">
                  <MDBDataTable
                    data={setOrders()}
                    bordered
                    striped
                    hover
                    responsive
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Mobile card fallback */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {sortedOrders.map((order) => (
                <div key={order._id} className="card-surface p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink-900">
                        {order.shippingInfo?.name || "N/A"}
                      </p>
                      <p className="text-sm text-ink-500">{order.shippingInfo?.phoneNo || "N/A"}</p>
                    </div>
                    <Badge tone={statusTone(order.orderStatus)}>
                      {order.orderStatus || "Processing"}
                    </Badge>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-ink-600">
                    <span>{order?.orderItems?.length || 0} items</span>
                    <span className="font-display text-base font-semibold text-ink-900">
                      ₹{order?.totalPrice?.toFixed(2) || "0.00"}
                    </span>
                  </div>

                  <div className="mt-3">
                    <select
                      value={order?.orderStatus || "Processing"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`${SELECT_CLASSES} w-full`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" icon={Eye} onClick={() => handleShowInvoice(order)}>
                      View
                    </Button>
                    <Button variant="primary" size="sm" icon={Download} onClick={() => handleDownloadInvoice(order)}>
                      Download
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => dispatch(deleteOrder(order._id))}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Invoice Modal */}
        <Modal show={showInvoice} onHide={handleCloseInvoice} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder ? (
              <div className="text-ink-700">
                <h3 className="mb-2 font-display text-xl font-semibold text-ink-900">SM CRACKERS</h3>
                <p className="mb-4 text-sm">
                  4/175/A Sattur to Sivakasi road, Veerapandiyapuram<br />
                  Near toll gate, Sattur - 626203<br />
                  Phone: +91 8903359989 / 8248450298
                </p>
                <hr className="my-3 border-ink-100" />
                <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <p><strong>Name:</strong> {selectedOrder.shippingInfo?.name}</p>
                  <p><strong>Phone:</strong> {selectedOrder.shippingInfo?.phoneNo}</p>
                  <p><strong>Address:</strong> {selectedOrder.shippingInfo?.address}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <table className="w-full border border-ink-200 text-sm">
                  <thead className="bg-ink-50">
                    <tr>
                      <th className="border border-ink-200 p-2">#</th>
                      <th className="border border-ink-200 p-2">Product</th>
                      <th className="border border-ink-200 p-2">Qty</th>
                      <th className="border border-ink-200 p-2">Price</th>
                      <th className="border border-ink-200 p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderItems.map((item, i) => (
                      <tr key={i} className="border-t border-ink-100">
                        <td className="border border-ink-200 p-2">{i + 1}</td>
                        <td className="border border-ink-200 p-2">{item.name}</td>
                        <td className="border border-ink-200 p-2">{item.quantity}</td>
                        <td className="border border-ink-200 p-2">₹{item.price}</td>
                        <td className="border border-ink-200 p-2">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right font-display text-lg font-semibold text-ink-900">
                  Total: ₹{selectedOrder.totalPrice}
                </div>
                <Button
                  variant="primary"
                  icon={Download}
                  onClick={() => handleDownloadInvoice(selectedOrder)}
                  className="mt-3"
                >
                  Download Invoice
                </Button>
              </div>
            ) : (
              <p>No Invoice Available</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseInvoice}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default OrderList;
