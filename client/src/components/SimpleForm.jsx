import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

function SimpleForm({
  fields,
  onSubmit,
  initialValues = {},
  buttonText = "Save",
}) {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(formData);
      setFormData(initialValues);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to save. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.fullWidth ? "md:col-span-2" : ""}
        >
          {field.type === "select" ? (
            <div>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {field.label}
              </label>
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <Input
              type={field.type || "text"}
              name={field.name}
              label={field.label}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              placeholder={
                field.placeholder || `Enter ${String(field.label).toLowerCase()}`
              }
            />
          )}
        </div>
      ))}

      {error ? (
        <p className="text-sm font-medium text-rose-600 md:col-span-2">{error}</p>
      ) : null}

      <div className="md:col-span-2">
        <Button type="submit" loading={loading}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default SimpleForm;
