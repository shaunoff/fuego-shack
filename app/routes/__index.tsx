import { ErrorBoundaryComponent, Outlet, useMatches } from "remix";

//import { useUser } from "~/utils";
import Sidebar from "~/components/Sidebar";
import MobileMenu from "~/components/MobileMenu";
import PageHeader from "~/components/layout/PageHeader";
import { useState } from "react";
import useBaseRouteHandle from "~/hooks/useBaseRouteHandle";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { pageTitle, subtitle, Logo } = useBaseRouteHandle();

  return (
    <div className="flex h-full">
      <Sidebar />
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div className="flex flex-1 flex-col">
        <PageHeader title={pageTitle} subtitle={subtitle} Logo={Logo} />
        <Outlet />
      </div>
    </div>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div>{error.message}</div>
    //<ErrorBox title={`There was an error subject by the id ${id}. Sorry.`} />
  );
};
