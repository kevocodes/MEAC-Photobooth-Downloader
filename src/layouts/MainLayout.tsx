import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main className="min-h-dvh bg-background">
      <Header />
      <Outlet />
    </main>
  );
}

export default MainLayout;
