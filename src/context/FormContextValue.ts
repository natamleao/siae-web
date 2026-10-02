import { createContext } from "react"
import type { PersonalData } from "../types/forms/personal"

export type GenericSection = Record<string, unknown>

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

export const FormContext = createContext<FormContextType | undefined>(undefined)
