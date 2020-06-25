import React, { createContext, useContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({});

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ ...snackbar, open: false });
  };

  const showMessage = ({ severity, message }) => {
    setSnackbar({ open: true, severity, message });
  };

  return (
    <SnackbarContext.Provider
      value={{
        showError: (message) => showMessage({ severity: "error", message }),
        showInfo: (message) => showMessage({ severity: "info", message }),
        showWarning: (message) => showMessage({ severity: "warning", message }),
        showSuccess: (message) => showMessage({ severity: "success", message }),
      }}
    >
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
