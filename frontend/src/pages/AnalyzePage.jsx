import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import Stepper from "../components/analyze/Stepper.jsx";
import PropertyDetailsStep from "../components/analyze/PropertyDetailsStep.jsx";
import EstimateStep from "../components/analyze/EstimateStep.jsx";
import PriceLoanStep from "../components/analyze/PriceLoanStep.jsx";
import InsuranceStep from "../components/analyze/InsuranceStep.jsx";
import ResultsStep from "../components/analyze/ResultsStep.jsx";
import AiDrawer from "../components/analyze/AiDrawer.jsx";
import { defaultDetails, defaultDeal, defaultInsurance } from "../data/analyzeOptions.js";
import {
  estimateProperty,
  analyzeDeal,
  getWarnings,
  getAiExplanation,
  getSellerQuestions,
} from "../utils/analysis.js";
import { roundToThousand } from "../utils/format.js";

const ESTIMATE_DELAY_MS = 1100;

function AnalyzePage() {
  const [step, setStep] = useState(1);
  const [reachedStep, setReachedStep] = useState(1);
  const [details, setDetails] = useState(defaultDetails);
  const [deal, setDeal] = useState(defaultDeal);
  const [insurance, setInsurance] = useState(defaultInsurance);
  const [horizon, setHorizon] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const estimate = useMemo(() => estimateProperty(details), [details]);
  const result = analyzeDeal({ details, estimate, deal, insurance, horizon });
  const warnings = getWarnings({ estimate, result, hazardInfo: result.hazardInfo });

  const cityName = details.city.trim() || estimate.state.name;
  const street = details.street.trim();
  const address = (street ? street + ", " : "") + cityName + ", " + estimate.state.code;

  const goToStep = (number) => {
    setStep(number);
    setReachedStep((current) => Math.max(current, number));
    setIsAiOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateDetails = (field, value) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  const updateDeal = (changes) => {
    setDeal((current) => ({ ...current, ...changes }));
  };

  const updateInsurance = (changes) => {
    setInsurance((current) => ({ ...current, ...changes }));
  };

  const requestEstimate = () => {
    setIsLoading(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!deal.priceTouched) {
        const asking = roundToThousand(estimate.value * 1.03);
        updateDeal({ asking: String(asking), offer: String(roundToThousand(asking * 0.97)) });
      }
      setIsLoading(false);
      goToStep(2);
    }, ESTIMATE_DELAY_MS);
  };

  const closeAi = useCallback(() => setIsAiOpen(false), []);

  return (
    <div className="app-page">
      <AppNavbar />
      <Stepper
        currentStep={step}
        reachedStep={reachedStep}
        onStepClick={goToStep}
        onBack={() => goToStep(Math.max(1, step - 1))}
      />

      <main className="analyze">
        {step === 1 && (
          <PropertyDetailsStep
            details={details}
            sqft={estimate.sqft}
            cityName={cityName}
            isLoading={isLoading}
            onChange={updateDetails}
            onSubmit={requestEstimate}
          />
        )}

        {step === 2 && (
          <EstimateStep
            details={details}
            estimate={estimate}
            address={address}
            onEdit={() => goToStep(1)}
            onContinue={() => goToStep(3)}
          />
        )}

        {step === 3 && (
          <PriceLoanStep
            estimate={estimate}
            deal={deal}
            result={result}
            onDealChange={updateDeal}
            onContinue={() => goToStep(4)}
          />
        )}

        {step === 4 && (
          <InsuranceStep
            result={result}
            insurance={insurance}
            onInsuranceChange={updateInsurance}
            onContinue={() => goToStep(5)}
          />
        )}

        {step === 5 && (
          <ResultsStep
            estimate={estimate}
            result={result}
            deal={deal}
            address={address}
            horizon={horizon}
            warnings={warnings}
            onHorizonChange={setHorizon}
            onOpenAi={() => setIsAiOpen(true)}
            onChangeInsurance={() => goToStep(4)}
          />
        )}
      </main>

      {isAiOpen && (
        <AiDrawer
          text={getAiExplanation({ estimate, result, cityName })}
          warnings={warnings}
          questions={getSellerQuestions(estimate.state)}
          onClose={closeAi}
        />
      )}
    </div>
  );
}

export default AnalyzePage;
