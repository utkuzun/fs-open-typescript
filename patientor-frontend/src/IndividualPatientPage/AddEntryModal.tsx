import AddEntryForm from './AddEntryForm';
import { EntryWithoutId } from '../types';
import { Dialog, DialogTitle, Divider, DialogContent } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Dialog fullWidth open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity='error'>{`Error: ${error}`}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
