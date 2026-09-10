import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Phone, Check, PackageSearch } from 'lucide-react';
import Loader from '../Loader';
import { Button, Card, EmptyState } from '../ui';

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

const TrackOrder = () => {
    const [phoneNo, setPhoneNo] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        if (!phoneNo || phoneNo.length < 10) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post(`${frontendUrl}/order/track`, { phoneNo });
            setOrders(data.orders);
            setHasSearched(true);
            setLoading(false);
        } catch (error) {
            setOrders([]);
            setHasSearched(true);
            setLoading(false);
            toast.error(error.response?.data?.message || "Order not found");
        }
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'Processing': return 1;
            case 'Shipped': return 2;
            case 'Delivered': return 3;
            default: return 1;
        }
    };

    const STATUS_LABELS = ['Processing', 'Shipped', 'Delivered'];

    return (
        <div className="min-h-screen bg-paper-50 py-16 sm:py-24">
            <div className="section-container max-w-3xl space-y-10">
                {/* Search Header */}
                <div className="rounded-card border border-ink-100 bg-white p-8 text-center shadow-card sm:p-12">
                    <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
                        Track Your Order
                    </h1>
                    <p className="mt-4 text-base text-ink-500 sm:text-lg">
                        Enter your phone number to see the current status of your order.
                    </p>

                    <form onSubmit={handleTrackOrder} className="mx-auto mt-8 max-w-md">
                        <div className="relative">
                            <Phone className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                            <input
                                type="tel"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                placeholder="e.g. 9876543210"
                                className="w-full rounded-xl border border-ink-200 bg-ink-50 py-4 pl-14 pr-4 text-base text-ink-900 outline-none transition focus:border-crimson-500 focus:bg-white focus:ring-2 focus:ring-crimson-100"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            loading={loading}
                            size="lg"
                            className="mt-4 w-full"
                        >
                            {loading ? 'Tracking...' : 'Track Order'}
                        </Button>
                    </form>
                </div>

                {/* Results Section */}
                {loading ? (
                    <Loader />
                ) : (
                    hasSearched && (
                        <div className="space-y-8">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <Card key={order._id} padding="lg">
                                        <div className="flex flex-col justify-between gap-3 border-b border-ink-100 pb-6 sm:flex-row sm:items-center">
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-crimson-600">
                                                    Order #{order.orderNumber || order._id.substring(0, 8)}
                                                </p>
                                                <p className="mt-1 text-sm text-ink-500">
                                                    Placed on{" "}
                                                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}{" "}
                                                    at{" "}
                                                    {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-2xl font-bold text-ink-900">
                                                ₹{order.totalPrice}
                                            </div>
                                        </div>

                                        {/* Stepper Timeline */}
                                        <div className="relative py-8">
                                            <div className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-ink-100" />
                                            <div
                                                className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-crimson-600 transition-all duration-700"
                                                style={{ width: `${(getStatusStep(order.orderStatus) - 1) * 50}%` }}
                                            />

                                            <div className="relative flex justify-between">
                                                {STATUS_LABELS.map((label, idx) => {
                                                    const step = idx + 1;
                                                    const isDelivered = label === 'Delivered';
                                                    const reached = getStatusStep(order.orderStatus) >= step;
                                                    return (
                                                        <div key={label} className="flex flex-col items-center">
                                                            <div
                                                                className={[
                                                                    "flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold shadow-soft transition-all duration-300 sm:h-12 sm:w-12",
                                                                    reached
                                                                        ? isDelivered
                                                                            ? "scale-110 bg-emerald-500 text-white"
                                                                            : "scale-110 bg-crimson-600 text-white"
                                                                        : "border-2 border-ink-200 bg-white text-ink-400",
                                                                ].join(" ")}
                                                            >
                                                                {reached && isDelivered ? <Check className="h-5 w-5" strokeWidth={3} /> : step}
                                                            </div>
                                                            <p
                                                                className={[
                                                                    "mt-3 text-xs font-bold uppercase tracking-wider sm:text-sm",
                                                                    reached
                                                                        ? isDelivered ? "text-emerald-600" : "text-crimson-600"
                                                                        : "text-ink-400",
                                                                ].join(" ")}
                                                            >
                                                                {label}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Products List */}
                                        <div className="rounded-card border border-ink-100 bg-ink-50 p-5">
                                            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">
                                                Items in Order
                                            </p>
                                            <div className="space-y-3">
                                                {order.orderItems.map((item) => (
                                                    <div
                                                        key={item._id || item.product}
                                                        className="flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-3 shadow-soft"
                                                    >
                                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-ink-100 bg-paper-100">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-full w-full object-contain"
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-semibold text-ink-900">
                                                                {item.name}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-ink-500">
                                                                Qty {item.quantity} &times; ₹{item.price}
                                                            </p>
                                                        </div>
                                                        <p className="shrink-0 text-sm font-bold text-crimson-700">
                                                            ₹{(item.quantity * item.price).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <EmptyState
                                    icon={PackageSearch}
                                    title="No orders found"
                                    description={`We couldn't find any orders associated with ${phoneNo}.`}
                                />
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
