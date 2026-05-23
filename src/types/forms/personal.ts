export const GuardianType = {
  FATHER: 'Pai',
  MOTHER: 'Mãe',
  OTHER: 'Outra pessoa',
} as const

export type GuardianType = (typeof GuardianType)[keyof typeof GuardianType]

export const Gender = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
  NOT_INFORMED: 'Não Informado',
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]

export const GenderIdentity = {
  CISGENDER_WOMAN: 'Mulher Cisgênera',
  CISGENDER_MAN: 'Homem Cisgênero',
  TRANSGENDER_WOMAN: 'Mulher Transexual',
  TRANSGENDER_MAN: 'Homem Transexual',
  NON_BINARY: 'Não Binário',
  OTHER: 'Outro',
  PREFER_NOT_SAY: 'Não declarar',
} as const

export type GenderIdentity = (typeof GenderIdentity)[keyof typeof GenderIdentity]

export const SexualOrientation = {
  HETEROSEXUAL: 'Heterossexual',
  HOMOSEXUAL: 'Homossexual',
  BISEXUAL: 'Bissexual',
  ASEXUAL: 'Assexual',
  OTHER: 'Outro',
  PREFER_NOT_SAY: 'Não declarar',
} as const

export type SexualOrientation = (typeof SexualOrientation)[keyof typeof SexualOrientation]

export const Ethnicity = {
  ASIAN: 'Amarelo',
  WHITE: 'Branco',
  INDIGENOUS: 'Indígena',
  BROWN: 'Pardo',
  BLACK_QUILOMBOLA: 'Preto - Quilombola',
  BLACK_NOT_QUILOMBOLA: 'Preto - Não Quilombola',
  PREFER_NOT_SAY: 'Não declarar',
} as const

export type Ethnicity = (typeof Ethnicity)[keyof typeof Ethnicity]

export const MaritalStatus = {
  SINGLE: 'Solteiro(a)',
  MARRIED: 'Casado(a)',
  STABLE_UNION: 'União Estável',
  SEPARATED: 'Separado(a)',
  DIVORCED: 'Divorciado(a)',
  WIDOWED: 'Viúvo(a)',
} as const

export type MaritalStatus = (typeof MaritalStatus)[keyof typeof MaritalStatus]

export const Disability = {
  NONE: 'Não possui',
  GIFTEDNESS: 'Altas habilidades/Superdotação',
  LOW_VISION: 'Baixa Visão',
  HEARING: 'Auditiva',
  INTELLECTUAL: 'Intelectual',
  MULTIPLE: 'Múltipla',
  SENSORY: 'Sensorial',
  ASPERGER_SYNDROME: 'Síndrome de Asperger',
  AUTISM_SPECTRUM_DISORDER: 'TEA',
  GLOBAL_DEVELOPMENTAL_DISORDER: 'Transtorno global do desenvolvimento',
  OTHER: 'Outra',
} as const

export type Disability = (typeof Disability)[keyof typeof Disability]

export interface PersonalData {
  readonly name: string;
  readonly cpf: string;
  readonly rg: string;
  readonly birthday: string;
  readonly guardianType: GuardianType;
  readonly guardianName: string;
  readonly gender: Gender;
  readonly genderIdentity: GenderIdentity;
  readonly sexualOrientation: SexualOrientation;
  readonly ethnicity: Ethnicity;
  readonly maritalStatus: MaritalStatus;
  readonly disability: Disability;
  readonly phone: string;
  readonly email: string;
}