import { z } from "zod";
import {
  ActionFunction,
  unstable_parseMultipartFormData,
  UploadHandler,
  useOutletContext,
  useTransition,
  redirect,
} from "remix";
import { createBrand } from "~/models/brand.server";
import { uploadCloudinaryImage } from "~/utils/utils.server";

import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import TextField from "~/components/shared/TextField";
import FileField from "~/components/shared/FileField";
import TextAreaField from "~/components/shared/TextAreaField";
import { DrawerOutletContext } from "~/components/outlets/DrawerOutlet";

/**
 * Transforms any empty File objects to undefined before validating.
 * This makes it so empty files will fail required checks.
 */
const fileValidation = z.preprocess((val) => {
  return val instanceof File && val.size === 0 ? undefined : val;
}, z.instanceof(File));

const actionSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  city: z.string(),
  logoUrl: typeof window === "undefined" ? z.string() : fileValidation,
  state: z.string(),
  country: z.string(),
});

const subjectFormValidator = withZod(actionSchema);

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "logoUrl") {
      stream.resume();
      return;
    }
    const uploadedImage = await uploadCloudinaryImage(stream);

    return uploadedImage.url;
  };

  const fieldValues = await subjectFormValidator.validate(
    await unstable_parseMultipartFormData(request, uploadHandler)
  );

  if (fieldValues.error) return validationError(fieldValues.error);

  const { name, description, city, state, country } = fieldValues.data;
  const { logoUrl } = fieldValues.submittedData;
  await createBrand({
    name,
    description,
    city,
    state,
    country,
    logoUrl,
  });
  return redirect("/admin/brand");
};

export default function NewBrand() {
  const { onClose } = useOutletContext<DrawerOutletContext>();
  const transition = useTransition();
  const loading = transition.state === "submitting";
  return (
    <ValidatedForm
      className="h-full"
      method="post"
      validator={subjectFormValidator}
      encType="multipart/form-data"
    >
      <div
        className={`h-full p-4 ${
          !loading && "hidden"
        } flex items-center justify-center`}
      >
        Loading....
      </div>
      <div
        className={`flex h-full flex-col justify-between ${
          loading && "hidden"
        }`}
      >
        <div className="flex-grow p-4">
          <div className="space-y-4">
            <TextField name="name" label="Name" />

            <TextAreaField name="description" label="Description" />

            <FileField />
            <TextField name="city" label="City" />
            <TextField name="state" label="State" />
            <TextField name="country" label="Country" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
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
      </div>
    </ValidatedForm>
  );
}
