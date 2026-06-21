import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface DadosAcademicosData {
  matricula: string;
  graduacao: string;
  turmaGraduacao: string;
  modalidadeIngresso: string;
  recebeAuxilio: string;
}

interface UseDadosAcademicosFormOptions {
  isLastStep?: boolean;
  onAdvance?: () => void;
}

function computeStepValidity(formData: DadosAcademicosData) {
  return Boolean(
    formData.matricula.trim() &&
    formData.graduacao.trim() &&
    formData.turmaGraduacao.trim() &&
    formData.modalidadeIngresso.trim() &&
    formData.recebeAuxilio.trim()
  );
}

const initialFormData: DadosAcademicosData = {
  matricula: "",
  graduacao: "",
  turmaGraduacao: "",
  modalidadeIngresso: "",
  recebeAuxilio: "",
};

export function useDadosAcademicosForm({ isLastStep = false, onAdvance }: UseDadosAcademicosFormOptions) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DadosAcademicosData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isStepValid = computeStepValidity(formData);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
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
    // Save to localStorage or call API
    localStorage.setItem("dadosAcademicos", JSON.stringify(formData));
    toast.success("Formulário salvo como rascunho!");
  }, [formData]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitAttempted(true);

      // if (!isStepValid) {
      //   toast.error("Por favor, preencha todos os campos obrigatórios!");
      //   return;
      // }

      // Save data to localStorage or API
      localStorage.setItem("dadosAcademicos", JSON.stringify(formData));
      
      if (isLastStep) {
        // Handle final submission
        toast.success("Formulário enviado com sucesso!");
        navigate("/dashboard");
      } else {
        // Move to next step
        onAdvance?.();
      }
    },
    [isStepValid, isLastStep, formData, onAdvance, navigate]
  );

  return {
    formData,
    errors,
    submitAttempted,
    isStepValid,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  };
}
