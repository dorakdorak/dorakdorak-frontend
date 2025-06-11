export interface SignupFormData {
  email: string;
  selectedDomain: string;
  emailDomain: string;
  gender: 'M' | 'F';
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  password: string;
  passwordConfirm: string;
  university: string;
  universityId: number | null;
  postcode: string;
  address: string;
  roadAddress: string;
  jibunAddress: string;
  detailAddress: string;
}

export interface University {
  id: number;
  name: string;
}

export interface Allergy {
  id: number;
  name: string;
}

export interface PasswordValidation {
  isValid: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasMinLength: boolean;
  message: string;
}

export interface PasswordConfirmValidation {
  isValid: boolean;
  message: string;
}

export interface ServerErrors {
  email?: string;
  name?: string;
  birthdate?: string;
  gender?: string;
  password?: string;
  university?: string;
  universityId?: string;
  address?: string;
  detailAddress?: string;
  zipCode?: string;
  doromyungAddress?: string;
  allergies?: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  universityId: number;
  gender: 'M' | 'F';
  birthdate: string;
  zipCode: string;
  doromyungAddress: string;
  jibunAddress: string;
  detailAddress: string;
  allergyIds: number[];
}
