import express from 'express';

import patientService from '../services/patientService';
import { Patient } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Patient[] = patientService.getAll();
  res.send(patients);
});

router.post('/', (req, res) => {
  const patientAdded: Patient = patientService.create(req.body);
  return res.json({ patientAdded });
});

export default router;
