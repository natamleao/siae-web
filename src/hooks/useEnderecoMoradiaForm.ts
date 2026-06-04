import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AddressData } from "../types/forms/address";

type FormData = AddressData;

interface UseEnderecoMoradiaFormOptions {
	isLastStep?: boolean;
	onAdvance?: () => void;
}

function computeStepValidity(formData: FormData) {
	return Boolean(
		formData.situacaoMoradia.trim()
		&& formData.logradouro.trim()
		&& formData.numero.trim()
		&& formData.bairro.trim()
		&& formData.municipio.trim()
		&& formData.estado.trim()
		&& formData.municipioOrigemFamilia.trim()
		&& formData.condicaoMoradiaAtual.trim()
	);
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

export function useEnderecoMoradiaForm({ isLastStep = false, onAdvance }: UseEnderecoMoradiaFormOptions = {}) {
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitAttempted, setSubmitAttempted] = useState(false);
	const [valids] = useState<Record<string, boolean>>({});
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id } = e.target;
		const value = e.target.value;

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

	const handleSaveDraft = () => {
		try {
			localStorage.setItem("enderecoMoradiaDraft", JSON.stringify(formData));
			toast.success("Rascunho salvo");
		} catch {
			toast.error("Erro ao salvar rascunho");
		}
	};

	const handleCancel = () => {
		if (confirm("Tem certeza que deseja cancelar o preenchimento?")) {
			localStorage.removeItem("enderecoMoradiaDraft");
			setFormData(initialFormData);
			toast.info("Preenchimento cancelado");
		}
	};

	const validateForm = (data: FormData): Record<string, string> => {
		const newErrors: Record<string, string> = {};

		if (!data.situacaoMoradia.trim()) {
			newErrors.situacaoMoradia = "Situação de moradia é obrigatória";
		}

		if (!data.logradouro.trim()) {
			newErrors.logradouro = "Logradouro é obrigatório";
		}

		if (!data.numero.trim()) {
			newErrors.numero = "Número é obrigatório";
		}

		if (!data.bairro.trim()) {
			newErrors.bairro = "Bairro é obrigatório";
		}

		if (!data.municipio.trim()) {
			newErrors.municipio = "Município é obrigatório";
		}

		if (!data.estado.trim()) {
			newErrors.estado = "Estado é obrigatório";
		}

		if (!data.municipioOrigemFamilia.trim()) {
			newErrors.municipioOrigemFamilia = "Município de origem da família é obrigatório";
		}

		if (!data.condicaoMoradiaAtual.trim()) {
			newErrors.condicaoMoradiaAtual = "Condição de moradia atual é obrigatória";
		}

		return newErrors;
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setSubmitAttempted(true);

		const validationErrors = validateForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error("Não foi possível salvar os dados. Verifique os campos destacados.");
			return;
		}

		setLoading(true);

		try {
			console.log("Dados do formulário de Endereço e Moradia:", formData);
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
				toast.error("Erro ao processar o endereço e moradia");
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
		valids,
		handleInputChange,
		handleSaveDraft,
		handleCancel,
		handleSubmit,
		isDisabled,
		isStepValid,
	};
}
