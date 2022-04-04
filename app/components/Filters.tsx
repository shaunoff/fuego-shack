import { Form, useSearchParams, useSubmit } from "remix";

let sortOptions = [
  { value: "desc", display: "Recent first" },
  { value: "asc", display: "Oldest first" },
];

const Filters = () => {
  let submit = useSubmit();
  const [searchParams] = useSearchParams();
  const currentSortType = searchParams.get("sort");
  return (
    <Form
      method="get"
      action="/notes"
      onChange={(event) => {
        console.log(event.currentTarget);
        submit(event.currentTarget);
      }}
    >
      <fieldset className="space-y-2">
        <div>
          <div>Sort by:</div>
          <ul className="pb-4">
            {sortOptions.map((sort) => (
              <li key={sort.value}>
                <label className="flex cursor-pointer items-center space-x-2 py-0.5">
                  <input
                    type="radio"
                    name="sort"
                    defaultChecked={currentSortType === sort.value}
                    value={sort.value}
                    className="rounded-full"
                  />
                  <span>{sort.display}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </fieldset>
    </Form>
  );
};

export default Filters;
