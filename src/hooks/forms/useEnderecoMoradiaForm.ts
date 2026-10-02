import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  situacaoMoradia: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  estado: string;
  municipioOrigemFamilia: string;
  condicaoMoradiaAtual: string;
};

interface Options {
  isLastStep?: boolean;
  onAdvance?: () => void;
}

const initialFormData: FormData = {
  situacaoMoradia: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  municipio: "",
  estado: "",
  municipioOrigemFamilia: "",
  condicaoMoradiaAtual: "",
};

function validateEndereco(formData: FormData, setErrors: (e: Record<string, string>) => void) {
  const newErrors: Record<string, string> = {};
  const required = "Campo obrigatório não preenchido.";

  if (!formData.situacaoMoradia.trim()) newErrors.situacaoMoradia = required;
  if (!formData.logradouro.trim()) newErrors.logradouro = required;
  if (!formData.numero.trim()) newErrors.numero = required;
  if (!formData.bairro.trim()) newErrors.bairro = required;
  if (!formData.municipio.trim()) newErrors.municipio = required;
  if (!formData.estado.trim()) newErrors.estado = required;
  if (!formData.condicaoMoradiaAtual.trim()) newErrors.condicaoMoradiaAtual = required;

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export function useEnderecoMoradiaForm({ isLastStep = false, onAdvance }: Options = {}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSaveDraft = useCallback(() => {
    try {
      localStorage.setItem("enderecoMoradiaDraft", JSON.stringify(formData));
      toast.success("Rascunho salvo");
    } catch {
      toast.error("Erro ao salvar rascunho");
    }
  }, [formData]);

  const handleCancel = useCallback(() => {
    if (confirm("Tem certeza que deseja cancelar o preenchimento?")) {
      localStorage.removeItem("enderecoMoradiaDraft");
      setFormData(initialFormData);
      toast.info("Preenchimento cancelado");
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!validateEndereco(formData, setErrors)) {
      toast.error("Não foi possível salvar os dados. Verifique os campos destacados.");
      return;
    }

    setLoading(true);
    try {
      // console.log("Endereço e moradia:", formData);
      toast.success("Endereço registrado com sucesso!");
      if (isLastStep) {
        setTimeout(() => navigate("/dashboard"), 1500);
        return;
      }
      onAdvance?.();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao processar o endereço");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = Boolean(
    formData.situacaoMoradia.trim() &&
    formData.logradouro.trim() &&
    formData.numero.trim() &&
    formData.bairro.trim() &&
    formData.municipio.trim() &&
    formData.estado.trim() &&
    formData.condicaoMoradiaAtual.trim()
  );

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
    isDisabled,
    isStepValid,
  };
}