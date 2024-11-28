import { useRoutes } from "react-router-dom";
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Characters from "./pages/Characters.tsx";
import Comics from "./pages/Comics.tsx";
import CharacterDetails from "./pages/CharacterDetails.tsx";
import ComicDetails from "./pages/ComicDetails.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const routes = useRoutes([
    { path: '/', element: <Characters />, index: true },
    { path: '/characters', element: <Characters />},
    { path: '/comics', element: <Comics /> },
    { path: '/characters/:id', element: <CharacterDetails />},
    { path: '/comics/:id', element: <ComicDetails />}
  ]);

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
