import { PhotographIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";

import { useField } from "remix-validated-form";
import FileInfo from "../shared/FileInfo";

interface FileFieldProps {
  label: string;
  name: string;
}

const FileField: React.FC<FileFieldProps> = ({ label, name }) => {
  const { error, getInputProps, setTouched } = useField(name);
  //defaultValue
  const [defaultValue, setDefaultValue] = useState<string | null>(
    getInputProps<{ defaultValue?: string }>().defaultValue ?? null
  );

  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState<FileList | []>([]);
  const input = useRef<HTMLInputElement>(null);

  const onDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    setTouched(true);
    const files = e.dataTransfer.files;
    if (input.current) {
      input.current.files = files;
      setFiles(files);
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setTouched(true);
    const files = e.target.files ?? null;
    if (input.current && files) {
      input.current.files = files;
      setFiles(files);
    }
    setFiles(e.target.files ?? []);
  };

  const onRemove = () => {
    if (input.current) {
      input.current.value = "";
      setFiles([]);
    }
  };

  /**
   * If there is a defaultValue/string render the FileInfo Component
   */
  if (defaultValue) {
    return (
      <div className="w-full">
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        <input
          {...getInputProps({
            id: name,
          })}
          type="text"
          className="hidden"
        />
        <FileInfo
          url={defaultValue}
          onRemove={() => setDefaultValue(null)}
          fileName={defaultValue.split("/").pop() || ""}
        />
      </div>
    );
  }

  /**
   * If there is no defaultValue render the file upload input
   */
  let url;
  const filesList = [...files];

  if (defaultValue) {
    url = defaultValue;
  } else if (filesList.length) {
    url = URL.createObjectURL(filesList[0]);
  }

  return (
    <div className="w-full">
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        ref={input}
        {...getInputProps({
          id: name,
        })}
        type="file"
        className="hidden"
        onChange={onChange}
        defaultValue={undefined}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />

      {!filesList.length ? (
        <div className="mt-1 w-full">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={(e) => {
              e.stopPropagation();
              input.current?.click();
            }}
            className={`flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-4 pb-6 ${
              isDragActive && "relative border-red-600"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <PhotographIcon className="h-8 w-8 text-gray-300" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 hover:text-red-500">
                  <span>Upload a file</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FileInfo url={url} onRemove={onRemove} fileName={filesList[0].name} />
      )}
      {error && typeof error === "string" && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

const styles = {
  label: "block text-base text-gray-500 font-bold",
};

export default FileField;
