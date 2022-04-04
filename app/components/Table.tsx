import { Brand } from "@prisma/client";

interface BrandsTableProps {
  brands: Brand[];
}

const Table = ({ brands }: BrandsTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Name
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Description
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Logo
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            City
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {brands.map((brand) => (
          <tr key={brand.id}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
              {brand.name}
              <dl className="font-normal lg:hidden">
                <dd className="mt-1 truncate text-gray-700">
                  {brand.description}
                </dd>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                  {brand.city}, {brand.state}
                </dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              {brand.name}
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              {brand.description}
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">{brand.country}</td>
            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              {/* <a href="/" className="text-red-600 hover:text-red-900">
                Edit<span className="sr-only">, {brand.name}</span>
              </a> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
