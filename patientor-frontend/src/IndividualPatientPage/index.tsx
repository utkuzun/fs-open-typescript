import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { Button, Typography } from '@material-ui/core';
import { Gender } from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useStateValue } from '../state';
import EntryDetails from './EntryDetails';
import { EntryWithoutId } from '../types';
import { updatePatient, setCurrentPatient } from '../state';

import AddEntryModal from './AddEntryModal';

const IndividualPatientPage = () => {
  const [state, dispatch] = useStateValue();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  if (!id) {
    return null;
  }

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(patient));
      dispatch(setCurrentPatient(patient));
      console.log('submitted');

      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const fetchPatient = async () => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setCurrentPatient(patient));
    } catch (error) {
      console.log(error);
    }
  };

  const initialStateSetting = async () => {
    setLoading(true);
    void (await fetchPatient());

    setLoading(false);
  };

  useEffect(() => {
    if (!state?.currentPatient || state.currentPatient.id !== id) {
      void initialStateSetting();
    }
  }, []);

  if (loading) {
    return <h1 style={{ background: 'red' }}>Loading..</h1>;
  }

  if (!state.currentPatient || state.currentPatient.id !== id) {
    return null;
  }

  const parseGender = () => {
    switch (state.currentPatient?.gender) {
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Male:
        return <MaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <div className='App'>
      <Typography variant='h4'>
        {state.currentPatient.name} {parseGender()}
      </Typography>
      <p>ssh: {state.currentPatient.ssn}</p>
      <p>Occupation: {state.currentPatient.occupation}</p>
      <Typography variant='h4'>entries</Typography>
      {state.currentPatient.entries &&
        state.currentPatient.entries?.map((entry) => {
          return <EntryDetails key={entry.id} entry={entry} />;
        })}
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button variant='contained' onClick={openModal}>
        Add New Entry
      </Button>
    </div>
  );
};

export default IndividualPatientPage;
