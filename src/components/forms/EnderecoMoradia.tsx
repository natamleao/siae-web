import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { InputField } from "../Input";
import { SelectField } from "../SelectField";
import { useEnderecoMoradiaForm } from "../../hooks/useEnderecoMoradiaForm";

interface Props {
  onValidityChange?: (isValid: boolean) => void;
  onAdvance?: () => void;
  isLastStep?: boolean;
  onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function EnderecoMoradia({ onValidityChange, onAdvance, isLastStep = false, onSidebarActionsChange }: Props) {
  const {
    formData,
    errors,
    submitAttempted,
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

  return (
    <main className="flex flex-col">
      <ToastContainer />
      <section className="bg-white flex w-full justify-center items-start pb-12 pt-7 px-4 relative">
        <div className="text-black w-full max-w-2xl">
          <form id="endereco-moradia-form" onSubmit={handleSubmit} className="space-y-4">

            <div className="mt-2 flex flex-col gap-4">
              <SelectField
                id="situacaoMoradia"
                label="Qual sua situação de moradia?"
                value={formData.situacaoMoradia}
                onChange={handleInputChange}
                error={errors.situacaoMoradia}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecione uma opção" },
                  { value: "morando_com_familia", label: "Mora com a família" },
                  { value: "morando_sozinho", label: "Morando sozinho(a)" },
                  { value: "divide_aluguel", label: "Divide aluguel" },
                  { value: "morando_com_amigos", label: "Morando com amigos" },
                  { value: "outros", label: "Outros..." },
                ]}
              />

              <h2 className="font-semibold text-[20px] ">Informações do seu endereço</h2>

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

              <InputField
                id="complemento"
                label="Complemento (opcional):"
                type="text"
                placeholder="ex: Bloco B, Apto. 204"
                value={formData.complemento}
                onChange={handleInputChange}
              />

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


              <div className="grid gap-4 md:grid-cols-2 mt-2">
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
                  options={[
                    { value: "", label: "Selecione uma opção" },
                    { value: "AC", label: "AC" },
                    { value: "AL", label: "AL" },
                    { value: "AP", label: "AP" },
                    { value: "AM", label: "AM" },
                    { value: "BA", label: "BA" },
                    { value: "CE", label: "CE" },
                    { value: "ES", label: "ES" },
                    { value: "GO", label: "GO" },
                    { value: "MA", label: "MA" },
                    { value: "MT", label: "MT" },
                    { value: "MS", label: "MS" },
                    { value: "MG", label: "MG" },
                    { value: "PA", label: "PA" },
                    { value: "PB", label: "PB" },
                    { value: "PE", label: "PE" },
                    { value: "PI", label: "PI" },
                    { value: "RJ", label: "RJ" },
                    { value: "RN", label: "RN" },
                    { value: "RO", label: "RO" },
                    { value: "RR", label: "RR" },
                    { value: "SC", label: "SC" },
                    { value: "SP", label: "SP" },
                    { value: "SE", label: "SE" },
                    { value: "TO", label: "TO" },
                  ]}
                />


              </div>
              <InputField
                id="municipioOrigemFamilia"
                label="Município ou origem da família:"
                type="text"
                placeholder="ex: Limoeiro do Norte"
                value={formData.municipioOrigemFamilia}
                onChange={handleInputChange}
              />

              <SelectField
                id="condicaoMoradiaAtual"
                label="Condição de moradia atual:"
                value={formData.condicaoMoradiaAtual}
                onChange={handleInputChange}
                error={errors.condicaoMoradiaAtual}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecione uma opção" },
                  { value: "morando_com_familia", label: "Mora com a família" },
                  { value: "morando_sozinho", label: "Morando sozinho(a)" },
                  { value: "divide_aluguel", label: "Divide aluguel" },
                  { value: "morando_com_amigos", label: "Morando com amigos" },
                  { value: "outros", label: "Outros..." },
                ]}
              />
            </div>
          </form>
        </div>

      </section>

    </main>
  );
}
