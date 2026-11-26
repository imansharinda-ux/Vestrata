import { states } from "../../data/states.js";
import { mapGrid, DARK_TILE_COLOR } from "../../data/stateRules.js";
import { getTileColor, getLegend } from "../../utils/stateRules.js";

const WAVE_STEP = 0.035;
const ENTRY_STEP = 0.012;

function StateTileMap({ mode, selectedCode, query, onSelect }) {
  const search = query.trim().toLowerCase();
  const legend = getLegend(mode);

  const matchesSearch = (state) =>
    !search || state.name.toLowerCase().includes(search) || state.code.toLowerCase() === search;

  return (
    <div className="state-map">
      <div className="state-map__grid">
        {mapGrid.map((tile, index) => {
          const state = states.find((item) => item.code === tile.code);
          const color = getTileColor(state, mode);
          const isSelected = tile.code === selectedCode;

          let className = "state-tile";
          if (isSelected) className += " state-tile--selected";
          if (!matchesSearch(state)) className += " state-tile--dim";

          return (
            <button
              key={tile.code}
              type="button"
              className={className}
              onClick={() => onSelect(tile.code)}
              aria-label={state.name}
              aria-pressed={isSelected}
              data-name={state.name}
              style={{
                gridRow: tile.row + 1,
                gridColumn: tile.col + 1,
                animationDelay: index * ENTRY_STEP + "s",
                "--tile-bg": color,
                "--tile-color": color === DARK_TILE_COLOR ? "#FFFFFF" : "#1E2A23",
                "--wave-delay": (tile.row + tile.col) * WAVE_STEP + "s",
              }}
            >
              {tile.code}
            </button>
          );
        })}
      </div>

      <div className="state-map__legend">
        <span className="state-map__legend-title">{legend.title}</span>
        {legend.items.map((item) => (
          <span key={item.label} className="state-map__legend-item">
            <span className="state-map__swatch" style={{ background: item.color }}></span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default StateTileMap;
