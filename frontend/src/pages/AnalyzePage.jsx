import { useCallback, useEffect, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import Stepper from "../components/analyze/Stepper.jsx";
import PropertyDetailsStep from "../components/analyze/PropertyDetailsStep.jsx";
import EstimateStep from "../components/analyze/EstimateStep.jsx";
import PriceLoanStep from "../components/analyze/PriceLoanStep.jsx";
import InsuranceStep from "../components/analyze/InsuranceStep.jsx";
import ResultsStep from "../components/analyze/ResultsStep.jsx";
import AiDrawer from "../components/analyze/AiDrawer.jsx";
import { defaultDetails, defaultDeal, defaultInsurance } from "../data/analyzeOptions.js";
import { findState, getAiExplanation, getSellerQuestions } from "../utils/analysis.js";
import { fetchAnalysis, fetchEstimate } from "../services/analysisApi.js";
import { roundToThousand } from "../utils/format.js";

const ANALYSIS_DELAY_MS = 250;
const SERVER_ERROR = "We couldn't reach the analysis service. Make sure the backend is running, then try again.";

function AnalyzePage() {
  const [step, setStep] = useState(1);
  const [reachedStep, setReachedStep] = useState(1);
  const [details, setDetails] = useState(defaultDetails);
  const [deal, setDeal] = useState(defaultDeal);
  const [insurance, setInsurance] = useState(defaultInsurance);
  const [horizon, setHorizon] = useState(5);
  const [estimate, setEstimate] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAiOpen, setIsAiOpen] = useState(false);

  const hasEstimate = estimate !== null;
  const result = analysis ? analysis.result : null;
  const warnings = analysis ? analysis.warnings : [];

  const state = findState(details.stateCode);
  const sqft = Math.max(300, Number(details.sqft) || 0);
  const cityName = details.city.trim() || state.name;
  const street = details.street.trim();
  const address = (street ? street + ", " : "") + cityName + ", " + state.code;

  useEffect(() => {
    if (!hasEstimate) return undefined;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchAnalysis({ details, deal, insurance, horizon }, controller.signal)
        .then((data) => {
          setEstimate(data.estimate);
          setAnalysis(data);
          setError("");
        })
        .catch((requestError) => {
          if (requestError.name !== "AbortError") setError(SERVER_ERROR);
        });
    }, ANALYSIS_DELAY_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [hasEstimate, details, deal, insurance, horizon]);

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

  const requestEstimate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await fetchEstimate(details);
      if (!deal.priceTouched) {
        const asking = roundToThousand(data.value * 1.03);
        updateDeal({ asking: String(asking), offer: String(roundToThousand(asking * 0.97)) });
      }
      setEstimate(data);
      goToStep(2);
    } catch {
      setError(SERVER_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAi = useCallback(() => setIsAiOpen(false), []);

  const waitingMessage = <p className="analyze-message">Working out your numbers…</p>;

  return (
    <div className="app-page">
      <AppNavbar />
      <Stepper
        currentStep={step}
        reachedStep={reachedStep}
        onStepClick={goToStep}
        onBack={() => goToStep(Math.max(1, step - 1))}
      />

      {error && (
        <p className="analyze-message analyze-message--error" role="alert">
          {error}
        </p>
      )}

      <main className="analyze">
        {step === 1 && (
          <PropertyDetailsStep
            details={details}
            sqft={sqft}
            cityName={cityName}
            isLoading={isLoading}
            onChange={updateDetails}
            onSubmit={requestEstimate}
          />
        )}

        {step === 2 &&
          (estimate ? (
            <EstimateStep
              details={details}
              estimate={estimate}
              address={address}
              onEdit={() => goToStep(1)}
              onContinue={() => goToStep(3)}
            />
          ) : (
            waitingMessage
          ))}

        {step === 3 &&
          (result ? (
            <PriceLoanStep
              estimate={estimate}
              deal={deal}
              result={result}
              onDealChange={updateDeal}
              onContinue={() => goToStep(4)}
            />
          ) : (
            waitingMessage
          ))}

        {step === 4 &&
          (result ? (
            <InsuranceStep
              result={result}
              insurance={insurance}
              onInsuranceChange={updateInsurance}
              onContinue={() => goToStep(5)}
            />
          ) : (
            waitingMessage
          ))}

        {step === 5 &&
          (result ? (
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
          ) : (
            waitingMessage
          ))}
      </main>

      {isAiOpen && result && (
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
