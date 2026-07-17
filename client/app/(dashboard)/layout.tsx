import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      {children}
    </div>
  );
}