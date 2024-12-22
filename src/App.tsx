import { useRoutes } from "react-router-dom";
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import routesConfig from "./config/routesConfig.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const routes = useRoutes(routesConfig);

  return (
    <>
      <Header />
      <main>{routes}</main>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  )
}

export default App
