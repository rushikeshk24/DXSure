import { useEffect, useState } from "react";
import SimpleForm from "../../components/SimpleForm";
import SimpleTable from "../../components/SimpleTable";
import { userApi } from "../../services/api";

function CreateUserPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await userApi.getAll();
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (data) => {
    await userApi.create(data);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Create User</h2>

      <SimpleForm
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
          {
            name: "role",
            label: "Role",
            type: "select",
            required: true,
            options: [
              { label: "Admin", value: "admin" },
              { label: "Employee", value: "employee" },
            ],
          },
        ]}
        onSubmit={handleCreate}
      />

      <SimpleTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
        ]}
        rows={users}
      />
    </div>
  );
}

export default CreateUserPage;
