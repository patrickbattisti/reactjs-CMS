import React, { useState, useEffect } from "react";

import Table from "../../../components/Table";
import { useSnackbar } from "../../../contexts/snackbar";

import ModelForm from "./components/Form";
import Drawer from "../../../components/Drawer";

import api from "../../../services/api";

import { MODEL, ROW_NAME, COLUMNS } from "./components/Constants";

export default () => {
  const { showSuccess, showError } = useSnackbar();
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(null);

  const [updateRow, setUpdateRow] = useState({
    open: false,
    row: {},
  });

  const [createRow, setCreateRow] = useState({
    open: false,
  });

  const onCloseUpdate = () => setUpdateRow({ open: false });
  const onCloseCreate = () => setCreateRow({ open: false });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get(MODEL);

        setRows(response.data);
      } catch (e) {
        showError("Try again later.");
      }
    };

    fetch();
  }, [refresh, showError]);

  const onDelete = async ({ _id }) => {
    try {
      await api.delete(`${MODEL}/${_id}`);

      showSuccess(`${ROW_NAME} deleted with success.`);
      setRefresh(refresh + 1);
    } catch (e) {
      showError("Try again later.");
    }
  };

  const onCreate = async (data) => {
    try {
      if (loading) return;

      setLoading(true);
      await api.post(MODEL, data);

      showSuccess(`${ROW_NAME} created with success.`);
      setRefresh(refresh + 1);
      setCreateRow({ open: false });
      setLoading(false);
    } catch (e) {
      showError("Try again later.");
      setLoading(false);
    }
  };

  const onUpdate = async (data) => {
    try {
      if (loading) return;

      setLoading(true);
      await api.put(`${MODEL}/${updateRow.row._id}`, data);

      showSuccess(`${ROW_NAME} updated with success.`);
      setUpdateRow({ open: false });
      setRefresh(refresh + 1);
      setLoading(false);
    } catch (e) {
      showError("Try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <Table
        {...{
          columns: COLUMNS,
          rows,
          model: MODEL,
          rowName: ROW_NAME,
          onDelete,
          updateRow,
          setUpdateRow,
          createRow,
          setCreateRow,
          loading,
        }}
      />

      <Drawer
        {...{
          loading,
          open: updateRow.open,
          onClose: onCloseUpdate,
          title: `Edit ${ROW_NAME}`,
          rowName: ROW_NAME,
        }}
      >
        <ModelForm
          {...{
            loading,
            defaultValues: updateRow.row,
            confirmTitle: "Edit",
            onClose: onCloseUpdate,
            onSubmit: onUpdate,
          }}
        />
      </Drawer>

      <Drawer
        {...{
          loading,
          open: createRow.open,
          onClose: onCloseCreate,
          title: `Create ${ROW_NAME}`,
          rowName: ROW_NAME,
        }}
      >
        <ModelForm
          {...{
            loading,
            confirmTitle: "Create",
            onClose: onCloseCreate,
            onSubmit: onCreate,
          }}
        />
      </Drawer>
    </>
  );
};
