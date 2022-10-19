import { Entry, EntryWithoutId, Gender, PatientEntry } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is EntryWithoutId => {
  return (
    isString(param.type) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param.type)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseEntries = (entry: any): EntryWithoutId => {
  if (!entry || !entry?.type || !isEntry(entry)) {
    throw new Error('Incorrect or missing entry');
  }
  return entry;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  gender: unknown;
  ssn: unknown;
  entries?: Entry[];
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  occupation,
  gender,
  ssn,
  entries,
}: Fields): PatientEntry => {
  const newEntry: PatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseName(occupation),
    ssn: parseName(ssn),
    entries:
      entries &&
      entries.map((item) => {
        return { ...parseEntries(item), id: item.id };
      }),
  };

  return newEntry;
};

export default toNewPatientEntry;
