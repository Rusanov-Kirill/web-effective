import { useRoutes } from "react-router-dom";
import Header from './components/Header'
import Characters from "./pages/Characters.tsx";


function App() {
  const routes = useRoutes([
    { path: '/', element: <Characters />, index: true },
    { path: '/characters', element: <Characters /> },
  ]);

  return (
    <>
      <Header />
      <main>{routes}</main>
    </>
  )
}

export default App
