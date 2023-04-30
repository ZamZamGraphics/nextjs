import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Logo from "../public/logo.svg";
import { Alert } from "@mui/material";

function Login() {
  const router = useRouter();

  const [error, setError] = useState({
    username: null,
    password: null,
    common: null,
  });

  // get return url from query parameters or default to '/'
  const returnUrl = "/dashboard";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(returnUrl);
    }
  }, [router, returnUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const apiurl = "http://localhost:4000/api/users/login";
    await axios
      .post(apiurl, data)
      .then(function (response) {
        setError({
          username: null,
          password: null,
          common: null,
        });
        localStorage.setItem("token", response.data.token);
        router.push(returnUrl);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 400) {
            let errors = error.response.data.errors;
            setError({
              username: errors.hasOwnProperty("username")
                ? errors.username.msg
                : null,
              password: errors.hasOwnProperty("password")
                ? errors.password.msg
                : null,
              common: errors.hasOwnProperty("common")
                ? errors.common.msg
                : null,
            });
          } else {
            // server error message
            setError({
              username: null,
              password: null,
              common: error.response.data.message,
            });
          }
        } else {
          // Network error message
          setError({
            username: null,
            password: null,
            common: error.message,
          });
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth="sm">
        <Box
          sx={{
            lineHeight: "inherit",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            display: "flex",
          }}
        >
          <Card sx={{ borderRadius: 3, padding: 1 }}>
            <CardContent>
              <Image src={Logo} alt="Company Name" className="m-auto pb-5" />
              {error.common && <Alert severity="error">{error.common}</Alert>}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 2 }}
                noValidate
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  error={error.username && true}
                  id={error.username && "outlined-error"}
                  helperText={error.username}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  error={error.password && true}
                  id={error.password && "outlined-error"}
                  helperText={error.password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2, borderRadius: 28 }}
                  variant="contained"
                  className="btn-primary"
                >
                  Sign In
                </Button>
                <Typography component="p">
                  <Link href="/lost-password">Forgot password?</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default Login;
