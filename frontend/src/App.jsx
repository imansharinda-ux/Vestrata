import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AnalyzePage from "./pages/AnalyzePage.jsx";
import ListingsPage from "./pages/ListingsPage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import AlertsPage from "./pages/AlertsPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import GuidePage from "./pages/GuidePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/analyze" element={<AnalyzePage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/alerts" element={<AlertsPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/guide" element={<GuidePage />} />
    </Routes>
  );
}

export default App;
