import {
  HomeIcon,
  ViewGridIcon as ViewGridIconOutline,
} from "@heroicons/react/outline";
import { NavLink } from "remix";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Notes", href: "/notes", icon: ViewGridIconOutline },
  { name: "Admin", href: "/admin", icon: ViewGridIconOutline },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  return (
    <div className="hidden w-28 overflow-y-auto bg-red-700 md:block">
      <div className="flex w-full flex-col items-center py-4">
        <div className="flex flex-shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="/images/firelogo.png"
            alt="Workflow"
          />
        </div>
        <div className="mt-6 w-full flex-1 space-y-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-red-800 text-white"
                    : "text-red-100 hover:bg-red-800 hover:text-white",
                  "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={classNames(
                      isActive
                        ? "text-white"
                        : "text-red-300 group-hover:text-white",
                      "h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
