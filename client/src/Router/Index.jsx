import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Index";
import Documents from "../pages/Documents/Index";
import Team from "../pages/Team/Index";
import Calendar from "../pages/Events/Index";
import Entry from "../pages/User/Index";
import Admin from "../pages/Admin/Index";
import LegalMentions from "../pages/Others/LegalMentions";
import PrivacyPolicy from "../pages/Others/PrivacyPolicy";
import HOCAuth from "../helpers/HOC/Auth";
import AccountPage from "../pages/User/AccountPage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HOCAuth child={Home} auth />} />
            <Route path="/documents" element={<HOCAuth child={Documents} auth />} />
            <Route path="/team" element={<HOCAuth child={Team} auth />} />
            <Route path="/event" element={<HOCAuth child={Calendar} auth />} />
            <Route path="/account" element={<HOCAuth child={AccountPage} auth />} />
            <Route path="/privacypolicy" element={ <HOCAuth child={PrivacyPolicy} />} />
            <Route path="/legalmentions" element={ <HOCAuth child={LegalMentions} />} />
            <Route path="/entry" element={<Entry />} />
            <Route path="/admin" element={<HOCAuth child={Admin} auth />} />
        </Routes>
    );
}

export default Router;