import React, { useState, useMemo, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import api from "../../services/api";
import { useSnackbar } from "../../contexts/snackbar";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "8px 0",
    width: "100%",
    height: 56,
    borderRadius: 4,
    border: "1px solid #ccc",
    overflow: "hidden",
    fontWeight: 500,
    color: "#444 !important",
    fontSize: 15,
    position: "relative",

    "&:hover": {
      border: "1px solid rgba(0, 0, 0, 0.87)",
    },
  },
  content: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    padding: "0 14px",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 400,
  },
  input: {
    position: "absolute",
    opacity: 0,
    top: 0,
    height: "100%",
    width: "100%",
    cursor: "pointer",
  },
}));

export default function InputFile({
  placeholder,
  error,
  accept,
  setValue,
  defaultValue,
}) {
  const { showError } = useSnackbar();
  const [label, setLabel] = useState(placeholder);
  const [_error, setError] = useState(error);
  const classes = useStyles();

  const colorLabel = useMemo(() => {
    if (_error || error) {
      return "rgb(244, 67, 54)";
    }

    if (placeholder === label) {
      return "#888";
    }

    return "rgba(0, 0, 0, 0.87)";
  }, [label, placeholder, _error, error]);

  const colorBorder = useMemo(() => {
    if (_error || error) {
      return "rgb(244, 67, 54)";
    }

    return "#ccc";
  }, [_error, error]);

  useEffect(() => {
    if (defaultValue?._id) {
      setLabel(defaultValue.name);
      setValue(defaultValue._id);
    }
  }, [defaultValue]);

  const onFileUpload = async (e) => {
    const [file] = e.target.files;

    if (!file?.name) return;

    setLabel(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("/files", formData);

      setValue(response.data._id);
    } catch (e) {
      setError(true);
      showError("Error! Try upload file again.");
    }
  };

  return (
    <div className={classes.container} style={{ borderColor: colorBorder }}>
      <div className={classes.content}>
        <p className={[classes.label]} style={{ color: colorLabel }}>
          {label}
        </p>
        <AttachFileIcon style={{ color: "#888" }} />
      </div>
      <input
        type="file"
        onChange={onFileUpload}
        className={classes.input}
        accept1={accept}
      />
    </div>
  );
}
