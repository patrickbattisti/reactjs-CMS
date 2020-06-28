import { format } from "date-fns";

export const MODEL = "Users";
export const ROW_NAME = "User";
export const COLUMNS = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "role",
    label: "Role",
    format: (value) => value?.name,
  },
  {
    id: "createdAt",
    label: "Created At",
    format: (value) => format(new Date(value), "MM/dd/yyyy"),
  },
  {
    id: "edit",
    align: "center",
  },
  {
    id: "delete",
    align: "center",
  },
];
