import {
  Asterisk,
  Building2,
  ClipboardList,
  ClipboardPen,
  Database,
  FileArchive,
  FileText,
  FileType,
  GraduationCap,
  HardDriveUpload,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  LogIn,
  MapPin,
  RefreshCcw,
  Scale,
  School,
  School2,
  Settings,
  ShieldHalf,
  Trash2Icon,
  Users,
  UsersRound,
} from "lucide-react";

export const mainNav = [
  {
    name: "Dashboard",
    basePath: "/",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Create Order",
    basePath: "/create-order",
    href: "/create-order",
    icon: Settings,
  },
  {
    name: "Order List",
    basePath: "/Order-list",
    href: "/Order-list",
    icon: Settings,
  },

  // =========================
  // DATA TOOLS
  // =========================
  {
    name: "Data Tools",
    basePath: "/data-tools",
    href: "/data-tools/csv-import",
    icon: Database,
    subMenu: [
      {
        name: "CSV Import",
        href: "/data-tools/csv-import",
        icon: FileText,
      },
      {
        name: "Unapproved HT ZIP",
        href: "/data-tools/unapproved-zip",
        icon: FileArchive,
      },
      {
        name: "Sync",
        href: "/data-tools/sync",
        icon: RefreshCcw,
      },
      {
        name: "Bulk Update",
        basePath: "/bulk-update",
        href: "/bulk-update/students",
        icon: HardDriveUpload,
        subMenu: [
          {
            name: "Student",
            href: "/bulk-update/students",
            icon: UsersRound,
          },
          {
            name: "Truncate Logs",
            href: "/bulk-update/truncate-logs",
            icon: Trash2Icon,
          },
        ],
      },

      //   {
      //     name: "Sync",
      //     href: "/sync",
      //     icon: RefreshCcw,
      //   },
    ],
  },

  {
    name: "List",
    basePath: "/list",
    href: "/list/schools",
    icon: ClipboardList,
    subMenu: [
      {
        name: "School List",
        href: "/list/schools",
        icon: School,
      },
      {
        name: "Student List",
        href: "/list/candidates",
        icon: Users,
      },
      {
        name: "Neutral Schools",
        href: "/list/neutral-schools",
        icon: Scale,
      },
    ],
  },
  {
    name: "Reports & Audit",
    basePath: "/report-audit",
    href: "/audit-queries/students",
    icon: ClipboardPen,
    subMenu: [
      {
        name: "Audit Queries",
        href: "/audit-queries/students",
        icon: ClipboardList,
        subMenu: [
          {
            name: "School",
            href: "/audit-queries/school",
            icon: Building2,
          },
          {
            name: "Student",
            href: "/audit-queries/students",
            icon: GraduationCap,
          },
          {
            name: "District",
            href: "/audit-queries/district",
            icon: MapPin,
          },
          {
            name: "Assessment Orders",
            href: "/audit-queries/ao",
            icon: Asterisk,
          },
          {
            name: "General Audits",
            href: "/audit-queries/general",
            icon: FileType,
          },
        ],
      },
      {
        name: "Reports",
        href: "/reports",
        icon: ClipboardPen,
      },
    ],
  },
  {
    name: "Rate Limit",
    basePath: "/rate-limit",
    href: "/rate-limit",
    icon: ShieldHalf,
  },
  {
    name: "Instructions",
    basePath: "/instructions",
    href: "/instructions/school/login",
    icon: ListChecks,
    subMenu: [
      {
        name: "School",
        basePath: "/instructions/school",
        href: "/instructions/school",
        icon: School,
        subMenu: [
          {
            name: "School Cards",
            href: "/instructions/school",
            icon: School2,
          },
          {
            name: "Login Instructions",
            href: "/instructions/school/login",
            icon: LogIn,
          },
          {
            name: "OTP Instructions",
            href: "/instructions/school/otp",
            icon: KeyRound,
          },
        ],
      },
    ],
  },
];
