import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FamilyMember {
  id: string;
  nomeCompleto: string;
  dataNascimento: string;
  situacaoOcupacional: string;
  rendaMensal: string;
  contribuiRenda: string;
}

interface ComposicaoFamiliarData {
  membros: FamilyMember[];
}

interface UseComposicaoFamiliarFormOptions {
  isLastStep?: boolean;
  onAdvance?: () => void;
}

function computeStepValidity(formData: ComposicaoFamiliarData) {
  // At least one family member must be added and filled
  return formData.membros.length > 0 && formData.membros.every(membro => 
    membro.nomeCompleto.trim() &&
    membro.dataNascimento.trim() &&
    membro.situacaoOcupacional.trim() &&
    membro.rendaMensal.trim() &&
    membro.contribuiRenda.trim()
  );
}

const initialFamilyMember: FamilyMember = {
  id: "",
  nomeCompleto: "",
  dataNascimento: "",
  situacaoOcupacional: "",
  rendaMensal: "",
  contribuiRenda: "",
};

const initialFormData: ComposicaoFamiliarData = {
  membros: [{ ...initialFamilyMember, id: "1" }],
};

export function useComposicaoFamiliarForm({ isLastStep = false, onAdvance }: UseComposicaoFamiliarFormOptions) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ComposicaoFamiliarData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isStepValid = computeStepValidity(formData);

  const addMembro = useCallback(() => {
    const newId = Date.now().toString();
    const newMembro: FamilyMember = {
      ...initialFamilyMember,
      id: newId,
    };
    setFormData((prev) => ({
      ...prev,
      membros: [...prev.membros, newMembro],
    }));
  }, []);

  const removeMembro = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      membros: prev.membros.filter((membro) => membro.id !== id),
    }));
  }, []);

  const updateMembro = useCallback((id: string, field: keyof FamilyMember, value: string) => {
    setFormData((prev) => ({
      ...prev,
      membros: prev.membros.map((membro) =>
        membro.id === id ? { ...membro, [field]: value } : membro
      ),
    }));

    if (errors[`${id}-${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${id}-${field}`];
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
    localStorage.setItem("composicaoFamiliar", JSON.stringify(formData));
    toast.success("Formulário salvo como rascunho!");
  }, [formData]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitAttempted(true);

      if (!isStepValid) {
        toast.error("Por favor, preencha todos os membros da família!");
        return;
      }

      localStorage.setItem("composicaoFamiliar", JSON.stringify(formData));

      if (isLastStep) {
        toast.success("Formulário enviado com sucesso!");
        navigate("/dashboard");
      } else {
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
    addMembro,
    removeMembro,
    updateMembro,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  };
}
