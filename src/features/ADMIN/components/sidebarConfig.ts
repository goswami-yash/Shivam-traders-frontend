import {
  Truck,
  Car,
  Users,
  UserRound,
  Package,
  Map,
  Handshake,
  Bus,
  HardHat,
  Link,
  MapPinned,
  BadgeIndianRupee,
  Wallet,
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
        name: "Customer",
        path: "/admin-action/customer",
        icon: Users,
      },
      {
        name: "Supplier",
        path: "/admin-action/supplier",
        icon: UserRound,
      },
      {
        name: "Item",
        path: "/admin-action/item",
        icon: Package,
      },
      {
        name: "Plots",
        path: "/admin-action/plots",
        icon: Map,
      },
      {
        name: "Partners",
        path: "/admin-action/partners",
        icon: Handshake,
      },
      {
        name: "Transporters",
        path: "/admin-action/transporters",
        icon: Bus,
      },
      {
        name: "Labours",
        path: "/admin-action/labours",
        icon: HardHat,
      },
    ],
  },

  {
    title: "Assignments",
    items: [
      {
        name: "Vehicle Assignment",
        path: "/admin-action/vehicle-assignments",
        icon: Link,
      },
      {
        name: "Customer Address",
        path: "/admin-action/customer-addresses",
        icon: MapPinned,
      },
      {
        name: "Customer Item Price",
        path: "/admin-action/customer-item-prices",
        icon: BadgeIndianRupee,
      },
      {
        name: "Customer Payment",
        path: "/admin-action/customer-payments",
        icon: Wallet,
      },
      {
        name: "Supplier Address",
        path: "/admin-action/supplier-addresses",
        icon: MapPinned,
      },
      {
        name: "Supplier Item Price",
        path: "/admin-action/supplier-item-prices",
        icon: BadgeIndianRupee,
      },
      {
        name: "Supplier Payment",
        path: "/admin-action/supplier-payments",
        icon: Wallet,
      },
      {
        name: "Labour Plot Assignment",
        path: "/admin-action/labour-plot-assignments",
        icon: Link,
      },
    ],
  },
];