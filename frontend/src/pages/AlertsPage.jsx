import { useState } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import LineMask from "../components/LineMask.jsx";
import LiveTicker from "../components/alerts/LiveTicker.jsx";
import AlertFeedItem from "../components/alerts/AlertFeedItem.jsx";
import Switch from "../components/common/Switch.jsx";
import { alertFeed, alertTabs, alertSettings, defaultAlertSettings } from "../data/alerts.js";

const navbarAction = { label: "Analyze a property", to: "/analyze", style: "primary" };

function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedId, setSelectedId] = useState(alertFeed[0].id);
  const [settings, setSettings] = useState(defaultAlertSettings);

  const visibleAlerts = alertFeed.filter((alert) => activeTab === "all" || alert.type === activeTab);
  const activeAlert = visibleAlerts.find((alert) => alert.id === selectedId) || visibleAlerts[0] || alertFeed[0];

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="app-page">
      <AppNavbar action={navbarAction} />
      <LiveTicker />

      <section className="alerts">
        <div className="alerts__header">
          <div className="alerts__intro">
            <h1 className="alerts__title">
              <LineMask>Know the moment your numbers change.</LineMask>
            </h1>
            <p className="alerts__text pop-in pop-in--first">
              When rates, prices, insurance or state rules move, we re-run your saved deals and tell you what changed.
            </p>
          </div>
          <div className="mini-tabs mini-tabs--large pop-in pop-in--first">
            {alertTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={tab.value === activeTab ? "mini-tabs__tab mini-tabs__tab--active" : "mini-tabs__tab"}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="alerts__layout">
          <div className="alerts__feed">
            {visibleAlerts.map((alert, index) => (
              <AlertFeedItem
                key={alert.id}
                alert={alert}
                isActive={alert.id === activeAlert.id}
                delay={0.1 + index * 0.07 + "s"}
                onSelect={() => setSelectedId(alert.id)}
              />
            ))}
          </div>

          <div className="alerts__side pop-in pop-in--second">
            <div className="alert-detail">
              <span className="alert-detail__meta">
                {activeAlert.tag} · {activeAlert.time}
              </span>
              <p className="alert-detail__title">{activeAlert.title}</p>
              <p className="alert-detail__text">{activeAlert.detail}</p>
              <Link className="arrow-link" to="/compare">
                Open affected properties <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="alert-settings">
              <p className="alert-settings__title">My alerts</p>
              {alertSettings.map((setting) => (
                <div key={setting.key} className="alert-settings__row">
                  <span className="alert-settings__text">
                    <span className="alert-settings__label">{setting.label}</span>
                    <span className="alert-settings__description">{setting.description}</span>
                  </span>
                  <Switch
                    isOn={settings[setting.key]}
                    onToggle={() => toggleSetting(setting.key)}
                    label={`Toggle ${setting.label}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AlertsPage;
