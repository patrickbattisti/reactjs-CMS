import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

function Actions({ onClose, onConfirm, confirmTitle }) {
  return (
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
      <Button onClick={onConfirm} color="primary" type="submit">
        {confirmTitle}
      </Button>
    </DialogActions>
  );
}

export default Actions;
