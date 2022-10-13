import patientEntries from '../../data/patients';
import { Patient } from '../types';

const getAll = (): Patient[] => {
  return patientEntries;
};

export default { getAll };
