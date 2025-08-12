import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  className?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const FormInputBox = ({
  label,
  className = "",
  type = "text",
  id,
  placeholder,
  error,
  register,
  ...rest
}: Props) => {
  return (
    <div className={clsx("mb-4", className)}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className="block font-semibold mb-2 text-text">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
        {...rest}
        className={clsx(
          "w-full px-4 py-2 rounded-md border transition duration-200 focus:outline-none focus:ring-2",
          "bg-card text-text placeholder:text-text/60",
          error
            ? "border-error focus:ring-error"
            : "border-border focus:ring-primary",
          rest.disabled && "opacity-60 cursor-not-allowed"
        )}
      />

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

export default FormInputBox;
