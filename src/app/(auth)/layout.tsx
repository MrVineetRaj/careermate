import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="relative h-screen w-full transition-all duration-200 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
