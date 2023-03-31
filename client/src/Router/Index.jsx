import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import Documents from "../pages/Documents/Index";
import Team from "../pages/Team/Index";
import Calendar from "../pages/Events/Index";
import Entry from "../pages/User/Index";
import Admin from "../pages/Admin/Index";
import HOCAuth from "../helpers/HOC/Auth";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HOCAuth child={Home} auth />} />
            <Route path="/documents" element={<HOCAuth child={Documents} auth />} />
            <Route path="/team" element={<HOCAuth child={Team} auth />} />
            <Route path="/event" element={<HOCAuth child={Calendar} auth />} />
            <Route path="/entry" element={<Entry />} />
            <Route path="/admin" element={<Admin />} />         
        </Routes>
    );
}

export default Router;
