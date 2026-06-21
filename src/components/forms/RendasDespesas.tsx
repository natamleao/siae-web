import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { InputField } from "../Input";
import { useRendasDespesasForm } from "../../hooks/forms/useRendasDespesasForm";

interface Props {
	onValidityChange?: (isValid: boolean) => void;
	onAdvance?: () => void;
	isLastStep?: boolean;
	onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function RendasDespesas({ onValidityChange, onAdvance, isLastStep = false, onSidebarActionsChange }: Props) {
	const {
		formData,
		errors,
		submitAttempted,
		isStepValid,
		handleInputChange,
		handleSaveDraft,
		handleCancel,
		handleSubmit,
	} = useRendasDespesasForm({ isLastStep, onAdvance });

	useEffect(() => {
		onValidityChange?.(isStepValid);
	}, [isStepValid, onValidityChange]);

	useEffect(() => {
		onSidebarActionsChange?.({ onCancel: handleCancel, onSaveDraft: handleSaveDraft });
	}, [handleCancel, handleSaveDraft, onSidebarActionsChange]);

	return (
		<main className="flex flex-col">
			<ToastContainer />
			<section className="bg-white flex w-full justify-center items-start pb-12 pt-7 px-4 relative">
				<div className="text-black w-full max-w-2xl">
					<form id="rendas-despesas-form" onSubmit={handleSubmit} className="space-y-4">

						<div className="grid gap-4 md:grid-cols-2">
							<InputField
								id="rendaTotalFamiliar"
								label="Renda total familiar"
								type="text"
								placeholder="Ex: 2.500,00"
								value={formData.rendaTotalFamiliar}
								onChange={handleInputChange}
								error={errors.rendaTotalFamiliar}
								forceShowError={submitAttempted}
							/>

							<InputField
								id="rendaPerCapita"
								label="Renda per capita"
								type="text"
								placeholder="Ex: 1.250,00"
								value={formData.rendaPerCapita}
								onChange={handleInputChange}
								error={errors.rendaPerCapita}
								forceShowError={submitAttempted}
							/>
						</div>

						<div className="rounded-md border border-gray-300 bg-slate-50 p-4 space-y-4">
							<h2 className="font-semibold text-[20px]">Despesas mensais: </h2>

							<div className="grid gap-4 md:grid-cols-2">
								<InputField
									id="moradia"
									label="Moradia"
									type="text"
									placeholder="Ex: 800,00"
									value={formData.moradia}
									onChange={handleInputChange}
									error={errors.moradia}
									forceShowError={submitAttempted}
								/>

								<InputField
									id="transporte"
									label="Transporte"
									type="text"
									placeholder="Ex: 200,00"
									value={formData.transporte}
									onChange={handleInputChange}
									error={errors.transporte}
									forceShowError={submitAttempted}
								/>

								<InputField
									id="alimentacao"
									label="Alimentação"
									type="text"
									placeholder="Ex: 600,00"
									value={formData.alimentacao}
									onChange={handleInputChange}
									error={errors.alimentacao}
									forceShowError={submitAttempted}
								/>

								<InputField
									id="saude"
									label="Saúde"
									type="text"
									placeholder="Ex: 150,00"
									value={formData.saude}
									onChange={handleInputChange}
									error={errors.saude}
									forceShowError={submitAttempted}
								/>

								<InputField
									id="educacao"
									label="Educação"
									type="text"
									placeholder="Ex: 150,00"
									value={formData.educacao}
									onChange={handleInputChange}
									error={errors.educacao}
									forceShowError={submitAttempted}
								/>

								<InputField
									id="outrasDespesas"
									label="Outras despesas"
									type="text"
									placeholder="Ex: 250,00"
									value={formData.outrasDespesas}
									onChange={handleInputChange}
									error={errors.outrasDespesas}
									forceShowError={submitAttempted}
								/>
							</div>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
}
