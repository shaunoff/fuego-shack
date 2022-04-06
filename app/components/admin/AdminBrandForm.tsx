import { withZod } from "@remix-validated-form/with-zod";
import React from "react";
import { useNavigate } from "remix";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import FileField from "../form/FileField";
import FormSubmitFooter from "../form/FormSubmitFooter";
import TextAreaField from "../form/TextAreaField";
import TextField from "../form/TextField";

/**
 * Transforms any empty File objects to undefined before validating.
 * This makes it so empty files will fail required checks.
 */
const fileValidation = z.preprocess((val) => {
  return val instanceof File && val.size === 0 ? undefined : val;
}, z.instanceof(File));

const brandSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  city: z.string(),
  logoUrl:
    typeof window === "undefined"
      ? z.string().nullable()
      : z.string().or(fileValidation).nullable(),
  state: z.string(),
  country: z.string(),
});

export const adminBrandValidator = withZod(brandSchema);

interface AdminBrandFormProps {
  loading: boolean;
  defaultValues?: Partial<z.infer<typeof brandSchema>>;
}

const AdminBrandForm: React.FC<AdminBrandFormProps> = ({
  loading,
  defaultValues,
}) => {
  const navigate = useNavigate();
  return (
    <ValidatedForm
      className="h-full"
      method="post"
      validator={adminBrandValidator}
      encType="multipart/form-data"
      defaultValues={defaultValues}
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
          <div className="mb-4 border-b border-gray-200 pb-2">
            <h3 className="text-xl font-bold leading-6 text-gray-500">
              Create Brand
            </h3>
          </div>
          <div className="space-y-4">
            <TextField name="name" label="Name" />

            <TextAreaField name="description" label="Description" />

            <FileField name="logoUrl" label="Logo" />
            <TextField name="city" label="City" />
            <TextField name="state" label="State" />
            <TextField name="country" label="Country" />
          </div>
        </div>
        <FormSubmitFooter loading={loading} onCancel={() => navigate(-1)} />
      </div>
    </ValidatedForm>
  );
};

export default AdminBrandForm;
