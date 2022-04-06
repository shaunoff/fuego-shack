import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";

const FileInfo = ({
  url,
  onRemove,
  fileName,
}: {
  url?: string;
  onRemove: () => void;
  fileName: string;
}) => {
  const [file, setFile] = useState<HTMLImageElement | null>(null);

  return (
    <div
      key={fileName}
      className="mt-2 flex overflow-hidden rounded-md border-gray-300 shadow-sm"
    >
      {url && (
        <img
          src={url}
          className="h-24 w-24 overflow-hidden rounded-l-md border border-gray-300 object-contain"
          alt="image_preview"
          onLoad={(e) => {
            setFile(e.currentTarget);
          }}
        />
      )}

      <div className="flex flex-1 items-center justify-between overflow-hidden truncate rounded-r-md border-t border-r border-b border-gray-300 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <p className="text-gray-500">
            <span className="font-bold">Width: </span>
            {file?.naturalWidth} px
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Height: </span>
            {file?.naturalHeight} px
          </p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500"
          >
            <XIcon className="h-5 w-5" aria-hidden="true" onClick={onRemove} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileInfo;
