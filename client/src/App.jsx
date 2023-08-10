import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Detail from "./pages/Detail"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </>
  )
}

export default App
