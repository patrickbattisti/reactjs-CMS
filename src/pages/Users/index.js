import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Table from "../../components/Table";
import { useSnackbar } from "../../contexts/snackbar";

import Form from "./components/Form";

import api from "../../services/api";

const columns = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "role",
    label: "Role",
    format: (value) => value.name,
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

function Users() {
  const { showSuccess, showError } = useSnackbar();
  const [refresh, setRefresh] = useState(0);
  const [rows, setRows] = useState([]);

  const [updateRow, setUpdateRow] = useState({
    open: false,
    row: {},
  });

  const [createRow, setCreateRow] = useState({
    open: false,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("users");

        setRows(response.data);
      } catch (e) {
        showError("Try again later.");
      }
    };

    fetch();
  }, [refresh, showError]);

  const onDelete = async ({ id }) => {
    try {
      await api.delete(`users/${id}`);

      showSuccess("User deleted with success.");
      setRefresh(refresh + 1);
    } catch (e) {
      showError("Try again later.");
    }
  };

  const onCreate = async (data) => {
    try {
      await api.post(`users`, data);

      showSuccess("User created with success.");
      setRefresh(refresh + 1);
      setCreateRow({ open: false });
    } catch (e) {
      showError("Try again later.");
    }
  };

  const onUpdate = async (data) => {
    try {
      await api.put(`users/${updateRow.row.id}`, {
        ...data,
      });

      showSuccess("User updated with success.");
      setUpdateRow({ open: false });
      setRefresh(refresh + 1);
    } catch (e) {
      showError("Try again later.");
    }
  };

  return (
    <Table
      {...{
        columns,
        rows,
        model: "Users",
        rowName: "User",
        FormCreate: (props) => <Form onSubmit={onCreate} {...props} />,
        FormUpdate: (props) => <Form onSubmit={onUpdate} {...props} />,
        onDelete,
        updateRow,
        setUpdateRow,
        createRow,
        setCreateRow,
      }}
    />
  );
}

export default Users;
