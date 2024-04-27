interface InputProps {
  name: string;
  label: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ name, label, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={name}
        name={name}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md"
        required
      />
    </div>
  );
};

export default Input;
