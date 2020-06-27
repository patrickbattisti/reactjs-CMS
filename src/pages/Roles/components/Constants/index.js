import { format } from "date-fns";

export const MODEL = "Roles";
export const ROW_NAME = "Role";
export const COLUMNS = [
  { id: "name", label: "Name" },
  { id: "level", label: "Level" },
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
