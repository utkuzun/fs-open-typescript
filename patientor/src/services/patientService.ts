import { v1 as uuid } from 'uuid';

import patientEntries from '../../data/patients';
import { PatientPublic, PatientEntry, Patient } from '../types';

let patients: Patient[] = patientEntries;

const getAll = (): PatientPublic[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const getOne = (id: string): PatientPublic => {
  const patient: PatientPublic | undefined = patients.find(
    (item) => item.id === id
  );
  if (!patient) {
    throw new Error(`Patient ${id} not found!!`);
  }

  return patient;
};

const create = (entry: PatientEntry): Omit<Patient, 'ssn'> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id: string = uuid();
  const patient: Patient = { ...entry, id };
  patients = patients.concat(patient);
  return patient;
};

export default { getAll, create, getOne };
