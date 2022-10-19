import { v1 as uuid } from 'uuid';

import patientEntries from '../../data/patients';
import { PatientPublic, PatientEntry, Patient, EntryWithoutId } from '../types';

let patients: Patient[] = patientEntries;

const getAll = (): PatientPublic[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
      };
    }
  );
};

const getOne = (id: string): Patient => {
  const patient: Patient | undefined = patients.find((item) => item.id === id);

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

const addEntry = (id: string, entry: EntryWithoutId): Patient => {
  const patient: Patient | undefined = patients.find((item) => item.id === id);
  if (!patient) {
    throw new Error(`Patient ${id} not found!!`);
  }
  const entryId = uuid();
  patient.entries = patient.entries?.concat({ ...entry, id: entryId });

  patients = patients.map((item) => (item.id === id ? patient : item));

  return patient;
};

export default { getAll, create, getOne, addEntry };
