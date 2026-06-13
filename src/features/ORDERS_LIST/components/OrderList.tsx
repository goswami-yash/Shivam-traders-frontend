import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderList } from "@/features/ORDERS_LIST/services/OrdersService";

export default function OrderList() {
    const [orders, setOrders] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await getOrderList();
        // Console log here to inspect your data format structure in browser tools:
        console.log("Order List API Response:", res?.result);
        setOrders(res?.result || []);
    };

    return (
        <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col">
                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Last Orders
                    </h1>

                    {/* List Container */}
                    <div className="space-y-4">
                        {orders.map((item, index) => {
                            // Safe Extraction: Support both flat formats and nested 'order' structures
                            const currentOrder = item.order ? item.order : item;
                            const databaseId = currentOrder.id;
                            const displayOrderNumber = currentOrder.order_number || item.order_number;
                            const displayVehicleNumber = currentOrder.vehicle_number || item.vehicle_number;
                            const displayDriverName = currentOrder.driver_name || item.driver_name;

                            return (
                                <div
                                    key={databaseId || index}
                                    className="bg-white rounded-2xl border border-gray-200 p-4 md:p-5 
                                               flex flex-col lg:flex-row lg:items-center lg:justify-between 
                                               gap-5 hover:shadow-md transition"
                                >
                                    {/* Left Side Content Wrapper */}
                                    <div className="flex items-start sm:items-center gap-4 flex-1 w-full">
                                        {/* Index Number */}
                                        <div className="text-sm font-semibold bg-gray-100 text-gray-500 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                                            {index + 1}
                                        </div>

                                        {/* Responsive Info Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 w-full">
                                            {/* Order ID Label */}
                                            <div className="flex flex-col justify-center">
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                                                    Order ID
                                                </span>
                                                <span className="text-base font-semibold text-gray-800 break-all">
                                                    {displayOrderNumber}
                                                </span>
                                            </div>

                                            {/* Vehicle Number */}
                                            <div className="flex flex-col justify-center">
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                                                    Vehicle Number
                                                </span>
                                                <span className="text-base font-semibold text-gray-800">
                                                    {displayVehicleNumber}
                                                </span>
                                            </div>

                                            {/* Driver Name */}
                                            <div className="flex flex-col justify-center">
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                                                    Driver Name
                                                </span>
                                                <span className="text-base font-semibold text-gray-800">
                                                    {displayDriverName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side Action Buttons */}
                                    <div className="flex items-center gap-3 w-full lg:w-auto border-t border-gray-100 pt-4 lg:border-t-0 lg:pt-0 shrink-0">
                                        <button
                                            onClick={() => navigate(`/Add-diesel?id=${displayOrderNumber}`)}
                                            className="flex-1 lg:flex-initial px-5 py-2.5 rounded-xl bg-[#359409] text-white font-medium hover:bg-[#2e8208] active:scale-95 transition text-center text-sm"
                                        >
                                            Diesel
                                        </button>

                                        <button
                                            onClick={() => {
                                                // If database integer ID is present, use it. Otherwise, pass the alphanumeric number.
                                                const targetId = databaseId || displayOrderNumber;
                                                navigate(`/select-order?id=${targetId}`);
                                            }}
                                            className="flex-1 lg:flex-initial px-5 py-2.5 rounded-xl bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8] active:scale-95 transition text-center text-sm"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}