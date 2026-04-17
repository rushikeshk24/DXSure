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
    <form onSubmit={handleSubmit} className="mb-6 grid gap-5 md:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.fullWidth ? "md:col-span-2" : ""}
        >
          {field.type === "select" ? (
            <div>
              <label
                htmlFor={field.name}
                className="mb-1.5 block text-sm font-medium text-[#43474e]"
              >
                {field.label}
              </label>
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#c4c6cf]/20 bg-[#ffffff] px-3.5 py-2.5 text-sm text-[#181c1e] transition duration-200 focus:border-[#0061a5] focus:outline-none focus:ring-2 focus:ring-[#0061a5]/10 backdrop-blur-sm"
                required={field.required}
              >
                <option value="" className="bg-[#ffffff] text-[#43474e]">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#ffffff] text-[#181c1e]">
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
        <p className="text-sm font-medium text-red-400 md:col-span-2">{error}</p>
      ) : null}

      <div className="pt-2 md:col-span-2">
        <Button type="submit" loading={loading} className="w-full sm:w-auto">
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default SimpleForm;
