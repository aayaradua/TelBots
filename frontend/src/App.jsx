import Home from "./components/Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
