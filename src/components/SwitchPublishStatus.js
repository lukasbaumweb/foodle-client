import React, { useState } from "react";
import { Box, Switch, Tooltip, Snackbar } from "@mui/material";
import FoodleAPI from "../utils/api";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SwitchPublishStatus = ({ isPrivate, id }) => {
  const [values, setValues] = useState({ open: false, isPrivate: isPrivate });

  const changeStatus = async (value) => {
    const api = new FoodleAPI();
    try {
      await api.updateFoodle(id, { isPrivate: !values.isPrivate });
      setValues({ ...values, isPrivate: !values.isPrivate, open: true });
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  return (
    <Box>
      <Tooltip title={values.isPrivate ? "Veröffentlichen" : "Privatisieren"}>
        <Switch
          inputProps={{ "aria-label": "Öffentlichkeitsstatus ändern" }}
          onChange={(e) => changeStatus()}
          checked={!values.isPrivate}
        />
      </Tooltip>
      <Snackbar
        open={values.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Status geändert
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SwitchPublishStatus;
