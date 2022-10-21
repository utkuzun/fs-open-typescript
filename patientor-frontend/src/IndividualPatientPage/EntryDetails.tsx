import { Entry, assertNever } from '../types';
import { useStateValue } from '../state';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealingIcon from '@mui/icons-material/Healing';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [state] = useStateValue();
  let icon;
  let organization;
  let healthCheckRating;
  const colors = ['green', 'yellow', 'red', 'black'];

  if (!entry) {
    return null;
  }

  switch (entry.type) {
    case 'HealthCheck':
      icon = <MedicalServicesIcon />;
      healthCheckRating = entry.healthCheckRating;
      break;
    case 'OccupationalHealthcare':
      icon = <WorkIcon />;
      organization = entry.employerName;
      break;
    case 'Hospital':
      icon = <HealingIcon />;
      break;
    default:
      try {
        assertNever(entry);
      } catch (error) {
        console.log(error);
      }
      break;
  }

  const containerStyle = {
    border: 'solid 2px black',
    margin: '0.5rem 0',
    padding: '0.2rem 0.5rem',
    borderRadius: '0.5rem',
  };

  return (
    <div key={entry.id} style={containerStyle}>
      <p>
        {entry.date} {icon} {organization}
      </p>
      <p style={{ fontStyle: 'italic' }}>{entry.description}</p>
      {healthCheckRating !== undefined && (
        <FavoriteIcon style={{ color: colors[healthCheckRating] }} />
      )}
      <p>diagnosed by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {state.diagnoses[code].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryDetails;
