import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import BotDirectory from "./components/home/BotDirectory";
import VerificationStart from "./components/bot-verification/VerificationStart";
import Pricing from "./components/home/Pricing";
import AddBot from "./components/home/AddBot";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ChoosePlan from "./components/ChoosePlan";
import { useAppContext } from "./context/AppContext";
import SpinnerOverlay from "./components/Spinner";

function App() {

  const { loading } = useAppContext();

  return (
    <BrowserRouter>

    {loading && <SpinnerOverlay /> }

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/plans-choosen" element={<ChoosePlan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verification-start" element={<VerificationStart />} />
        <Route path="/directory" element={<BotDirectory />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/add" element={<AddBot />} />

    </Routes>
    </BrowserRouter>

  )
}

export default App
