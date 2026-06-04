import { useState } from "react"
import { Stepper } from "../components/StepperForm"
import { FormStepHook } from "../hooks/formSteps"
import { Header } from "../components/Header"
import ButtonForms from "../components/ButtonsForm"
import { IdentificacaoPessoal } from "../components/forms/IdentificacaoPessoal"
import { EnderecoMoradia } from "../components/forms/EnderecoMoradia"
import { Footer } from "../components/Footer"
import { FormSidebar } from "../components/FormSidebar"

export function Formulario() {
  const [sidebarActions, setSidebarActions] = useState<{ onCancel: () => void; onSaveDraft: () => void } | null>(null)
  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep, } = FormStepHook(7)

  const steps = [
    {
      title: "Identificação Pessoal",
      component: <IdentificacaoPessoal onAdvance={nextStep} isLastStep={isLastStep} onSidebarActionsChange={setSidebarActions} />,
      formId: "identificacao-pessoal-form"
    },
    {
      title: "Endereço e Moradia",
      component: <EnderecoMoradia onAdvance={nextStep} isLastStep={isLastStep} onSidebarActionsChange={setSidebarActions} />,
      formId: "endereco-moradia-form"
    }
  ]


  return (
    <main>
      <section className="min-h-screen bg-white relative">
        <Header />
        <div className="mx-auto w-full max-w-[1100px] px-4 pt-7">
          {sidebarActions ? <FormSidebar onCancel={sidebarActions.onCancel} onSaveDraft={sidebarActions.onSaveDraft} /> : null}

          <div className="mx-auto flex w-full justify-center">
            <div className="w-full max-w-[720px]">
            <Stepper totalSteps={7} currentStep={currentStep+1} title={steps[currentStep]?.title} />
            <div>
              {steps[currentStep]?.component}
            </div>
            </div>
          </div>
        </div>

        <ButtonForms
          previousStep={previousStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          formId={steps[currentStep]?.formId}
        />
        <Footer />
      </section>

    </main>

  )
}