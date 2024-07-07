import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { HomeNav } from "@/components/Home";
import { Toaster } from "@/components/ui/toaster";
import CareerMateProvider from "@/store/store";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerMate | Home",
  description: "CareerMate is a platform to manage your portfolio and Resume.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: "#15171c",
        },
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <CareerMateProvider>
          <body className={roboto.className + "h-[100svh] overflow-hidden"}>
            <HomeNav />
            <main>{children}</main>
            <Toaster />
          </body>
        </CareerMateProvider>
      </html>
    </ClerkProvider>
  );
}
