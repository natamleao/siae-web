import { useState } from "react"

export function formStepHook(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1)

  function nextStep() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  function goToStep(step: number) {
    setCurrentStep(step)
  }

  const progress = ((currentStep + 1) / totalSteps) * 100

  return {
    currentStep,

    nextStep,
    previousStep,
    goToStep,

    progress,

    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
  }
}