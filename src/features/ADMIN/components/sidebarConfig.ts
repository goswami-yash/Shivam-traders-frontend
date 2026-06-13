import {
    Truck,
    Car,
    Users,
    Building2,
    Settings,
    UserCog,
  } from "lucide-react";
  
  export const sidebarMenus = [
    {
      title: "Master Data",
      items: [
        {
          name: "Drivers",
          path: "/admin-action/drivers",
          icon: Truck,
        },
        {
          name: "Vehicles",
          path: "/admin-action/vehicles",
          icon: Car,
        },
        {
          name: "Customers",
          path: "/admin-action/customers",
          icon: Users,
        },
        {
          name: "Suppliers",
          path: "/admin-action/suppliers",
          icon: Building2,
        },
      ],
    },
  
  
    {
      title: "Administration",
      items: [
        {
          name: "Users",
          path: "/admin-action/users",
          icon: UserCog,
        },
        {
          name: "Settings",
          path: "/admin-action/settings",
          icon: Settings,
        },
      ],
    },
  ];