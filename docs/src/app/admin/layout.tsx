
import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="pl-16 lg:pl-64 transition-all duration-300">
        <div className="p-8">
          {children}
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
