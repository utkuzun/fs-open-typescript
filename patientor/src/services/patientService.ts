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

const create = (entry: PatientEntry): Omit<Patient, 'ssn'> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id: string = uuid();
  const patient: Patient = { ...entry, id };
  patients = patients.concat(patient);
  return patient;
};

export default { getAll, create };
