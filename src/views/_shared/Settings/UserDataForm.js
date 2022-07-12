import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Auth } from "../../../utils/auth";
import { translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";

const UserDataForm = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    tab: 0,
    isDirty: false,
    errors: {},
  });

  useEffect(() => {
    const auth = new Auth();

    auth
      .getCurrentUser()
      .then((res) => {
        setValues((state) => ({ ...state, ...res.data }));
      })
      .catch((err) => console.error(err));

    const beforeUnloadCallback = (event) => {
      if (values.isDirty) {
        event.returnValue = false;
      } else {
        return false;
      }
    };

    window.addEventListener("beforeunload", beforeUnloadCallback);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadCallback);
    };
  }, [values.isDirty]);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value, isDirty: true });

  const validate = () => {
    const errors = {};

    if (values.firstName.trim().length === 0) {
      errors["firstName"] = translate("validation-error/firstName-missing");
    }

    if (values.lastName.trim().length === 0) {
      errors["lastName"] = translate("validation-error/lastName-missing");
    }

    if (values.username.trim().length === 0) {
      errors["username"] = translate("validation-error/username-missing");
    }

    if (values.email.trim().length === 0) {
      errors["email"] = translate("validation-error/email-missing");
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container component="form" spacing={2} noValidate>
        <Grid item xs={12} md={6}>
          <TextField
            name="firstName"
            label="Vorname"
            variant="filled"
            autoComplete="given-name"
            value={values.firstName}
            onChange={handleChange}
            error={values.errors["firstName"]?.length > 0}
            helperText={values.errors["firstName"]}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="lastName"
            label="Nachname"
            variant="filled"
            autoComplete="family-name"
            value={values.lastName}
            onChange={handleChange}
            error={values.errors["lastName"]?.length > 0}
            helperText={values.errors["lastName"]}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="email"
            id="textEmail"
            name="email"
            label="E-Mail Adresse"
            variant="filled"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            error={values.errors["email"]?.length > 0}
            helperText={values.errors["email"]}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="username"
            id="textusername"
            name="username"
            label="Benutzername"
            variant="filled"
            autoComplete="username"
            value={values.username}
            helperText="Der Benutzername kann nicht geändert werden."
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Speichern
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDataForm;
