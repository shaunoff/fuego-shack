import {
  ActionFunction,
  unstable_parseMultipartFormData,
  UploadHandler,
  useTransition,
  redirect,
  ErrorBoundaryComponent,
} from "remix";
import { createBrand } from "~/models/brand.server";
import { uploadCloudinaryImage } from "~/utils/utils.server";
import { validationError } from "remix-validated-form";
import AdminBrandForm, {
  adminBrandValidator,
} from "~/components/admin/AdminBrandForm";

export const action: ActionFunction = async ({ request }) => {
  try {
    const uploadHandler: UploadHandler = async ({ name, stream }) => {
      if (name !== "logoUrl") {
        stream.resume();
        return;
      }
      const uploadedImage = await uploadCloudinaryImage(stream);

      return uploadedImage.url;
    };

    const fieldValues = await adminBrandValidator.validate(
      await unstable_parseMultipartFormData(request, uploadHandler)
    );

    if (fieldValues.error) return validationError(fieldValues.error);

    const { name, description, city, state, country, logoUrl } =
      fieldValues.data;

    if (typeof logoUrl !== "string") {
      throw Error("Logo Url Must be a string");
    }
    await createBrand({
      name,
      description,
      city,
      state,
      country,
      logoUrl,
    });
  } catch (e) {
    throw Error("There was an error Creating ");
  }
  return redirect("/admin/brand");
};

export default function NewBrand() {
  //const { onClose } = useOutletContext<DrawerOutletContext>();
  const transition = useTransition();
  const loading = transition.state !== "idle";

  return <AdminBrandForm loading={loading} />;
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="p-6 text-2xl font-bold text-gray-500">
        Oops, there was an error!
      </h1>
      <img src="/images/chilli_error.svg" alt="sauce_error" className="w-24" />
      <p className="p-4 text-lg font-bold text-gray-500">{error.message}</p>
    </div>
  );
};
