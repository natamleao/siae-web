import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { InputField } from "../Input";
import { SelectField } from "../SelectField";
import { useIdentificacaoPessoalForm } from "../../hooks/useIdentificacaoPessoalForm";

interface IdentificacaoPessoalProps {
  onValidityChange?: (isValid: boolean) => void;
  onAdvance?: () => void;
  isLastStep?: boolean;
  onSidebarActionsChange?: (actions: { onCancel: () => void; onSaveDraft: () => void }) => void;
}

export function IdentificacaoPessoal({ onValidityChange, onAdvance, isLastStep = false, onSidebarActionsChange }: IdentificacaoPessoalProps) {
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
  } = useIdentificacaoPessoalForm({ isLastStep, onAdvance });

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
          {/* <div className="mb-4">
            <h1 className="font-semibold text-4xl mb-2 text-center">Identificação Pessoal</h1>
            <div className="border-t-2 border-black/50 mt-1"></div>
          </div> */}

          <form id="identificacao-pessoal-form" onSubmit={handleSubmit} className="space-y-2">
            {/* Seção: Dados Pessoais */}
            <div className="space-y-2 [&_label]:!text-[16px] [&_label]:!font-semibold [&_label]:!text-black">
              {/* Nome Completo */}
              <InputField
                id="nomeCompleto"
                label="Escreva o seu nome completo"
                type="text"
                placeholder="ex. Maria Eduarda Alves Sousa"
                hint="Nome sem abreviações. Sem números ou símbolos."
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                error={errors.nomeCompleto}
                forceShowError={submitAttempted}

              />

              {/* CPF */}
              <InputField
                id="cpf"
                label="Digite o seu CPF"
                type="text"
                placeholder="ex. 123.456.789-10"
                hint="11 dígitos numéricos."
                value={formData.cpf}
                onChange={handleInputChange}
                maxLength={14}
                error={errors.cpf}
                forceShowError={submitAttempted}
                valid={valids.cpf}
              />

              {/* RG */}
              <InputField
                id="rg"
                label="RG"
                type="text"
                placeholder="ex. 5842144322-9"
                hint="Letras e números, hífen opcional."
                value={formData.rg}
                onChange={handleInputChange}
                error={errors.rg}
                forceShowError={submitAttempted}
                valid={valids.rg}
              />

              {/* Data de Nascimento */}
              <InputField
                id="dataNascimento"
                label="Qual é sua data de nascimento?"
                type="text"
                placeholder="ex. 15/08/2003"
                hint="DD/MM/AAAA"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                maxLength={10}
                error={errors.dataNascimento}
                forceShowError={submitAttempted}
                valid={valids.dataNascimento}

              />

              {/* Responsável */}
              <SelectField
                id="responsavel"
                label="Quem é seu responsável?"
                value={formData.responsavel}
                onChange={handleInputChange}
                error={errors.responsavel}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecionar uma opção" },
                  { value: "Mãe", label: "Mãe" },
                  { value: "Pai", label: "Pai" },
                  { value: "Outro", label: "Outra Pessoa" }
                ]}
              />

              {/* Nome do Responsável */}
              <InputField
                id="nomeResponsavel"
                label="Qual é o nome do seu responsável?"
                type="text"
                placeholder="ex. Ana Paula Pereira Souza"
                hint="Apenas letras e espaços."
                value={formData.nomeResponsavel}
                onChange={handleInputChange}
                error={errors.nomeResponsavel}
                forceShowError={submitAttempted}
              />

              <div className="grid gap-4 md:grid-cols-2">
                {/* Sexo */}
                <SelectField
                  id="sexo"
                  label="Qual é o seu sexo?"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  error={errors.sexo}
                  forceShowError={submitAttempted}
                  options={[
                    { value: "", label: "Selecionar uma opção" },
                    { value: "feminino", label: "Feminino" },
                    { value: "masculino", label: "Masculino" },
                    { value: "outro", label: "Não Declarar" }
                  ]}
                />

                {/* Identidade de Gênero */}
                <SelectField
                  id="identidadeGenero"
                  label="Qual é a sua identidade de gênero?"
                  value={formData.identidadeGenero}
                  onChange={handleInputChange}
                  error={errors.identidadeGenero}
                  forceShowError={submitAttempted}
                  options={[
                    { value: "", label: "Selecionar uma opção" },
                    { value: "mulher cisgênero", label: "Mulher Cisgênera" },
                    { value: "homem cisgênero", label: "Homem Cisgênero" },
                    { value: "mulher transexual", label: "Mulher Transexual" },
                    { value: "homem transexual", label: "Homem Transexual" },
                    { value: "não-binário", label: "Não-binário" },
                    { value: "não declarar", label: "Não Declarar" },
                    { value: "outro", label: "Outra..." }
                  ]}
                />
              </div>

              {/* Orientação Sexual */}
              <SelectField
                id="orientacaoSexual"
                label="Qual é a sua orientação sexual?"
                value={formData.orientacaoSexual}
                onChange={handleInputChange}
                error={errors.orientacaoSexual}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecionar uma opção" },
                  { value: "heterossexual", label: "Heterossexual (atração por pessoas do sexo oposto)" },
                  { value: "homossexual", label: "Homossexual (atração por pessoas do mesmo sexo)" },
                  { value: "bissexual", label: "Bissexual (atração por mais de um gênero)" },
                  { value: "panssexual", label: "Panssexual (atração independente de gênero)" },
                  { value: "assexual", label: "Assexual (pouca ou nenhuma atração sexual)" },
                  { value: "nao informar", label: "Prefiro não informar" },
                  { value: "outro", label: "Outra..." }
                ]}
              />

              <div className="grid gap-4 md:grid-cols-2">
                {/* Etnia/Raça/Cor */}
                <SelectField
                  id="etniaRacaCor"
                  label="Qual é a sua Etnia/Raça/Cor?"
                  value={formData.etniaRacaCor}
                  onChange={handleInputChange}
                  error={errors.etniaRacaCor}
                  forceShowError={submitAttempted}
                  options={[
                    { value: "", label: "Selecionar uma opção" },
                    { value: "amarela", label: "Amarela" },
                    { value: "branca", label: "Branca" },
                    { value: "indígena", label: "Indígena" },
                    { value: "parda", label: "Parda" },
                    { value: "preta quilombola", label: "Preta - quilombola" },
                    { value: "preta nao-quilombola", label: "Preta - não quilombola" },
                    { value: "não declarar", label: "Não declarar" }
                  ]}
                />

                {/* Estado Civil */}
                <SelectField
                  id="estadoCivil"
                  label="Qual é seu estado civil?"
                  value={formData.estadoCivil}
                  onChange={handleInputChange}
                  error={errors.estadoCivil}
                  forceShowError={submitAttempted}
                  options={[
                    { value: "", label: "Selecionar uma opção" },
                    { value: "solteiro", label: "Solteiro(a)" },
                    { value: "casado", label: "Casado(a)" },
                    { value: "uniao estavel", label: "União Estável" },
                    { value: "separado", label: "Separado(a)" },
                    { value: "divorciado", label: "Divorciado(a)" },
                    { value: "viúvo", label: "Viúvo(a)" }
                  ]}
                />
              </div>

              {/* Deficiência */}
              <SelectField
                id="temDeficiencia"
                label="Você possui alguma deficiência? Verifique a lista abaixo."
                value={formData.temDeficiencia}
                onChange={handleInputChange}
                error={errors.temDeficiencia}
                forceShowError={submitAttempted}
                options={[
                  { value: "", label: "Selecionar uma opção" },
                  { value: "superdotacao", label: "Altas Habilidades/Superdotação" },
                  { value: "baixa visao", label: "Baixa visão" },
                  { value: "cegueira", label: "Cegueira" },
                  { value: "auditiva", label: "Auditiva" },
                  { value: "intelectual", label: "Intelectual" },
                  { value: "multpla", label: "Múltipla" },
                  { value: "sindrome de asperger", label: "Síndrome de Asperger" },
                  { value: "tea", label: "TEA" },
                  { value: "tgd", label: "Transtorno Global do Desenvolvimento" },
                  { value: "nao possui", label: "Não Possui" }
                ]}
              />
            </div>

            {/* Seção: Informações de Contato */}
            <div className="space-y-4">
              <h2 className="font-semibold text-[24px] text-[#000000]">Suas Informações de Contato</h2>

              <div className="space-y-2 [&_label]:!text-[16px] [&_label]:!font-semibold [&_label]:!text-black">
                <InputField
                  id="telefonePrincipal"
                  label="Digite seu telefone principal:"
                  type="text"
                  placeholder="ex. 88 99876-1234"
                  hint="DDD + número (somente números)."
                  value={formData.telefonePrincipal}
                  onChange={handleInputChange}
                  maxLength={13}
                  error={errors.telefonePrincipal}
                  forceShowError={submitAttempted}
                  valid={valids.telefonePrincipal}

                />

                <InputField
                  id="emailInstitucional"
                  label="Digite seu e-mail institucional:"
                  type="email"
                  placeholder="ex. aluno@alu.ufc.br"
                  hint="Deve conter @ e domínio."
                  value={formData.emailInstitucional}
                  onChange={handleInputChange}
                  error={errors.emailInstitucional}
                  forceShowError={submitAttempted}
                  valid={valids.emailInstitucional}

                />
              </div>
            </div>
          </form>
        </div>

      </section>

    </main>
  );
}
