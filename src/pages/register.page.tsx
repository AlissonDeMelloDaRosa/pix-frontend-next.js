import RegistrationForm from '../components/RegistrationForm';
import styles from '../app/Home.module.css';
import inter from 'layout.module.css';

const RegisterPage = () => {
    return (
        <main className={styles.mainContainer}>
            <body className={inter.className}>
            <RegistrationForm />
            </body>
            {}
        </main>
    );
};

export default RegisterPage;