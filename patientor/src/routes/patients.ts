import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';

import { Patient } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Patient[] = patientService.getAll();
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewPatientEntry(req.body);
    const patientAdded = patientService.create(newEntry);
    return res.json(patientAdded);
  } catch (error) {
    let message = 'Error occured';
    if (error instanceof Error) {
      message = message + error.message;
    }
    return res.status(500).json({ message });
  }
});

export default router;
