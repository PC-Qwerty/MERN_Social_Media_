import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // used for form library
import * as yup from "yup"; //validation library for user validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // uses react redux to store user information
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

//yup validation schema for the structure of (from user using the form)how the form library is going to save user information
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Field Required"),
  lastName: yup.string().required("Field Required"),
  email: yup.string().email("Invalid Email").required("Field Required"),
  user_name: yup.string().required("Field Required"),
  password: yup.string().required("Field Required"),
  location: yup.string().required("Field Required"),
  occupation: yup.string().required("Field Required"),
  picture: yup.string().required("Field Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Field Required"),
  password: yup.string().required("Field Required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  user_name: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login"); // initially the page is set to loginpage and there register page can be navigated
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width : 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      // here FormData used is an object uses mapping value with value in the array 
      formData.append(value, values[value]); // normally not a legal method but due to image to be uploaded .. Each form value is appended
    }
    formData.append('picturePath', values.picture.name); // here picture is referenced from form with 'picture' in the image input section
    // console.log(formData);
    const savedUserResponse = await fetch(
      `${REACT_APP_BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();

    onSubmitProps.resetForm();

    // need to change this without going to login page after user registered
    if (savedUser) {
      setPageType('login');
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await fetch(
      `${REACT_APP_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      }
    );
    const loggedInUser = await loggedInUserResponse.json();
    onSubmitProps.resetForm();
    if (loggedInUser) {
      dispatch(
        setLogin({
          user: loggedInUser.user,
          token: loggedInUser.token,
        })
      );
      // console.log(JSON.stringify(loggedInUser.user));
      // console.log(JSON.stringify(loggedInUser.token));
      // console.log(loggedInUser);
      navigate('/home');
      // console.log("LOGIN COMPLETE");
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    // here onSubmitProps are end form data and values are form data values before submit
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* these values are coming from 'Formik' .. here handleSubmit (like a formal parameter)is essentially a handleFormSubmit */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          {/* Form Section */}
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" //here a grid of 4 columns of each size 1fraction
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // targeting any divs having this as a child class ( here the field takes full space 4 mentioned in the above rather than span 2 like in the below).... Also this doesn't uses media queries for responsive
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName" // must be same as the value provided in the initial values and schemas so that syncing os done properly
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName" // must be same as the value provided in the initial values and schemas so that syncing os done properly
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user_name}
                  name="user_name" // must be same as the value provided in the initial values and schemas so that syncing os done properly
                  error={
                    Boolean(touched.user_name) && Boolean(errors.user_name)
                  }
                  helperText={touched.user_name && errors.user_name}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location" // must be same as the value provided in the initial values and schemas so that syncing os done properly
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation" // must be same as the value provided in the initial values and schemas so that syncing os done properly
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg ,.png"
                    multiple={false}
                    onDrop={
                      (acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0]) // here picture is uploaded to the backend as 'picture' which is used in it as 'upload.single()'.
                    }
                  >
                    {/* here parameters are from DropZone component */}
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        // here getRootProps are passed to the div under it essentially initial values are passed
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main} `}
                        p="1rem"
                        sx={{ "&:hover": { curser: "pointer" } }}
                      >
                        <input {...getInputProps} />{" "}
                        {/* here input values are taken from input component */}
                        {!values.picture ? (
                          <p>
                            Add a <b>Profile Photo</b>
                          </p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email ID"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email" // must be same as the value provided in the initial values and schemas so that syncing os done properly
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password" // must be same as the value provided in the initial values and schemas so that syncing os done properly
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>

          {/* BUTTONS section */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "Login-->" : "Register-->"};
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an Account? Resister Now.."
                : "Already have an Account? Login Now.."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
