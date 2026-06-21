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
    errors,
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
              {formData.membros.map((membro, index) => (
                <div key={membro.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                  </div>

                  {/* Nome Completo */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex? Maria Eduarda Alves Souza"
                      value={membro.nomeCompleto}
                      onChange={(e) => updateMembro(membro.id, 'nomeCompleto', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Data de Nascimento */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Data de nascimento
                    </label>
                    <input
                      type="text"
                      placeholder="DD/MM/AAAA"
                      maxLength={10}
                      value={membro.dataNascimento}
                      onChange={(e) => updateMembro(membro.id, 'dataNascimento', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Situação Ocupacional */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Situação ocupacional
                    </label>
                    <select
                      value={membro.situacaoOcupacional}
                      onChange={(e) => updateMembro(membro.id, 'situacaoOcupacional', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecionar uma opção</option>
                      <option value="empregado">Empregado(a)</option>
                      <option value="desempregado">Desempregado(a)</option>
                      <option value="autonomo">Autônomo(a)</option>
                      <option value="aposentado">Aposentado(a)</option>
                      <option value="estudante">Estudante</option>
                      <option value="do lar">Do Lar</option>
                      <option value="informal">Informal</option>
                    </select>
                  </div>

                  {/* Renda Individual e Contribui para Renda Familiar */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">
                        Renda individual mensal (R$)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex. 1200.00"
                        value={membro.rendaMensal}
                        onChange={(e) => updateMembro(membro.id, 'rendaMensal', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">
                        Contribui para a renda familiar?
                      </label>
                      <select
                        value={membro.contribuiRenda}
                        onChange={(e) => updateMembro(membro.id, 'contribuiRenda', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecionar uma opção</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                      </select>
                    </div>
                  </div>

                  {/* Botão Remover */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => removeMembro(membro.id)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors font-semibold text-sm"
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
