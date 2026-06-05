import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  rendaTotalFamiliar: string;
  rendaPerCapita: string;
  moradia: string;
  transporte: string;
  alimentacao: string;
  saude: string;
  educacao: string;
  outrasDespesas: string;
};

interface Options {
  isLastStep?: boolean;
  onAdvance?: () => void;
}

const initialFormData: FormData = {
  rendaTotalFamiliar: "",
  rendaPerCapita: "",
  moradia: "",
  transporte: "",
  alimentacao: "",
  saude: "",
  educacao: "",
  outrasDespesas: "",
};

const requiredMessages: Partial<Record<keyof FormData, string>> = {
  moradia: "Campo obrigatório não preenchido.",
  transporte: "Campo obrigatório não preenchido.",
  alimentacao: "Campo obrigatório não preenchido.",
  saude: "Campo obrigatório não preenchido.",
  educacao: "Campo obrigatório não preenchido.",
  outrasDespesas: "Campo obrigatório não preenchido.",
};

function validateFormData(formData: FormData, setErrors: (errors: Record<string, string>) => void) {
  const newErrors: Record<string, string> = {};

  (Object.keys(requiredMessages) as Array<keyof FormData>).forEach((key) => {
    if (!formData[key].trim()) {
      newErrors[key] = requiredMessages[key] ?? "Campo obrigatório não preenchido.";
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

function computeStepValidity(formData: FormData) {
  return Boolean(
    formData.moradia.trim() &&
    formData.transporte.trim() &&
    formData.alimentacao.trim() &&
    formData.saude.trim() &&
    formData.educacao.trim() &&
    formData.outrasDespesas.trim()
  );
}

export function useRendasDespesasForm({ isLastStep = false, onAdvance }: Options = {}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      localStorage.setItem("rendasDespesasDraft", JSON.stringify(formData));
      toast.success("Rascunho salvo");
    } catch {
      toast.error("Erro ao salvar rascunho");
    }
  }, [formData]);

  const handleCancel = useCallback(() => {
    if (confirm("Tem certeza que deseja cancelar o preenchimento?")) {
      localStorage.removeItem("rendasDespesasDraft");
      setFormData(initialFormData);
      toast.info("Preenchimento cancelado");
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);

    // if (!validateFormData(formData, setErrors)) {
    //   toast.error("Não foi possível salvar os dados. Verifique os campos destacados.");
    //   return;
    // }

    setLoading(true);

    try {
      // console.log("Rendas e despesas:", formData);
      toast.success("Informações salvas com sucesso");
      if (isLastStep) {
        setTimeout(() => navigate("/dashboard"), 2000);
        return;
      }

      onAdvance?.();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Não foi possível salvar os dados. Verifique os campos destacados");
      }
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const isDisabled = loading || hasErrors;
  const isStepValid = computeStepValidity(formData);

  return {
    formData,
    errors,
    submitAttempted,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
    isDisabled,
    isStepValid,
  };
}
