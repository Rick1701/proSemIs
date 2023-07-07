import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos CSS de Bootstrap
import 'assets/css/styles.css'; // Importa los estilos CSS del dashboard SB Admin
import 'assets/js/scripts.js'; // Importa los scripts JavaScript del dashboard SB Admin

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}