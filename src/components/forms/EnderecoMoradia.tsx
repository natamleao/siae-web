import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { InputField } from "../Input";
import { SelectField } from "../SelectField";
import { useEnderecoMoradiaForm } from "../../hooks/useEnderecoMoradiaForm";

interface EnderecoMoradiaProps {
  onValidityChange?: (isValid: boolean) => void;
  onAdvance?: () => void;
  isLastStep?: boolean;
  onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function EnderecoMoradia({ onValidityChange, onAdvance, isLastStep = false, onSidebarActionsChange }: EnderecoMoradiaProps) {
  const {
    formData,
    errors,
    submitAttempted,
    valids,
    isStepValid,
    handleInputChange,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  } = useEnderecoMoradiaForm({ isLastStep, onAdvance });

  useEffect(() => {
    onValidityChange?.(isStepValid);
  }, [isStepValid, onValidityChange]);

  useEffect(() => {
    onSidebarActionsChange?.({ onCancel: handleCancel, onSaveDraft: handleSaveDraft });
  }, [handleCancel, handleSaveDraft, onSidebarActionsChange]);

  const estadosBrasileiros = [
    { value: "", label: "Selecionar uma opção" },
    { value: "AC", label: "AC" },
    { value: "AL", label: "AL" },
    { value: "AP", label: "AP" },
    { value: "AM", label: "AM" },
    { value: "BA", label: "BA" },
    { value: "CE", label: "CE" },
    { value: "DF", label: "DF" },
    { value: "ES", label: "ES" },
    { value: "GO", label: "GO" },
    { value: "MA", label: "MA" },
    { value: "MT", label: "MT" },
    { value: "MS", label: "MS" },
    { value: "MG", label: "MG" },
    { value: "PA", label: "PA" },
    { value: "PB", label: "PB" },
    { value: "PR", label: "PR" },
    { value: "PE", label: "PE" },
    { value: "PI", label: "PI" },
    { value: "RJ", label: "RJ" },
    { value: "RN", label: "RN" },
    { value: "RS", label: "RS" },
    { value: "RO", label: "RO" },
    { value: "RR", label: "RR" },
    { value: "SC", label: "SC" },
    { value: "SP", label: "SP" },
    { value: "SE", label: "SE" },
    { value: "TO", label: "TO" },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <ToastContainer />
      <section className="bg-white grow flex w-full justify-center items-start pb-12 pt-7 px-4 relative">
        <div className="text-black w-full max-w-2xl">
          <form id="endereco-moradia-form" onSubmit={handleSubmit} className="space-y-2">
            {/* Seção: Situação de Moradia */}
            <div className="space-y-2 [&_label]:!text-[16px] [&_label]:!font-semibold [&_label]:!text-black">
              <SelectField
                id="situacaoMoradia"
                label="Qual sua situação de moradia?"
                value={formData.situacaoMoradia}
                onChange={handleInputChange}
                error={errors.situacaoMoradia}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecionar uma opção" },
                  { value: "moradia_propria", label: "Própria" },
                  { value: "moradia_alugada", label: "Alugada" },
                  { value: "moradia_cedida", label: "Cedida" },
                  { value: "moradia_republica", label: "República" },
                  { value: "moradia_alojamento", label: "Alojamento" },
                  { value: "outra", label: "Outra..." }
                ]}
              />
            </div>

            {/* Seção: Informações do Endereço */}
            <div className="space-y-4">
              <h2 className="font-semibold text-[24px] text-[#000000]">Informações do seu endereço</h2>

              <div className="space-y-2 [&_label]:!text-[16px] [&_label]:!font-semibold [&_label]:!text-black">
                {/* Logradouro */}
                <InputField
                  id="logradouro"
                  label="Logradouro:"
                  type="text"
                  placeholder="ex: Rua José Martins de Lima"
                  value={formData.logradouro}
                  onChange={handleInputChange}
                  error={errors.logradouro}
                  forceShowError={submitAttempted}
                />

                {/* Número */}
                <InputField
                  id="numero"
                  label="Número:"
                  type="text"
                  placeholder="ex: 245"
                  value={formData.numero}
                  onChange={handleInputChange}
                  error={errors.numero}
                  forceShowError={submitAttempted}
                />

                {/* Complemento (Opcional) */}
                <InputField
                  id="complemento"
                  label="Complemento (opcional):"
                  type="text"
                  placeholder="ex: Bloco B, Apto. 204"
                  value={formData.complemento}
                  onChange={handleInputChange}
                  error={errors.complemento}
                  forceShowError={submitAttempted}
                />

                {/* Bairro */}
                <InputField
                  id="bairro"
                  label="Bairro:"
                  type="text"
                  placeholder="ex: Centro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  error={errors.bairro}
                  forceShowError={submitAttempted}
                />

                {/* Município e Estado */}
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="municipio"
                    label="Município:"
                    type="text"
                    placeholder="ex: Russas"
                    value={formData.municipio}
                    onChange={handleInputChange}
                    error={errors.municipio}
                    forceShowError={submitAttempted}
                  />

                  <SelectField
                    id="estado"
                    label="Estado:"
                    value={formData.estado}
                    onChange={handleInputChange}
                    error={errors.estado}
                    forceShowError={submitAttempted}
                    options={estadosBrasileiros}
                  />
                </div>

                {/* Município da origem da família */}
                <InputField
                  id="municipioOrigemFamilia"
                  label="Município ou origem da família:"
                  type="text"
                  placeholder="ex: Limoeiro do Norte"
                  value={formData.municipioOrigemFamilia}
                  onChange={handleInputChange}
                  error={errors.municipioOrigemFamilia}
                  forceShowError={submitAttempted}
                />
              </div>
            </div>

            {/* Seção: Condição de Moradia */}
            <div className="space-y-2 [&_label]:!text-[16px] [&_label]:!font-semibold [&_label]:!text-black">
              <SelectField
                id="condicaoMoradiaAtual"
                label="Condição de moradia atual:"
                value={formData.condicaoMoradiaAtual}
                onChange={handleInputChange}
                error={errors.condicaoMoradiaAtual}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecionar uma opção" },
                  { value: "familia", label: "Mora com família" },
                  { value: "sozinho", label: "Mora sozinho(a)" },
                  { value: "divide_aluguel", label: "Divide aluguel" },
                  { value: "mora_amigos", label: "Mora com amigos" },
                  { value: "outros", label: "Outros..." }
                ]}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
