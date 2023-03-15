import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import Documents from "../pages/Documents/Index";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documents" element={<Documents />} />
            {/* 
            <Route path="/tea/:id" element={<SingleTea />} />
            <Route path="/about" element={<About />} />
            <Route path="/entry" element={<Entry />} />
            <Route path="/dashboard" element={<HOC child={Dashboard} auth={true}/>} /> */}
            
        </Routes>
    );
}

export default Router;
