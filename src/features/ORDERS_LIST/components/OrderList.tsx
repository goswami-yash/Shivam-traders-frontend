import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderList } from "@/features/ORDERS_LIST/services/OrdersService";
import CreateOrder from "@/features/ORDERS/components/CreateOrder";

export default function OrderList() {
    const [orders, setOrders] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await getOrderList();
        setOrders(res?.result || []);
    };

    

    return (
        <div className="min-h-screen bg-[#f5f7fb] p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 pb-15 p-4 flex flex-col ">
                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Last Orders
                    </h1>

                    {/* List */}
                    <div className="space-y-5 "  >
                        {orders.map((order, index) => (
                   <div
                   key={order.id}
                   className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-5 
                              flex flex-col md:flex-row md:items-center md:justify-between 
                              gap-4 hover:shadow-md transition"
                 >
                   {/* Left */}
                   <div className="flex items-center gap-4">
                     <div className="text-gray-400 font-medium">
                       #{index + 1}
                     </div>
                 
                     <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                       <span className="text-sm text-gray-400">
                         Order ID:
                       </span>
                       <span className="text-lg font-semibold text-gray-800">
                         {order.order_number}
                       </span>
                     </div>
                   </div>
                 
                   {/* Buttons */}
                   <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                     <button
                       onClick={() => navigate(`/Add-diesel?id=${order.order_number}`)}
                       className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#359409] text-white font-medium hover:bg-[#1dd826] transition"
                     >
                       Diesel
                     </button>
                 
                     <button
                       onClick={() => navigate(`/select-order?id=${order.order_number}`)}
                       className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8] transition"
                     >
                       Edit
                     </button>
                   </div>
                 </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}