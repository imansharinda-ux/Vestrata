import { useEffect, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import ProfileSidebar from "../components/profile/ProfileSidebar.jsx";
import ProfileTab from "../components/profile/ProfileTab.jsx";
import SecurityTab from "../components/profile/SecurityTab.jsx";
import PreferencesTab from "../components/profile/PreferencesTab.jsx";
import AccountTab from "../components/profile/AccountTab.jsx";
import Toast from "../components/common/Toast.jsx";
import { currentUser } from "../data/profile.js";
import { getInitials } from "../utils/validation.js";

const TOAST_DURATION_MS = 2600;

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(currentUser);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message) => {
    setToast({ message, id: Date.now() });
  };

  const saveProfile = (changes) => {
    setUser((current) => ({ ...current, ...changes }));
    showToast("Profile saved");
  };

  const initials = getInitials(user.fullName);

  return (
    <div className="app-page">
      <AppNavbar action={null} initials={initials} />

      <div className="settings">
        <ProfileSidebar user={user} initials={initials} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="settings__content">
          {activeTab === "profile" && <ProfileTab user={user} initials={initials} onSave={saveProfile} />}
          {activeTab === "security" && <SecurityTab onPasswordChange={() => showToast("Password updated")} />}
          {activeTab === "preferences" && <PreferencesTab />}
          {activeTab === "account" && <AccountTab />}
        </main>
      </div>

      {toast && <Toast key={toast.id} message={toast.message} />}
    </div>
  );
}

export default ProfilePage;
