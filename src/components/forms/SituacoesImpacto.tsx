import { useEffect, type ChangeEvent } from "react";
import { ToastContainer } from 'react-toastify';
import { InputField } from "../Input";
import { SelectField } from "../SelectField";
import { useSituacoesForm } from "../../hooks/useSituacoesForm";
import { FaCheck } from "react-icons/fa6";

interface SituacoesImpactoProps {
  onValidityChange?: (isValid: boolean) => void;
  onAdvance?: () => void;
  isLastStep?: boolean;
  onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function SituacoesImpacto({ onValidityChange, onAdvance, isLastStep = false, onSidebarActionsChange }: SituacoesImpactoProps) {
  const {
    formData,
    submitAttempted,
    isStepValid,
    toggleCheckbox,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  } = useSituacoesForm({ isLastStep, onAdvance });

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleInputChange(event);
  };

  const CheckboxOption = ({
    checked,
    label,
    onToggle,
  }: {
    checked: boolean;
    label: string;
    onToggle: () => void;
  }) => (
    <label className="flex cursor-pointer items-center gap-3">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-white ${checked ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"}`}>
        {checked ? <FaCheck className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      </span>
      <span>{label}</span>
    </label>
  );
  useEffect(() => {
    onValidityChange?.(isStepValid);
  }, [isStepValid, onValidityChange]);

  useEffect(() => {
    onSidebarActionsChange?.({ onCancel: handleCancel, onSaveDraft: handleSaveDraft });
  }, [handleCancel, handleSaveDraft, onSidebarActionsChange]);

  return (
    <main className="flex flex-col min-h-screen">
      <ToastContainer />
      <section className="bg-white grow flex w-full justify-center items-start pb-12 pt-7 px-4 relative">
        <div className="text-black w-full max-w-2xl">
          <form id="situacoes-impacto-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                As perguntas a seguir são opcionais e servem para entender melhor sua situação. Essas informações ajudam a oferecer apoio adequado. Você pode marcar mais de uma opção ou escolher "Não se aplica".
              </p>
            </div>

            {/* Situações na família */}
            <div>
              <label className="block text-md font-semibold text-black mb-2">Você ou alguém da sua família possui alguma das situações abaixo?</label>
              <div className="grid gap-2">
                <CheckboxOption checked={formData.familiaresSituacoes.includes('doenca-cronica')} label="Doença crônica (ex: diabetes, asma)" onToggle={() => toggleCheckbox('familiaresSituacoes', 'doenca-cronica')} />
                <CheckboxOption checked={formData.familiaresSituacoes.includes('doenca-grave')} label="Doença grave (ex: câncer, doenças que exigem tratamento contínuo)" onToggle={() => toggleCheckbox('familiaresSituacoes', 'doenca-grave')} />
                <CheckboxOption checked={formData.familiaresSituacoes.includes('deficiencia')} label="Deficiência" onToggle={() => toggleCheckbox('familiaresSituacoes', 'deficiencia')} />
                <CheckboxOption checked={formData.familiaresSituacoes.includes('uso-medicamentos')} label="Uso contínuo de medicamentos" onToggle={() => toggleCheckbox('familiaresSituacoes', 'uso-medicamentos')} />
                <CheckboxOption checked={formData.familiaresSituacoes.includes('outra-familia')} label="Outra..." onToggle={() => toggleCheckbox('familiaresSituacoes', 'outra-familia')} />
                <CheckboxOption checked={formData.familiaresSituacoes.includes('nao-se-aplica-familia')} label="Não se aplica" onToggle={() => toggleCheckbox('familiaresSituacoes', 'nao-se-aplica-familia')} />
                {formData.familiaresSituacoes.includes('outra-familia') && (
                  <div className="pt-2">
                    <InputField id="outraFamiliares" label="Descreva a outra opção:" type="text" value={formData.outraFamiliares ?? ''} onChange={handleTextChange} />
                  </div>
                )}
              </div>
            </div>

            {/* Situações já vivenciadas */}
            <div>
              <label className="block text-md font-semibold text-black mb-2">Você já passou por alguma das situações abaixo? Você pode não responder, se preferir.</label>
              <div className="grid gap-2">
                <CheckboxOption checked={formData.vivenciouSituacoes.includes('violencia-domestica')} label="Violência doméstica" onToggle={() => toggleCheckbox('vivenciouSituacoes', 'violencia-domestica')} />
                <CheckboxOption checked={formData.vivenciouSituacoes.includes('violencia-psicologica')} label="Violência psicológica" onToggle={() => toggleCheckbox('vivenciouSituacoes', 'violencia-psicologica')} />
                <CheckboxOption checked={formData.vivenciouSituacoes.includes('violencia-comunidade')} label="Violência na comunidade (urbana)" onToggle={() => toggleCheckbox('vivenciouSituacoes', 'violencia-comunidade')} />
                <CheckboxOption checked={formData.vivenciouSituacoes.includes('outra-vivida')} label="Outra..." onToggle={() => toggleCheckbox('vivenciouSituacoes', 'outra-vivida')} />
                <CheckboxOption checked={formData.vivenciouSituacoes.includes('nao-se-aplica-vivida')} label="Não se aplica" onToggle={() => toggleCheckbox('vivenciouSituacoes', 'nao-se-aplica-vivida')} />
                {formData.vivenciouSituacoes.includes('outra-vivida') && (
                  <div className="pt-2">
                    <InputField id="outraVivenciou" label="Descreva a outra opção:" type="text" value={formData.outraVivenciou ?? ''} onChange={handleTextChange} />
                  </div>
                )}
              </div>
            </div>

            {/* Transporte e selects */}
            <div>
              <SelectField
                id="transporteAcesso"
                label="Como é o seu acesso ao transporte no dia a dia para chegar até a faculdade?"
                value={formData.transporteAcesso}
                onChange={handleSelectChange}
                options={[
                  { value: "", label: "Selecione uma opção" },
                  { value: "nao-tem-acesso", label: "Não tenho acesso a transporte" },
                  { value: "pago-dificuldade", label: "Transporte pago com dificuldade de locomoção" },
                  { value: "pago-sem-dificuldade", label: "Transporte pago sem dificuldade de locomoção" },
                  { value: "gratuito-dificuldade", label: "Transporte gratuito com dificuldade de locomoção" },
                  { value: "gratuito-sem-dificuldade", label: "Transporte gratuito sem dificuldade de locomoção" },
                ]}
              />

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <SelectField
                  id="seIdentifica"
                  label="Você se identifica com alguma das situações abaixo?"
                  value={formData.seIdentifica}
                  onChange={handleSelectChange}
                  options={[
                    { value: "", label: "Selecione uma opção" },
                    { value: "gestante", label: "Estou gestante" },
                    { value: "tem-filhos", label: "Tenho filhos" },
                    { value: "nao-se-aplica", label: "Não se aplica" },
                  ]}
                />

                <SelectField
                  id="situacaoFamiliarDificil"
                  label="Você considera que sua situação familiar é difícil ou instável?"
                  value={formData.situacaoFamiliarDificil}
                  onChange={handleSelectChange}
                  options={[
                    { value: "", label: "Selecione uma opção" },
                    { value: "sim", label: "Sim" },
                    { value: "nao", label: "Não" },
                  ]}
                />
              </div>

              <div className="mt-4">
                <SelectField
                  id="participaProgramaSocial"
                  label="Você participa de algum programa social?"
                  value={formData.participaProgramaSocial}
                  onChange={handleSelectChange}
                  options={[
                    { value: "", label: "Selecione uma opção" },
                    { value: "bolsa-familia", label: "Bolsa Família" },
                    { value: "bpc-loas", label: "BPC/LOAS" },
                    { value: "seguro-safra", label: "Seguro Safra" },
                    { value: "outro", label: "Outro..." },
                    { value: "nao-se-aplica", label: "Não se aplica" },
                  ]}
                />
              </div>
            </div>

            {submitAttempted && !isStepValid && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700">Por favor, verifique os campos obrigatórios.</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
