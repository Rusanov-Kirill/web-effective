import { useRoutes } from "react-router-dom"
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Characters from "./pages/Characters.tsx"
import Comics from "./pages/Comics.tsx"


function App() {
  const routes = useRoutes([
    { path: '/', element: <Characters />, index: true },
    { path: '/characters', element: <Characters /> },
    { path: '/comics', element: <Comics />}
  ]);

  return (
    <>
      <Header />
      <main>{routes}</main>
      <Footer />
    </>
  )
}

export default App
