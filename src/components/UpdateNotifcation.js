import React, { useEffect, useState } from "react";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FoodleAPI from "../utils/api";
import CachedIcon from "@mui/icons-material/Cached";

const UpdateNotifcation = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const api = new FoodleAPI();

    api
      .getVersion()
      .then((result) => {
        const updateAvailable =
          result?.clientVersion !== process.env.REACT_APP_FOODLE_VERSION;
        if (updateAvailable) {
          setVisible(true);
        }
      })
      .catch((err) => console.error(err));
    return () => {};
  }, []);

  const forceSWupdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update().then(() => {
          window.location.reload();
        });
      });
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={visible}
      message={
        <Button
          aria-label="close"
          color="inherit"
          onClick={() => setVisible(false)}
        >
          New Content available. Please restart the application!
        </Button>
      }
      action={[
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={() => setVisible(false)}
          key="close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>,
        <IconButton
          aria-label="reload"
          color="inherit"
          onClick={forceSWupdate}
          key="reload"
        >
          <CachedIcon fontSize="small" />
        </IconButton>,
      ]}
    />
  );
};

export default UpdateNotifcation;
