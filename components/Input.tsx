import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  label: string;
  errors?: string[];
}

export default function Input({
  name,
  errors,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {props.required ? "* " : ""}
        {props.label}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full px-3 py-2 border rounded-md my-2 ${props.className}`}
        {...props}
      />

      {errors &&
        errors.map((error, index) => (
          <div key={index} className="text-sm text-red-600">
            {error}
          </div>
        ))}
    </div>
  );
}
