import { useCallback, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import PickView from "../components/compare/PickView.jsx";
import CompareDashboard from "../components/compare/CompareDashboard.jsx";
import ScoreDrawer from "../components/compare/ScoreDrawer.jsx";
import { savedProperties, DEFAULT_SELECTED, MAX_SELECTED, MIN_SELECTED } from "../data/savedProperties.js";

const navbarAction = { label: "Analyze a new property", to: "/analyze", style: "primary" };

function ComparePage() {
  const [selectedIds, setSelectedIds] = useState(DEFAULT_SELECTED);
  const [view, setView] = useState("pick");
  const [explainedId, setExplainedId] = useState(null);

  const selectedProperties = selectedIds.map((id) => savedProperties.find((property) => property.id === id));
  const explainedProperty = savedProperties.find((property) => property.id === explainedId);

  const toggleProperty = (id) => {
    if (selectedIds.includes(id)) {
      const remaining = selectedIds.filter((selectedId) => selectedId !== id);
      setSelectedIds(remaining);
      if (remaining.length < MIN_SELECTED) setView("pick");
    } else if (selectedIds.length < MAX_SELECTED) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const closeDrawer = useCallback(() => setExplainedId(null), []);

  return (
    <div className="app-page">
      <AppNavbar action={navbarAction} />

      {view === "pick" ? (
        <PickView selectedIds={selectedIds} onToggle={toggleProperty} onCompare={() => setView("dashboard")} />
      ) : (
        <CompareDashboard
          properties={selectedProperties}
          onChangeSelection={() => setView("pick")}
          onRemove={toggleProperty}
          onExplain={setExplainedId}
        />
      )}

      {explainedProperty && (
        <ScoreDrawer property={explainedProperty} comparedProperties={selectedProperties} onClose={closeDrawer} />
      )}
    </div>
  );
}

export default ComparePage;
