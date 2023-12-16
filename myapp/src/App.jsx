import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Singin from "./pages/Singin";
import Singup from "./pages/Singup";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from './pages/CreateListing';
import UpdateListing from "./pages/UpdateListing";
import ListingPage from "./pages/ListingPage";
import Search from "./components/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={ <About/>} />
        <Route path="/sign-in" element={ <Singin/>} />
        <Route path="/sign-up" element={ <Singup/>} />
        <Route path="/listings/:listId" element={ <ListingPage/>} />
        <Route path="/search" element={ <Search/>} />
        
        {/* protected route for each time navigate to /profile he will go to PrivateRoute */}
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={ <Profile/>} />
          <Route path="/create-listing" element={ <CreateListing/>} />
          <Route path="/update-listing/:listId" element={ <UpdateListing/>} />
        </Route>

    </Routes>
    </BrowserRouter>
  )
}