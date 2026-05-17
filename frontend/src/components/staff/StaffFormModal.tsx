import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  createStaffSchema,
  editStaffSchema,
  type CreateStaffFormData,
  type EditStaffFormData,
} from "../../features/staff/staffSchema";

import {
  createStaffAccount,
  updateStaffAccount,
} from "../../features/staff/staffApi";

import type { Staff } from "../../features/staff/staffTypes";
import { staffToFormData } from "../../features/staff/staffForm.mapper";

import StaffFormFields from "./StaffFormFields";

interface CreateProps {
  mode: "create";
  onClose: () => void;
  onCreated: (createdStaff: Staff) => void;
}

interface EditProps {
  mode: "edit";
  staff: Staff;
  onClose: () => void;
  onUpdated: (updatedStaff: Staff) => void;
}

type Props = CreateProps | EditProps;

function StaffFormModal(props: Props) {
  const [submitError, setSubmitError] = useState("");

  const isEditMode = props.mode === "edit";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStaffFormData | EditStaffFormData>({
    resolver: zodResolver(isEditMode ? editStaffSchema : createStaffSchema),
    defaultValues: isEditMode
      ? staffToFormData(props.staff)
      : {
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
  });

  useEffect(() => {
    if (props.mode === "edit") {
      reset(staffToFormData(props.staff));
    }
  }, [props, reset]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        props.onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [props]);

  const onSubmit = async (data: CreateStaffFormData | EditStaffFormData) => {
    try {
      setSubmitError("");

      if (isEditMode) {
        const updatedStaff = await updateStaffAccount(
          props.staff.id,
          data as EditStaffFormData
        );

        props.onUpdated(updatedStaff);
        toast.success("Staff account updated successfully");
        props.onClose();
        return;
      }

      const createdStaff = await createStaffAccount(data as CreateStaffFormData);

      props.onCreated(createdStaff);
      toast.success("Staff account created successfully");
      props.onClose();
    } catch (error) {
      const errorMessage = isEditMode
        ? "Something went wrong while updating staff account."
        : "Something went wrong while creating staff account.";

      setSubmitError(errorMessage);
      toast.error(errorMessage);
      console.error("Staff form error:", error);
    }
  };

  return (
    <div className="modalContainer">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <i
              className={
                isEditMode
                  ? "fa-solid fa-user-pen"
                  : "fa-solid fa-user-plus"
              }
            ></i>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            {isEditMode ? "Edit Staff Account" : "Create Staff Account"}
          </h2>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          {isEditMode
            ? "Update staff account information."
            : "Create an account for authorized staff members to access reservation and passenger operations."}
        </p>

        <form
          className="editScheduleForm"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <StaffFormFields
            register={register}
            errors={errors}
            isEditMode={isEditMode}
          />

          {submitError && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {submitError}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={props.onClose}
              disabled={isSubmitting}
              className="hover:cursor-pointer hover:bg-gray-800 bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="hover:cursor-pointer hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {isSubmitting
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                ? "Save Changes"
                : "Create Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffFormModal;