import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  relatoPessoal: string;
};

interface Options {
  isLastStep?: boolean;
  onAdvance?: () => void;
}

const initialFormData: FormData = {
  relatoPessoal: "",
};

function validateFormData(formData: FormData, setErrors: (errors: Record<string, string>) => void) {
  const newErrors: Record<string, string> = {};

  if (!formData.relatoPessoal.trim()) {
    newErrors.relatoPessoal = "Descreva sua situação antes de prosseguir.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

function computeStepValidity(formData: FormData) {
  return Boolean(formData.relatoPessoal.trim());
}

export function useRelatoPessoalForm({ isLastStep = false, onAdvance }: Options = {}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleSaveDraft = useCallback(() => {
    try {
      localStorage.setItem("relatoPessoalDraft", JSON.stringify(formData));
      toast.success("Rascunho salvo");
    } catch {
      toast.error("Erro ao salvar rascunho");
    }
  }, [formData]);

  const handleCancel = useCallback(() => {
    if (confirm("Tem certeza que deseja cancelar o preenchimento?")) {
      localStorage.removeItem("relatoPessoalDraft");
      setFormData(initialFormData);
      toast.info("Preenchimento cancelado");
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!validateFormData(formData, setErrors)) {
      toast.error("Não foi possível salvar os dados. Verifique os campos destacados.");
      return;
    }

    setLoading(true);

    try {
      // console.log("Relato pessoal:", formData);
      toast.success("Relato pessoal salvo com sucesso!");
      if (isLastStep) {
        setTimeout(() => navigate("/dashboard"), 2000);
        return;
      }

      onAdvance?.();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao processar o relato pessoal");
      }
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = computeStepValidity(formData);
  const hasErrors = Object.values(errors).some(Boolean);
  const isDisabled = loading || hasErrors;

  return {
    formData,
    errors,
    submitAttempted,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
    isStepValid,
    isDisabled,
  };
}
