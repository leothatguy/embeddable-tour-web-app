import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import AuthGuard from "./_components/auth-guard";
import Header from "./_components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Header />
          <main className="px-5 w-full py-10">{children}</main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
