import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import Documents from "../pages/Documents/Index";
import Team from "../pages/Team/Index";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/team" element={<Team />} />
            {/* 
            <Route path="/tea/:id" element={<SingleTea />} />
            <Route path="/about" element={<About />} />
            <Route path="/entry" element={<Entry />} />
            <Route path="/dashboard" element={<HOC child={Dashboard} auth={true}/>} /> */}
            
        </Routes>
    );
}

export default Router;
