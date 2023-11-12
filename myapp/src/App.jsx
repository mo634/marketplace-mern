import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Singin from "./pages/Singin";
import Singup from "./pages/Singup";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/home" element={<Home />} />
        
        {/* protected route for each time navigate to /profile he will go to PrivateRoute */}
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={ <Profile/>} />
        </Route>

        <Route path="/about" element={ <About/>} />
        <Route path="/sign-in" element={ <Singin/>} />
        <Route path="/sign-up" element={ <Singup/>} />
    </Routes>
    </BrowserRouter>
  )
}