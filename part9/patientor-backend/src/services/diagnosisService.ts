import diagnosisData from '../resources/diagnoses.json'

import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosisData as Array<DiagnosisEntry>;

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoses;
}

const addEntry = () => {
  return null;
}

export default {
  getEntries,
  addEntry
};