import { Link } from 'react-router-dom';
import styles from '@/css/login/login.module.css';

function SignupLink(): React.ReactElement {
  return (
    <div className={styles.signupLink}>
      <span>아직 회원이 아니신가요? </span>
      <Link to="/signup" className={styles.linkText}>
        회원가입
      </Link>
    </div>
  );
}

export default SignupLink;
