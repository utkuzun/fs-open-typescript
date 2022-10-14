import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseEntries;

const getAll = (): Diagnose[] => {
  return diagnoses;
};

export default { getAll };
