import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { translate } from "../../../utils/translater";
import { isObjectEmpty } from "../../../utils/functions";

const SecurityForm = () => {
  const [values, setValues] = useState({ errors: {} });

  const validate = () => {
    const errors = {};

    if (values.password.length === 0) {
      errors["password"] = translate("validation-error/password-missing");
    } else if (values.password.length < 8) {
      errors["password"] = translate("validation-error/password-too-short");
    }

    if (values.repeatPassword.length === 0) {
      errors["repeatPassword"] = translate("validation-error/password-missing");
    } else if (values.repeatPassword.length < 8) {
      errors["repeatPassword"] = translate(
        "validation-error/password-too-short"
      );
    }

    if (
      values.password.length > 7 &&
      values.repeatPassword.length > 7 &&
      values.password.length !== values.repeatPassword.length
    ) {
      errors["password"] = translate(
        "validation-error/password-does-not-match"
      );
      errors["repeatPassword"] = translate(
        "validation-error/password-does-not-match"
      );
    }

    const result = isObjectEmpty(errors);
    if (!result) setValues({ ...values, errors: errors });

    return result;
  };

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <Box>
      <Typography variant="h6">Passwort ändern</Typography>
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
    </Box>
  );
};

export default SecurityForm;
