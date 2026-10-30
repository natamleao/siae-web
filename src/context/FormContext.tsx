import { useState } from "react"
import type { ReactNode } from "react"
import { FormContext } from "./formContextDefinition"

type GenericSection = Record<string, unknown>

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState({
    personal: {},
    address: {},
    academic: {},
    family: {},
    income: {},
    aggravatingFactors: {},
    report: {}
  })

  function updateFormData(section: keyof typeof formData, data: GenericSection) {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  return (
    <FormContext.Provider value={{ formData, setFormData, updateFormData }}>
      {children}
    </FormContext.Provider>
  )
}