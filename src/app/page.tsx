import LoginForm from '../components/LoginForm';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Bem-vindo ao ÁlissonPixFácil</h1>
      <p className={styles.subtitle}>Por favor, faça o login para continuar.</p>      
      <LoginForm />
    </main>
  );
}

export default Home;