import { MinimalSidebar } from "@/components/ui/minimal-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Minimal Icon Sidebar */}
      <MinimalSidebar />

      {/* Main Content Area */}
      <div className="ml-20 min-h-screen">
        <main className="container mx-auto px-6 py-8 max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
} 