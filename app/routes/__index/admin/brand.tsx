import { Brand, Prisma } from "@prisma/client";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
import DrawerOutlet from "~/components/outlets/DrawerOutlet";
import Table from "~/components/Table";
import { getBrands } from "~/models/brand.server";

interface LoaderData {
  brands: Brand[];
}

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let sortQuery = url.searchParams.get("sort");
  let orderBy: Prisma.SortOrder = sortQuery === "asc" ? "asc" : "desc";
  const brands = await getBrands({ orderBy });
  return json<LoaderData>({ brands });
};

const BrandAdmin = () => {
  const { brands } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="px-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Brands</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="new"
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
            >
              Create Brand
            </Link>
          </div>
        </div>
        <div className="-mx-4 mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <Table brands={brands} />
        </div>
      </div>
      <DrawerOutlet />
    </div>
  );
};

export default BrandAdmin;
