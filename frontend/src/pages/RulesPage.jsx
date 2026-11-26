import { useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import StateSearch from "../components/rules/StateSearch.jsx";
import StateTileMap from "../components/rules/StateTileMap.jsx";
import StateDetails from "../components/rules/StateDetails.jsx";
import { mapModes } from "../data/stateRules.js";
import { findState } from "../utils/analysis.js";
import { getStateSummary } from "../utils/stateRules.js";

function RulesPage() {
  const [selectedCode, setSelectedCode] = useState("TX");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("rentControl");

  const summary = getStateSummary(findState(selectedCode));

  const selectState = (code) => {
    setSelectedCode(code);
    setQuery("");
  };

  return (
    <div className="app-page">
      <AppNavbar action={null} />

      <div className="rules">
        <section className="rules__map card-pop">
          <div className="stage__heading">
            <h1 className="rules__title">State rules for landlords</h1>
            <p className="stage__subtitle">
              Pick a state on the map or search for it. We use these rules in every analysis.
            </p>
          </div>

          <div className="rules__controls">
            <StateSearch query={query} onQueryChange={setQuery} onSelect={selectState} />
            <div className="segment-tabs">
              {mapModes.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={option.value === mode ? "segment-tabs__tab segment-tabs__tab--active" : "segment-tabs__tab"}
                  onClick={() => setMode(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <StateTileMap mode={mode} selectedCode={selectedCode} query={query} onSelect={selectState} />
        </section>

        <StateDetails key={selectedCode} summary={summary} />
      </div>
    </div>
  );
}

export default RulesPage;
