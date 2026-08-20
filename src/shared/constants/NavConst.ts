import { Info, LayoutDashboard, ListOrdered,  ShieldCheck, ShoppingBag, Users } from "lucide-react";

export   const navLinks = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/orders", label: "Orders", icon: ShoppingBag },
    { path: "/Order-list", label: "Order List", icon: ListOrdered },
    { path: "/user-manage", label: "Users", icon: Users },
    { path: "/admin-action", label: "Admin", icon: ShieldCheck },
    { path: "/about", label: "About", icon: Info },
  ];