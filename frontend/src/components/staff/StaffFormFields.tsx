import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type {
  CreateStaffFormData,
  EditStaffFormData,
} from "../../features/staff/staffSchema";

type StaffFormFieldsData = CreateStaffFormData | EditStaffFormData;

interface Props {
  register: UseFormRegister<StaffFormFieldsData>;
  errors: FieldErrors<StaffFormFieldsData>;
  isEditMode: boolean;
}

function StaffFormFields({ register, errors, isEditMode }: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-gray-700">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter staff full name"
          {...register("fullName")}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(
              /[^\p{L}\s]/gu,
              ""
            );
          }}
        />

        {errors.fullName && (
          <p className="text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-sm text-gray-700">
          Email
        </label>

        <input
          type="email"
          placeholder="staff@trainhub.com"
          autoComplete="new-email"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {!isEditMode && (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter temporary password"
              autoComplete="new-password"
              {...register("password" as keyof CreateStaffFormData)}
            />

            {"password" in errors && errors.password && (
              <p className="text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm temporary password"
              autoComplete="new-password"
              {...register("confirmPassword" as keyof CreateStaffFormData)}
            />

            {"confirmPassword" in errors && errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default StaffFormFields;