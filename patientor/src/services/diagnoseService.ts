import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';

const getAll = (): Diagnose[] => {
  return diagnoseEntries;
};

export default { getAll };
