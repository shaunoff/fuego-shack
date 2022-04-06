import React from "react";

interface FormSubmitFooterProps {
  loading: boolean;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
}
const FormSubmitFooter = ({ loading, onCancel }: FormSubmitFooterProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <button
          disabled={loading}
          onClick={onCancel}
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormSubmitFooter;
