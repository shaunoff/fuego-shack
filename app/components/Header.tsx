import React from "react";
import { MenuAlt2Icon, LogoutIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { Form } from "remix";

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<boolean>;
}

const Header = ({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => {
  return (
    <header className="w-full">
      <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-between px-4 sm:px-6">
          <div className="flex flex-1">
            <form className="flex w-full md:ml-0" action="#" method="GET">
              <label htmlFor="desktop-search-field" className="sr-only">
                Search all files
              </label>
              <label htmlFor="mobile-search-field" className="sr-only">
                Search all files
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <SearchIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="mobile-search-field"
                  id="mobile-search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:hidden"
                  placeholder="Search"
                  type="search"
                />
                <input
                  name="desktop-search-field"
                  id="desktop-search-field"
                  className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:block"
                  placeholder="Search all files"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            <Form action="/logout" method="post" className="h-6 w-6">
              <button type="submit">
                <LogoutIcon className="h-6 w-6" />
              </button>
            </Form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
