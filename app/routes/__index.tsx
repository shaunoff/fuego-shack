import { Outlet } from "remix";

//import { useUser } from "~/utils";
import Sidebar from "~/components/Sidebar";
import MobileMenu from "~/components/MobileMenu";
import Header from "~/components/Header";
import { useState } from "react";

export default function NotesPage() {
  //const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar />
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <Outlet />
      </div>
    </div>
  );
}
