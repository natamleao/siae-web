
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useRelatoPessoalForm } from "../../hooks/forms/useRelatoPessoalForm";

interface Props {
  onValidityChange?: (isValid: boolean) => void;
  onAdvance?: () => void;
  isLastStep?: boolean;
  onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function RelatoPessoal({ onValidityChange, onAdvance, isLastStep = false, onSidebarActionsChange }: Props) {
  const {
    formData,
    errors,
    submitAttempted,
    isStepValid,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  } = useRelatoPessoalForm({ isLastStep, onAdvance });

  useEffect(() => {
    onValidityChange?.(isStepValid);
  }, [isStepValid, onValidityChange]);

  useEffect(() => {
    onSidebarActionsChange?.({ onCancel: handleCancel, onSaveDraft: handleSaveDraft });
  }, [handleCancel, handleSaveDraft, onSidebarActionsChange]);

  return (
    <main className="flex flex-col">
      <ToastContainer />
      <section className="bg-white flex w-full justify-center items-start pb-12 pt-7 px-4 relative">
        <div className="text-black w-full max-w-2xl">
          <form id="relato-pessoal-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-semibold text-[20px]">Texto explicativo (Máximo de 2000 caracteres)</h2>

            <div className="flex flex-col gap-2">
              <textarea
                id="relatoPessoal"
                className={`w-full h-84 border rounded-md p-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                  submitAttempted && errors.relatoPessoal ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Descreva com detalhes sua situação e os motivos da solicitação do auxílio."
                maxLength={2000}
                value={formData.relatoPessoal}
                onChange={handleInputChange}
              />

              {submitAttempted && errors.relatoPessoal ? (
                <p className="text-xs text-red-500">{errors.relatoPessoal}</p>
              ) : null}
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}