import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { PersonalData } from "../types/forms/personal";
import { formatCPF, validateCPF, formatDate, validateDate, formatPhone, validatePhone, validateRG, validateForm } from "../utils/validateForm";

type FormData = PersonalData;

interface UseIdentificacaoPessoalFormOptions {
	isLastStep?: boolean;
	onAdvance?: () => void;
}


function computeStepValidity(formData: FormData, valids: Record<string, boolean>) {
	return Boolean(
		formData.nomeCompleto.trim()
		&& formData.cpf.trim()
		&& formData.rg.trim()
		&& formData.dataNascimento.trim()
		&& formData.responsavel.trim()
		&& formData.nomeResponsavel.trim()
		&& formData.sexo.trim()
		&& formData.identidadeGenero.trim()
		&& formData.orientacaoSexual.trim()
		&& formData.etniaRacaCor.trim()
		&& formData.estadoCivil.trim()
		&& formData.temDeficiencia.trim()
		&& formData.telefonePrincipal.trim()
		&& formData.emailInstitucional.trim()
		&& valids.cpf
		&& valids.rg
		&& valids.dataNascimento
		&& valids.telefonePrincipal
		&& valids.emailInstitucional
	);
}

const initialFormData: FormData = {
	nomeCompleto: "",
	cpf: "",
	rg: "",
	dataNascimento: "",
	responsavel: "",
	temDeficiencia: "",
	nomeResponsavel: "",
	sexo: "",
	identidadeGenero: "",
	orientacaoSexual: "",
	etniaRacaCor: "",
	estadoCivil: "",
	deficiencias: [],
	telefonePrincipal: "",
	emailInstitucional: "",
};

export function useIdentificacaoPessoalForm({ isLastStep = false, onAdvance }: UseIdentificacaoPessoalFormOptions = {}) {
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitAttempted, setSubmitAttempted] = useState(false);
	const [valids, setValids] = useState<Record<string, boolean>>({
		cpf: false,
		rg: false,
		dataNascimento: false,
		telefonePrincipal: false,
		emailInstitucional: false,
	});
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id } = e.target;
		const rawValue = e.target.value;
		const value =
			id === "cpf"
				? formatCPF(rawValue)
				: id === "dataNascimento"
					? formatDate(rawValue)
					: id === "telefonePrincipal"
						? formatPhone(rawValue)
						: rawValue;

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

		setValids((prev) => {
			const next = { ...prev };
			if (id === "cpf") next.cpf = validateCPF(value);
			if (id === "rg") next.rg = validateRG(value);
			if (id === "dataNascimento") next.dataNascimento = validateDate(value);
			if (id === "telefonePrincipal") next.telefonePrincipal = validatePhone(value);
			if (id === "emailInstitucional") next.emailInstitucional = value.endsWith("@alu.ufc.br");
			return next;
		});
	};

	const handleSaveDraft = () => {
		try {
			localStorage.setItem("identificacaoPessoalDraft", JSON.stringify(formData));
			toast.success("Rascunho salvo");
		} catch {
			toast.error("Erro ao salvar rascunho");
		}
	};

	const handleCancel = () => {
		if (confirm("Tem certeza que deseja cancelar o preenchimento?")) {
			localStorage.removeItem("identificacaoPessoalDraft");
			setFormData(initialFormData);
			toast.info("Preenchimento cancelado");
		}
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setSubmitAttempted(true);

		if (!validateForm(formData, setErrors)) {
			toast.error("Não foi possível salvar os dados. Verifique os campos destacados.");
			return;
		}

		setLoading(true);

		try {
			console.log("Dados do formulário:", formData);
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
				toast.error("Erro ao processar a identificação pessoal");
			}
		} finally {
			setLoading(false);
		}
	};

	const hasErrors = Object.values(errors).some(Boolean);
	const isDisabled = loading || hasErrors;
	const isStepValid = computeStepValidity(formData, valids);

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
