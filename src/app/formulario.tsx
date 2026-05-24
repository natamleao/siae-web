import { Stepper } from "../components/StepperForm"
import { FormStepHook } from "../hooks/formSteps"
import { Header } from "../components/Header"
import ButtonForms from "../components/ButtonsForm"
import { IdentificacaoPessoal } from "../components/forms/IdentificacaoPessoal"
import { Footer } from "../components/Footer"

export function Formulario() {
  const steps = [
    {
      title: "Identificação Pessoal",
      component: <IdentificacaoPessoal />,
      formId: "identificacao-pessoal-form"
    }
  ]

  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep, } = FormStepHook(7)


  return (
    <main>
      <section className="min-h-screen bg-white">
        <Header />
        <Stepper totalSteps={7} currentStep={currentStep+1} title={steps[currentStep]?.title} />
        <div>
          {steps[currentStep]?.component}
        </div>

        <ButtonForms
          nextStep={nextStep}
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