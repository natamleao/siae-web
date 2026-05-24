import { FaCheck } from "react-icons/fa6"

interface StepperProps {
  totalSteps: number
  currentStep: number
  title: string
}

export function Stepper({ totalSteps, currentStep, title }: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1)

  return (
    <section className="w-full bg-white px-4 pt-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 lg:flex-row lg:items-start lg:gap-10 relative">
        <div className="flex-1  w-full">
          <header className="mx-auto flex  max-w-[720px] flex-col items-center gap-2">
            <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-[2.125rem] mb-3 font-semibold tracking-tight text-black">
              {title}
            </h1>

            <div className="flex w-full items-center ">
              <div className="flex flex-1 items-center">
                <div className="h-1 sm:h-2 flex-1 transition-all bg-green-600 rounded-l-2xl " />
                {steps.map((step) => {
                  const isCompleted = step <= currentStep
                  return (
                    <div key={step} className="flex flex-1 items-center">
                      <div className={`
                        relative z-10 flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border-4 text-xs sm:text-sm font-bold shadow-sm transition-all
                        ${isCompleted
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-200 bg-gray-200 text-gray-400"}
                      `}>
                        {isCompleted ? <FaCheck className="h-3 w-3 sm:h-4 sm:w-4" /> : ""}
                      </div>

                      {step !== totalSteps && (
                        <div className={`
                          h-1 sm:h-2 flex-1 transition-all -ml-1
                          ${step < currentStep ? "bg-green-600" : "bg-gray-200"}
                        `} />
                      )}
                    </div>
                  )
                })}
              </div>

              <span className="min-w-fit text-sm sm:text-base font-semibold text-gray-500">
                {currentStep}/{totalSteps}
              </span>
            </div>

            <div className="h-[2px] sm:h-[3px] w-full bg-gray-400" />
          </header>
        </div>
      </div>
    </section>
  )
}
