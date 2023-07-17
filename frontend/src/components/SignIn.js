import { useRouter } from 'next/router';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');

    
    console.log('Name:', name);
    console.log('Email:', email);


    try {
        const response = await axios.post('http://localhost:3001/api/auth/signin', { name, email });
        console.log(response.data); // Puedes mostrar la respuesta del backend en la consola

      // Aquí puedes realizar acciones adicionales después de un inicio de sesión exitoso

      // Redirige a la vista index
      router.push('/index');
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar los errores de inicio de sesión, como mostrar un mensaje de error en el frontend
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoComplete="name"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
