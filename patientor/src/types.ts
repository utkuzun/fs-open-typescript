export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

type Gender = 'male' | 'female' | "don't want to say";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type PatientPublic = Omit<Patient, 'ssn'>;
export type PatientEntry = Omit<Patient, 'id'>;
