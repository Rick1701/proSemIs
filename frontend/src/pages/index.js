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

// Define una paleta de colores personalizada
const theme = createTheme({
  palette: {
    primary: {
      main: '#212226', // Negro primario
    },
    background: {
      default: '#F3F3FB', // Blanco
    },
    yellow: {
      main: '#FEE3A2', // Amarillo
    },
    brown: {
      main: '#564734', // Café
    },
    orange: {
      main: '#FFA570', // Naranjo
    },
    green: {
      main: '#778D45', // Verde
    },
  },
});

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');

    try {
      const response = await axios.post('http://146.83.198.35:1047/api/auth/signin', { name, email });
      console.log(response.data);

      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            borderRadius: '0.5rem',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="textPrimary">
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
              InputLabelProps={{ style: { color: theme.palette.primary.main } }}
              InputProps={{ style: { color: theme.palette.primary.main } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              InputLabelProps={{ style: { color: theme.palette.primary.main } }}
              InputProps={{ style: { color: theme.palette.primary.main } }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={<Typography color="primary">Remember me</Typography>}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* Aplicar el color personalizado "yellow" al enlace "Forgot password?" */}
                <Link href="#" variant="body2" sx={{ color: theme.palette.primary.main }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* Aplicar el color personalizado "yellow" al enlace "Don't have an account? Sign Up" */}
                <Link href="#" variant="body2" sx={{ color: theme.palette.primary.main }}>
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
