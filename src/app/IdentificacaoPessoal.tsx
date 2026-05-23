import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InputField } from "../components/Input";

type SelectOption = {
  value: string;
  label: string;
};

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  forceShowError?: boolean;
  hint?: string;
}

function SelectField({ id, label, value, onChange, options, error, forceShowError = false, hint }: SelectFieldProps) {
  const showError = Boolean(error) && forceShowError;
  const showBorderError = forceShowError && !value;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`rounded-md border px-3 py-2 text-[16px] focus:outline-none focus:ring-1 ${
          showBorderError
            ? "border-red-500 text-[#636363] focus:border-red-500 focus:ring-red-500"
            : value
              ? "border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              : "border-gray-300 text-[#636363] focus:border-blue-500 focus:ring-blue-500"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p id={`${id}-hint`} className="text-xs text-gray-500 mt-1">{hint}</p>}
      {showError && <p id={`${id}-error`} className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface FormData {
  nomeCompleto: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  responsavel: string;
  temDeficiencia: string;
  nomeResponsavel: string;
  sexo: string;
  identidadeGenero: string;
  orientacaoSexual: string;
  etniaRacaCor: string;
  estadoCivil: string;
  deficiencias: string[];
  telefonePrincipal: string;
  emailInstitucional: string;
}

export function IdentificacaoPessoal() {
  const [formData, setFormData] = useState<FormData>({
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
  });

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

  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, "");
    return cleanCPF.length === 11 && /^\d{11}$/.test(cleanCPF);
  };

  const formatCPF = (cpf: string): string => {
    const digits = cpf.replace(/\D/g, "").slice(0, 11);
    const parts = [];

    if (digits.length > 0) parts.push(digits.slice(0, 3));
    if (digits.length > 3) parts.push(digits.slice(3, 6));
    if (digits.length > 6) parts.push(digits.slice(6, 9));

    let formatted = parts.join(".");
    if (digits.length > 9) {
      formatted += `-${digits.slice(9, 11)}`;
    }

    return formatted;
  };

  const validateRG = (rg: string): boolean => {
    const clean = rg.replace(/\s+/g, "");
    return clean.length >= 5; // basic check, adjust if you need stricter rules
  };

  const validateDate = (date: string): boolean => {
    // Expect DD/MM/YYYY
    const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return false;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);
    const d = new Date(year, month, day);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  };

  const formatDate = (date: string): string => {
    const digits = date.replace(/\D/g, "").slice(0, 8);
    const parts: string[] = [];

    if (digits.length > 0) parts.push(digits.slice(0, 2));
    if (digits.length > 2) parts.push(digits.slice(2, 4));

    let formatted = parts.join("/");
    if (digits.length > 4) {
      formatted += `/${digits.slice(4, 8)}`;
    }

    return formatted;
  };

  const formatPhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) {
      return digits;
    }

    const ddd = digits.slice(0, 2);
    const remaining = digits.slice(2);

    if (remaining.length <= 4) {
      return `${ddd} ${remaining}`;
    }

    if (remaining.length <= 8) {
      return `${ddd} ${remaining.slice(0, 4)}-${remaining.slice(4)}`;
    }

    return `${ddd} ${remaining.slice(0, 5)}-${remaining.slice(5, 9)}`;
  };

  const validatePhone = (phone: string): boolean => {
    const clean = phone.replace(/\D/g, "");
    return clean.length >= 10 && clean.length <= 11; // DDD + number
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const requiredMessage = "Campo obrigatório não preenchido.";

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = requiredMessage;
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = requiredMessage;
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = requiredMessage;
    }

    if (!formData.rg.trim()) {
      newErrors.rg = requiredMessage;
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = requiredMessage;
    }

    if (!formData.responsavel.trim()) {
      newErrors.responsavel = requiredMessage;
    }

    if (!formData.nomeResponsavel.trim()) {
      newErrors.nomeResponsavel = requiredMessage;
    }

    if (!formData.sexo.trim()) {
      newErrors.sexo = requiredMessage;
    }

    if (!formData.identidadeGenero.trim()) {
      newErrors.identidadeGenero = requiredMessage;
    }

    if (!formData.orientacaoSexual.trim()) {
      newErrors.orientacaoSexual = requiredMessage;
    }

    if (!formData.etniaRacaCor.trim()) {
      newErrors.etniaRacaCor = requiredMessage;
    }

    if (!formData.estadoCivil.trim()) {
      newErrors.estadoCivil = requiredMessage;
    }

    if (!formData.temDeficiencia.trim()) {
      newErrors.temDeficiencia = requiredMessage;
    }

    if (!formData.telefonePrincipal.trim()) {
      newErrors.telefonePrincipal = requiredMessage;
    }

    if (!formData.emailInstitucional.trim()) {
      newErrors.emailInstitucional = requiredMessage;
    } else if (!formData.emailInstitucional.endsWith("@alu.ufc.br")) {
      newErrors.emailInstitucional = requiredMessage;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }

    // update valid state for specific fields
    setValids(prev => {
      const next = { ...prev };
      if (id === 'cpf') next.cpf = validateCPF(value);
      if (id === 'rg') next.rg = validateRG(value);
      if (id === 'dataNascimento') next.dataNascimento = validateDate(value);
      if (id === 'telefonePrincipal') next.telefonePrincipal = validatePhone(value);
      if (id === 'emailInstitucional') next.emailInstitucional = value.endsWith('@alu.ufc.br');
      return next;
    });
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('identificacaoPessoalDraft', JSON.stringify(formData));
      toast.success('Rascunho salvo');
    } catch (e) {
      toast.error('Erro ao salvar rascunho');
    }
  };

  const handleCancel = () => {
    // confirmação simples antes de limpar
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Tem certeza que deseja cancelar o preenchimento?')) {
      localStorage.removeItem('identificacaoPessoalDraft');
      setFormData({
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
      });
      toast.info('Preenchimento cancelado');
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (!validateForm()) {
      toast.error("Não foi possível salvar os dados. Verifique os campos destacados.");
      return;
    }

    setLoading(true);

    try {
      console.log("Dados do formulário:", formData);
      toast.success("Identificação pessoal registrada com sucesso!");
      
      setTimeout(() => navigate("/dashboard"), 2000);
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

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <ToastContainer />
      <section className="bg-white grow flex w-full justify-center items-center py-12 px-4 relative">
        <aside className="absolute hidden md:block" style={{ left: '72px', top: '106px', width: '223.53px', height: '127.12px' }}>
          <div className="relative flex h-full flex-col rounded-md border border-gray-300 pt-5 p-3 bg-white shadow-sm text-gray-900">
            <h3 className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-gray-900">Outras opções</h3>
            <div className="mt-auto flex flex-1 flex-col justify-center gap-3 pt-1 -translate-y-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center rounded-md border-[0.84px] border-[#CE4650] bg-[#ECE8E8] p-0 leading-none text-[#000000] font-semibold mx-auto"
                style={{ width: '176.96px', height: '28.16px', fontSize: '11.57px' }}
              >
                Cancelar preenchimento
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center justify-center rounded-md border-[0.84px] border-[#1058CC] bg-[#ECE8E8] p-0 leading-none text-[#000000] font-semibold mx-auto"
                style={{ width: '176.96px', height: '28.16px', fontSize: '11.57px' }}
              >
                Salvar e continuar depois
              </button>
            </div>
          </div>
        </aside>
        <div className="text-black w-full max-w-2xl">
          <div className="mb-4">
            <h1 className="font-semibold text-4xl mb-2 text-center">Identificação Pessoal</h1>
            <div className="border-t-2 border-black/50 mt-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
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

            {/* Botões */}
            <div className="flex gap-4 justify-center mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-[220px] h-[35px] rounded-md border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={isDisabled}
                className={`w-[220px] h-[35px] rounded-md font-semibold transition-all duration-300 ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? "Processando..." : "Prosseguir"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
