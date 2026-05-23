import { createContext, useContext, useState, ReactNode } from "react"
import type { PersonalData } from "../types/forms/personal"

type GenericSection = Record<string, unknown>

export interface FormData {
  personal: Partial<PersonalData>
  address: GenericSection
  academic: GenericSection
  family: GenericSection
  income: GenericSection
  aggravatingFactors: GenericSection
  report: GenericSection
}

export interface FormContextType {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  updateFormData: (section: keyof FormData, data: GenericSection) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    address: {},
    academic: {},
    family: {},
    income: {},
    aggravatingFactors: {},
    report: {}
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

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) throw new Error('useFormContext must be used within a FormProvider')
  return context
}

