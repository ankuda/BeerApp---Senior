import { useNavigate } from 'react-router-dom';

import { Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from './GoBackBtn.module.css';

const GoBackBtn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Link component="button" onClick={() => navigate(-1)} className={styles.goBackBtn}>
      <ArrowBackIcon style={{ fontSize: '1rem' }} />
      go back
    </Link>
  )
};

export default GoBackBtn;
