import React, { useState } from "react";
import {
  CogIcon,
  CollectionIcon,
  HeartIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusSmIcon as PlusSmIconOutline,
  UserGroupIcon,
  ViewGridIcon as ViewGridIconOutline,
  XIcon,
} from "@heroicons/react/outline";
import {
  PencilIcon,
  PlusSmIcon as PlusSmIconSolid,
  SearchIcon,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from "@heroicons/react/solid";

interface SidebarProps {}

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "All Files", href: "#", icon: ViewGridIconOutline, current: false },
  { name: "Photos", href: "#", icon: PhotographIcon, current: true },
  { name: "Shared", href: "#", icon: UserGroupIcon, current: false },
  { name: "Albums", href: "#", icon: CollectionIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
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
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-red-800 text-white"
                  : "text-red-100 hover:bg-red-800 hover:text-white",
                "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-white"
                    : "text-red-300 group-hover:text-white",
                  "h-6 w-6"
                )}
                aria-hidden="true"
              />
              <span className="mt-2">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
