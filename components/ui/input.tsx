interface InputProps<T> {
    type?: "text" | "number" | "date" | "email" | "password";
    value: T;
    onChange: (value: T) => void;
    required?: boolean;
}

export default function Input<T extends string | number>({ type = "text", value, onChange, required = true }: InputProps<T>) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => {
                const newValue = type === "number" ? Number(e.target.value) : e.target.value;
                onChange(newValue as T);
            }}
            required={required}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}
