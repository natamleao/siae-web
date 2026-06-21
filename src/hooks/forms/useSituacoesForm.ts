import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SituacoesData {
  familiaresSituacoes: string[];
  vivenciouSituacoes: string[];
  transporteAcesso: string;
  seIdentifica: string;
  situacaoFamiliarDificil: string;
  participaProgramaSocial: string;
  outraFamiliares?: string;
  outraVivenciou?: string;
}

interface UseSituacoesFormOptions {
  isLastStep?: boolean;
  onAdvance?: () => void;
}

function computeStepValidity(/* formData: SituacoesData */) {
  // These questions are optional, so the step is always valid
  return true;
}

const initialFormData: SituacoesData = {
  familiaresSituacoes: [],
  vivenciouSituacoes: [],
  transporteAcesso: "",
  seIdentifica: "",
  situacaoFamiliarDificil: "",
  participaProgramaSocial: "",
  outraFamiliares: "",
  outraVivenciou: "",
};

export function useSituacoesForm({ isLastStep = false, onAdvance }: UseSituacoesFormOptions) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SituacoesData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isStepValid = computeStepValidity();

  const toggleCheckbox = useCallback((field: keyof Pick<SituacoesData, 'familiaresSituacoes' | 'vivenciouSituacoes'>, value: string) => {
    setFormData((prev) => {
      const arr = prev[field] as string[];
      const exists = arr.includes(value);
      return {
        ...prev,
        [field]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      } as SituacoesData;
    });
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value } as SituacoesData));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  }, [errors]);

  const handleCancel = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitAttempted(false);
    navigate("/");
  }, [navigate]);

  const handleSaveDraft = useCallback(() => {
    localStorage.setItem("situacoesImpacto", JSON.stringify(formData));
    toast.success("Formulário salvo como rascunho!");
  }, [formData]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitAttempted(true);

      // optional step — always valid

      localStorage.setItem("situacoesImpacto", JSON.stringify(formData));

      if (isLastStep) {
        toast.success("Formulário enviado com sucesso!");
        navigate("/dashboard");
      } else {
        onAdvance?.();
      }
    },
    [isLastStep, formData, onAdvance, navigate]
  );

  return {
    formData,
    errors,
    submitAttempted,
    isStepValid,
    toggleCheckbox,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  };
}
