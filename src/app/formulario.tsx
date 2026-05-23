import { Stepper } from "../components/StepperForm"
import { formStepHook } from "../hooks/formSteps"
import { Header } from "../components/Header"

export function Formulario() {
  const step = formStepHook(7)
  return (
    <main>
      <section className="min-h-screen bg-white">
        <Header />
        <Stepper totalSteps={7} currentStep={step.currentStep} title="Endereço e Moradia" />
      </section>

    </main>

  )
}