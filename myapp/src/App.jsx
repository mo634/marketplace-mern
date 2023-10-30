import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Singin from "./pages/Singin";
import Singup from "./pages/Singup";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/home" element={ <Home/>} />
        <Route path="/profile" element={ <Profile/>} />
        <Route path="/about" element={ <About/>} />
        <Route path="/sign-in" element={ <Singin/>} />
        <Route path="/sign-up" element={ <Singup/>} />
    </Routes>
    </BrowserRouter>
  )
}