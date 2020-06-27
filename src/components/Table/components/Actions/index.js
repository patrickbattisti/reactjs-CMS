import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

function Actions({ onClose, confirmTitle, loading }) {
  return (
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
      <Button color="primary" type="submit" disabled={loading}>
        {confirmTitle}
      </Button>
    </DialogActions>
  );
}

export default Actions;
