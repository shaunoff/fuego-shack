import {
  OfficeBuildingIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { NavLink } from "remix";

const tabs = [
  { name: "General", to: "/admin", icon: UserIcon, current: false, end: true },
  {
    name: "Brands",
    to: "/admin/brand",
    icon: OfficeBuildingIcon,
    current: false,
  },
  { name: "Users", to: "/admin/user", icon: UsersIcon, current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  return (
    <div className="mb-4 w-full border-b border-gray-200 bg-white px-4">
      <div className="mb-2 sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )
              }
              aria-current={tab.current ? "page" : undefined}
            >
              {({ isActive }) => (
                <>
                  <tab.icon
                    className={classNames(
                      isActive
                        ? "text-red-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
