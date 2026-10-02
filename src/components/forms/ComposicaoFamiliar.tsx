import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { InputField } from "../Input";
import { SelectField } from "../SelectField";
import { useComposicaoFamiliarForm } from "../../hooks/forms/useComposicaoFamiliarForm";

interface ComposicaoFamiliarProps {
  onValidityChange?: (isValid: boolean) => void;
  onAdvance?: () => void;
  isLastStep?: boolean;
  onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function ComposicaoFamiliar({
  onValidityChange,
  onAdvance,
  isLastStep = false,
  onSidebarActionsChange
}: ComposicaoFamiliarProps) {
  const {
    formData,
    submitAttempted,
    isStepValid,
    addMembro,
    removeMembro,
    updateMembro,
    handleSaveDraft,
    handleCancel,
    handleSubmit,
  } = useComposicaoFamiliarForm({ isLastStep, onAdvance });

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
          <form id="composicao-familiar-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Descrição */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                Preencha a seguir as informações dos membros da sua família que moram na mesma casa que você e que dividem as despesas com você. Inclua você mesmo e todas as pessoas que dependem da mesma renda familiar.
              </p>
            </div>

            {/* Lista de Membros */}
            <div className="space-y-4">
              {formData.membros.map((membro) => (
                <div key={membro.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                  </div>

                  {/* Nome Completo */}
                  <InputField
                    id={`nomeCompleto-${membro.id}`}
                    label="Nome completo"
                    type="text"
                    placeholder="Ex? Maria Eduarda Alves Souza"
                    value={membro.nomeCompleto}
                    onChange={(e) => updateMembro(membro.id, 'nomeCompleto', e.target.value)}
                  />

                  {/* Data de Nascimento */}
                  <InputField
                    id={`dataNascimento-${membro.id}`}
                    label="Data de nascimento"
                    type="text"
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                    value={membro.dataNascimento}
                    onChange={(e) => updateMembro(membro.id, 'dataNascimento', e.target.value)}
                  />

                  {/* Situação Ocupacional */}
                  <SelectField
                    id={`situacaoOcupacional-${membro.id}`}
                    label="Situação ocupacional"
                    value={membro.situacaoOcupacional}
                    onChange={(e) => updateMembro(membro.id, 'situacaoOcupacional', e.target.value)}
                    options={[
                      { value: "", label: "Selecionar uma opção" },
                      { value: "proprietario", label: "Proprietário(a) ou sócio(a) de empresa" },
                      { value: "mei", label: "Microempreendedores individuais(MEI) ou Profissionais liberais" },
                      { value: "assalariado", label: "Trabalhador(a) assalariado(a)" },
                      { value: "aposentado", label: "Trabalhador(a) Aposentado(a) ou Pensionista ou Beneficiários(as) do Benefício de Prestação Continuada (BPC) ou de outros benefícios previdenciários" },
                      { value: "informal", label: "Trabalhador(a) Informal ou Autônomo(a)" },
                      { value: "pensao", label: "Pessoa que recebe pensão alimentícia/ajuda financeira (renda por terceiros) ou possui rendimento de aluguéis" },
                      { value: "rural", label: "Trabalhador(a) em atividade rural" },
                      { value: "bolsista", label: "Bolsista ou Estagiário(a)" },
                      { value: "desempregado", label: "Trabalhador(a) desempregado(a)/Recebendo Seguro Desemprego" },
                    ]}
                  />

                  {/* Renda Individual e Contribui para Renda Familiar */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                      id={`rendaMensal-${membro.id}`}
                      label="Renda individual mensal (R$)"
                      type="text"
                      placeholder="Ex. 1200.00"
                      value={membro.rendaMensal}
                      onChange={(e) => updateMembro(membro.id, 'rendaMensal', e.target.value)}
                    />

                    <SelectField
                      id={`contribuiRenda-${membro.id}`}
                      label="Contribui para a renda familiar?"
                      value={membro.contribuiRenda}
                      onChange={(e) => updateMembro(membro.id, 'contribuiRenda', e.target.value)}
                      options={[
                        { value: "", label: "Selecionar uma opção" },
                        { value: "sim", label: "Sim" },
                        { value: "nao", label: "Não" },
                      ]}
                    />
                  </div>

                  {/* Botão Remover */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => removeMembro(membro.id)}
                      disabled={formData.membros.length === 1}
                      className={`px-4 py-2 text-white rounded-md transition-colors font-semibold text-sm ${
                        formData.membros.length > 1
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão Adicionar Membro */}
            <button
              type="button"
              onClick={addMembro}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              + Adicionar membro da família
            </button>

            {submitAttempted && !isStepValid && formData.membros.length === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700">
                  Por favor, adicione pelo menos um membro da família.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
