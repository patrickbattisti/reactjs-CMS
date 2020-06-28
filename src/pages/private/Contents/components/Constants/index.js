import React from "react";
import { format } from "date-fns";

export const MODEL = "Contents";
export const ROW_NAME = "Content";
export const COLUMNS = [
  { id: "title", label: "Title", maxWidth: 300 },
  { id: "description", label: "Description", maxWidth: 300 },
  { id: "createdBy", label: "Author", maxWidth: 300 },
  {
    id: "background",
    label: "Background Image",
    format: (value) => {
      if (!value?.name) {
        return "";
      }

      const [_, ...fileName] = value?.name?.split(".").reverse();

      return (
        <a href={value.url} target="_blank">
          {fileName.join(".")}
        </a>
      );
    },
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
