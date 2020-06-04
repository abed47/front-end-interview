import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import "../App.css";
import Input from "@material-ui/core/Input";
import CircularProgress from '@material-ui/core/CircularProgress';

import { useMutation, ApolloProvider } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Box } from "@material-ui/core";

const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

const CREATE_USER = gql`
  mutation(
      $name: String!
      $email: String!
      $phone: Int!
      $address: String!
      $zipCode: Int!
      $imgUrl: String!
  ) {
    createUser(
        name: $name
        email: $email
        phone: $phone
        address: $address
        zipCode: $zipCode
        imgUrl: $imgUrl
    ) {
      id
    }
  }
`;

const SignUpForm = (client) => {
  const [addfile, { adduserLoading, addusererror }] = useMutation(UPLOAD_FILE);
  const [addUser, {data}] = useMutation(CREATE_USER);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("")


  const uploadFile = async (values) => {
    const file = values.img.target.files[0];
    addfile({ variables: { file } })
      .then((data) => {
        addUser({ variables: {
            name: values.firstName + " " + values.lastName,
            email: values.email,
            phone: values.phone,
            address: values.address,
            zipCode: values.zipCode,
            imgUrl: `http://localhost:4000/uploads/${data.data.singleUpload.filename}`
        }}).then(res => {
            setLoading(false)
            setSuccess(true)
            setMsg("Success!");
            setOpen(true)
        }).catch(err => {
            setLoading(false)
            setSuccess(false)
            setMsg("an error occurd, try again");
            setOpen(true)
        })
      })
      .catch((err) => console.log(err));
  };

  const signUp = data => {
      setLoading(true)
      uploadFile(data)
  }
  return (
    <>
      <CssBaseline />
      <div className="paper">
        <Typography className="titleT" component="h1" variant="h5">
          Sign up
        </Typography>
        <Box>
            {
                open ? <h5 component="h5" variant="h5">
                {msg}
              </h5> : null
            }

        </Box>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            phone: "",
            zipCode: "",
            img: "",
          }}
          onSubmit={(data) => {signUp(data)}}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form className="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstNameField"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                    value={values.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lnameField"
                    onChange={handleChange}
                    value={values.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="emailField"
                    onChange={handleChange}
                    value={values.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="number"
                    id="phoneNumberField"
                    onChange={handleChange}
                    value={values.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="text"
                    id="addressField"
                    onChange={handleChange}
                    value={values.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="zipCode"
                    label="Zip Code"
                    type="number"
                    id="zipCode"
                    onChange={handleChange}
                    value={values.zipCode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    variant="outlined"
                    required
                    fullWidth
                    name="img"
                    type="file"
                    id="imgField"
                    onChange={(e) => {
                        e.persist()
                        values.img = e
                    }}
                    value={values.img.filename}
                  />
                </Grid>
              </Grid>
              <div className="wrapper">
                <Button
                variant="contained"
                color="primary"
                className="buttonClassName"
                
                disabled={loading}
                onClick={handleSubmit}
                >
                SignUp
                </Button>
                {loading && <CircularProgress size={24} className="buttonProgress" />}
            </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUpForm;
