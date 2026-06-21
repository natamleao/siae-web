import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { InputField } from "../Input";
import { SelectField } from "../SelectField";
import { useDadosAcademicosForm } from "../../hooks/forms/useDadosAcademicosForm";

interface DadosAcademicosProps {
  onValidityChange?: (isValid: boolean) => void;
  onAdvance?: () => void;
  isLastStep?: boolean;
  onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function DadosAcademicos({ 
  onValidityChange, 
  onAdvance, 
  isLastStep = false, 
  onSidebarActionsChange 
}: DadosAcademicosProps) {
  const {
    formData,
    errors,
    submitAttempted,
    isStepValid,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  } = useDadosAcademicosForm({ isLastStep, onAdvance });

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
          <form id="dados-academicos-form" onSubmit={handleSubmit} className="space-y-2">
            {/* Seção: Dados Acadêmicos */}
            <div className="space-y-2 [&_label]:!text-[16px] [&_label]:!font-semibold [&_label]:!text-black">
              
              {/* Matrícula */}
              <InputField
                id="matricula"
                label="Digite sua matrícula:"
                type="text"
                placeholder="ex: 555555"
                value={formData.matricula}
                onChange={handleInputChange}
                error={errors.matricula}
                forceShowError={submitAttempted}
              />

              <div className="grid gap-4 md:grid-cols-2">
                {/* Graduação */}
                <SelectField
                  id="graduacao"
                  label="Qual graduação você está cursando?"
                  value={formData.graduacao}
                  onChange={handleInputChange}
                  error={errors.graduacao}
                  forceShowError={submitAttempted}
                  options={[
                    { value: "", label: "Selecionar uma opção" },
                    { value: "ciencia-computacao", label: "Ciência da Computação" },
                    { value: "eng-software", label: "Engenharia de Software" },
                    { value: "eng-civil", label: "Engenharia Civil" },
                    { value: "eng-mecanica", label: "Engenharia Mecânica" },
                    { value: "eng-producao", label: "Engenharia de Produção" },
                  ]}
                />

                {/* Turma/Semestre */}
                <SelectField
                  id="turmaGraduacao"
                  label="Qual o turno da graduação?"
                  value={formData.turmaGraduacao}
                  onChange={handleInputChange}
                  error={errors.turmaGraduacao}
                  forceShowError={submitAttempted}
                  options={[
                    { value: "", label: "Selecionar uma opção" },
                    { value: "matutino", label: "Matutino" },
                    { value: "vespertino", label: "Vespertino" },
                    { value: "noturno", label: "Noturno" },
                    { value: "integral", label: "Integral" },
                  ]}
                />
              </div>

              {/* Modalidade de Ingresso */}
              <SelectField
                id="modalidadeIngresso"
                label="Qual foi a modalidade do seu ingresso?"
                value={formData.modalidadeIngresso}
                onChange={handleInputChange}
                error={errors.modalidadeIngresso}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecionar uma opção" },
                  { value: "ampla-concorrencia", label: "Ampla Concorrência" },
                  { value: "cota-L1", label: "Cota L1" },
                  { value: "cota-L2", label: "Cota L2" },
                  { value: "cota-L5", label: "Cota L5" },
                  { value: "cota-L6", label: "Cota L6" },
                  { value: "cota-L9", label: "Cota L9" },
                  { value: "cota-L10", label: "Cota L10" },
                  { value: "cota-L13", label: "Cota L13" },
                  { value: "cota-L14", label: "Cota L14" },
                ]}
              />

              {/* Recebe Auxílio */}
              <SelectField
                id="recebeAuxilio"
                label="Você recebe ou já recebeu auxílio durante essa graduação?"
                value={formData.recebeAuxilio}
                onChange={handleInputChange}
                error={errors.recebeAuxilio}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecionar uma opção" },
                  { value: "sim", label: "Sim" },
                  { value: "nao", label: "Não" },
                ]}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
