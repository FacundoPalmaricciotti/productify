import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";

const AppRouter = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Dashboard" element={<Dashboard/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}

export {AppRouter};