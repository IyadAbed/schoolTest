import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
});

export default function FormDialog({ handleClose, handleClickOpen, open }) {
  function handleSubmit(values) {
    console.log(values);
  }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        update{" "}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Update Info</DialogContentText>
          <Formik
            initialValues={{
              username: "",
              email: "",
              isActive: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} name="email" label="Email" fullWidth />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="role">Status</InputLabel>
                    <Field as={Select} name="isActive" label="status">
                      <MenuItem value="true">active</MenuItem>
                      <MenuItem value="false">disable</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                update
              </Button>
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
