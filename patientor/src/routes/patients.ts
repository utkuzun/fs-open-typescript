import express from 'express';

import patientService from '../services/patientService';
import { Patient } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Patient[] = patientService.getAll();
  res.send(patients);
});

export default router;
