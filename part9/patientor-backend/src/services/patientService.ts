import { NewPatientEntry } from './../types';
//import patientData from '../resources/diagnoses.json'
import patientData from '../../data/patients'
import { PatientEntry, NonSensitivePatientEntry } from '../types';
const { v4: uuidv4 } = require('uuid');


//const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
}

const addEntry = () => {
  return null;
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  }

  return newPatientEntry;
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
  addPatient
};