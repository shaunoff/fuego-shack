import { json, LoaderFunction, useLoaderData } from "remix";
import { getNoteListItems } from "~/models/note.server";

import {
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from "@heroicons/react/solid";
import Filters from "~/components/Filters";
import { requireUserId } from "~/session.server";
import { Prisma } from "@prisma/client";

type LoaderData = {
  noteListItems: Awaited<ReturnType<typeof getNoteListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  let url = new URL(request.url);
  let sortQuery = url.searchParams.get("sort");
  let orderBy: Prisma.SortOrder = sortQuery === "asc" ? "asc" : "desc";
  const noteListItems = await getNoteListItems({ userId, orderBy });
  return json<LoaderData>({ noteListItems });
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NoteIndexPage() {
  const { noteListItems } = useLoaderData() as LoaderData;
  return (
    <div className="flex flex-1 items-stretch overflow-hidden">
      <aside className="hidden w-96 overflow-y-auto border-r border-gray-200 bg-white p-8 lg:block">
        <Filters />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto px-4 pt-8 sm:px-6 lg:px-8">
          <div className="flex">
            <h1 className="flex-1 text-2xl font-bold text-gray-900">
              Hot Sauces
            </h1>
            <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5">
              <button
                type="button"
                className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              >
                <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use list view</span>
              </button>
              <button
                type="button"
                className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              >
                <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Use grid view</span>
              </button>
            </div>
          </div>

          {/* Gallery */}
          <section className="mt-4 pb-16" aria-labelledby="gallery-heading">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
              {noteListItems.map((item) => (
                <li key={item.title} className="relative">
                  <div
                    className={classNames(
                      "focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100",
                      "aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100"
                    )}
                  >
                    <img
                      src={
                        item.imageUrl ||
                        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                      }
                      alt=""
                      className={classNames(
                        "group-hover:opacity-75",
                        "pointer-events-none h-48 object-cover"
                      )}
                    />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">
                        View details for {item.title}
                      </span>
                    </button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {item.title}
                  </p>
                  {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">
                    {item.body}
                  </p> */}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
