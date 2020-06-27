import { format } from "date-fns";

export const MODEL = "Contents";
export const ROW_NAME = "Content";
export const COLUMNS = [
  { id: "title", label: "Title", maxWidth: 300 },
  { id: "description", label: "Description", maxWidth: 300 },
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
