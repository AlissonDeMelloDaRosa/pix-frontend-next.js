import RegistrationForm from '../../components/RegistrationForm';
import styles from '../Home.module.css';

const RegisterPage = () => {
    return (
        <main className={styles.mainContainer}>
            {/* O RegistrationForm vai diretamente dentro do main */}
            <RegistrationForm />
        </main>
    );
};

export default RegisterPage;