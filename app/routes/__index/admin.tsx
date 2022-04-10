import { json, LoaderFunction, MetaFunction, Outlet } from "remix";
import { getNoteListItems } from "~/models/note.server";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { requireUserId } from "~/session.server";
import { Prisma } from "@prisma/client";
import Tabs from "~/components/Tabs";

type LoaderData = {
  noteListItems: Awaited<ReturnType<typeof getNoteListItems>>;
};

export const handle = {
  pageTitle: "Administration",
  subtitle: "This is where you can set all the things",
  Logo: AdjustmentsIcon,
};

export const meta: MetaFunction = ({ data, params }) => {
  return {
    title: `Fuego Admin`,
    description: "admin Page",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  let url = new URL(request.url);
  let sortQuery = url.searchParams.get("sort");
  let orderBy: Prisma.SortOrder = sortQuery === "asc" ? "asc" : "desc";
  const noteListItems = await getNoteListItems({ userId, orderBy });
  return json<LoaderData>({ noteListItems });
};

export default function NoteIndexPage() {
  return (
    <div>
      <Tabs />
      <Outlet />
    </div>
  );
}
