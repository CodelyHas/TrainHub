interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function FormInput({ label, required, error, ...inputProps }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>

      <input
        {...inputProps}
        className={
          error ? "border-red-500!"
            : "border-gray-300"
        }
        required={required}
      />
      

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;