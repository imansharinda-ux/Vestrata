import { wizardSteps } from "../../data/analyzeOptions.js";

function Stepper({ currentStep, reachedStep, onStepClick, onBack }) {
  return (
    <div className="stepper">
      <div className="stepper__side">
        {currentStep > 1 && (
          <button type="button" className="back-button" onClick={onBack}>
            ← Back
          </button>
        )}
      </div>

      <ol className="stepper__list">
        {wizardSteps.map((label, index) => {
          const number = index + 1;
          const isCurrent = number === currentStep;
          const isDone = number < currentStep;
          const isLocked = number > reachedStep;

          let markClass = "stepper__mark";
          if (isCurrent) markClass += " stepper__mark--current";
          else if (!isLocked) markClass += " stepper__mark--open";

          return (
            <li key={label} className="stepper__item">
              <button
                type="button"
                className="stepper__node"
                onClick={() => onStepClick(number)}
                disabled={isLocked}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className={markClass}>{isDone ? "✓" : number}</span>
                <span className={isLocked ? "stepper__label stepper__label--locked" : "stepper__label"}>{label}</span>
              </button>
              {number < wizardSteps.length && (
                <span className={number < reachedStep ? "stepper__line stepper__line--done" : "stepper__line"}></span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="stepper__side stepper__side--right">
        Step {currentStep} of {wizardSteps.length}
      </div>
    </div>
  );
}

export default Stepper;
