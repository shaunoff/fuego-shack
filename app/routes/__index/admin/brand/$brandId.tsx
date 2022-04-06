import { Brand } from "@prisma/client";
import {
  ActionFunction,
  ErrorBoundaryComponent,
  json,
  LoaderFunction,
  redirect,
  unstable_parseMultipartFormData,
  UploadHandler,
  useCatch,
  useLoaderData,
  useParams,
  useTransition,
} from "remix";
import { z } from "zod";
import { findBrand, updateBrand } from "~/models/brand.server";
import AdminBrandForm, {
  adminBrandValidator,
} from "~/components/admin/AdminBrandForm";
import { uploadCloudinaryImage } from "~/utils/utils.server";
import { validationError } from "remix-validated-form";

const brandParams = z.object({ brandId: z.string() });

export const loader: LoaderFunction = async ({ params }) => {
  const { brandId } = brandParams.parse(params);

  const brand = await findBrand({ id: brandId });

  if (!brand) {
    throw new Response(`Subject ${brandId} doesn't exist`, {
      status: 404,
    });
  }

  return json(brand);
};

export const action: ActionFunction = async ({ request, params }) => {
  // If valid, zod returns value with full type information. If not error is thrown
  const { brandId } = brandParams.parse(params);

  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "logoUrl") {
      stream.resume();
      return;
    }
    // Need some investigation here but it works for this use case without doing anything.
    // If the value is already a url it doesn't upload and returns the url string.
    const uploadedImage = await uploadCloudinaryImage(stream);

    return uploadedImage.url;
  };

  const fieldValues = await adminBrandValidator.validate(
    await unstable_parseMultipartFormData(request, uploadHandler)
  );

  //ValidatedForm on the frontend will automatically display the errors on the correct fields on the correct form.//
  if (fieldValues.error) return validationError(fieldValues.error);
  const { logoUrl, ...rest } = fieldValues.data;

  if (typeof logoUrl !== "string") {
    throw Error("Logo Url Must be a string");
  }
  await updateBrand({ brandId, logoUrl, ...rest });

  return redirect("/admin/brand");
};

const UpdateBrand = () => {
  const brand = useLoaderData<Brand>();
  const transition = useTransition();
  const loading = transition.state !== "idle";

  return <AdminBrandForm loading={loading} defaultValues={brand} />;
};

export default UpdateBrand;

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    <div>{`Subject ${params.id} doesn't exist`}</div>;
    // return <ErrorBox title={`Subject ${params.id} doesn't exist`} />;
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const { brandId } = useParams();
  return (
    <div>{`There was an error subject by the id ${brandId}. Sorry.`}</div>
    //<ErrorBox title={`There was an error subject by the id ${id}. Sorry.`} />
  );
};
