import { DashboardNav } from "@/components/Dashboard/index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerMate | Dashboard",
  description:
    " Dashboard for CareerMate from here you can manage your portfolio and other stuff.",
  icons: {
    icon: "/logo.png",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <DashboardNav />
      <main>{children}</main>
    </section>
  );
}
