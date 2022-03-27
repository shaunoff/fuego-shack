import { Link } from "remix";

export default function NoteIndexPage() {
  return (
    <p className="font-semibold text-blue-500 underline">
      No note selected. Select a note on the left, or{" "}
      <Link to="new" className="font-bold text-blue-500 underline">
        create a new note.
      </Link>
    </p>
  );
}
