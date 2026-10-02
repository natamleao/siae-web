import { useState } from "react"
import type { ReactNode } from "react"
import {
  FormContext,
  type FormData,
  type GenericSection,
} from "./FormContextValue"

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    address: {},
    academic: {},
    family: {},
    income: {},
    aggravatingFactors: {},
    report: {},
  })

  function updateFormData(section: keyof FormData, data: GenericSection) {
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