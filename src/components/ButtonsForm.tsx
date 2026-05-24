import { useState } from "react";

interface ButtonFormsProps {
  nextStep: () => void
  previousStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  formId?: string
}

export default function ButtonForms({ nextStep, previousStep, isFirstStep, isLastStep, formId }: ButtonFormsProps) {
  const [loading, setLoading] = useState(false);
  const isDisabled = loading;

  return (
    <>
      <div className="flex gap-4 justify-center my-8">
        <button
          type="button"
          disabled={isFirstStep}
          onClick={previousStep}
          className="w-[220px] h-[35px] rounded-md border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Voltar
        </button>
        <button
          type={isLastStep ? "submit" : "button"}
          form={isLastStep ? formId : undefined}
          disabled={isDisabled}
          onClick={isLastStep ? undefined : nextStep}

          className={`w-[220px] h-[35px] rounded-md font-semibold transition-all duration-300 ${isDisabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          {loading ? "Processando..."
            : isLastStep
              ? "Finalizar"
              : "Prosseguir"}
        </button>
      </div>
    </>
  )
}