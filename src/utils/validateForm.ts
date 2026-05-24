export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, "");
  return cleanCPF.length === 11 && /^\d{11}$/.test(cleanCPF);
}

export function formatCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, "").slice(0, 11);
  const parts: string[] = [];

  if (digits.length > 0) parts.push(digits.slice(0, 3));
  if (digits.length > 3) parts.push(digits.slice(3, 6));
  if (digits.length > 6) parts.push(digits.slice(6, 9));

  let formatted = parts.join(".");
  if (digits.length > 9) {
    formatted += `-${digits.slice(9, 11)}`;
  }

  return formatted;
}

export function validateRG(rg: string): boolean {
  const clean = rg.replace(/\s+/g, "");
  return clean.length >= 5; // basic check, adjust if you need stricter rules
}

export function validateDate(date: string): boolean {
  // Expect DD/MM/YYYY
  const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);
  const d = new Date(year, month, day);
  return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
}

export function formatDate(date: string): string {
  const digits = date.replace(/\D/g, "").slice(0, 8);
  const parts: string[] = [];

  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));

  let formatted = parts.join("/");
  if (digits.length > 4) {
    formatted += `/${digits.slice(4, 8)}`;
  }

  return formatted;
}

export function formatPhone(phone: string): string {
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
}

export function validatePhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, "");
  return clean.length >= 10 && clean.length <= 11; // DDD + number
}

export function validateForm(formData: any, setErrors: (errors: Record<string, string>) => void): boolean {
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
}

