import type { NextPage } from 'next';
import LoginForm from '@/components/LoginForm'

const Home: NextPage = () => {
  return (
    <>
      <main className="main-container">
        <h1>Bem-vindo ao Meu Projeto</h1>
        <p>Por favor, faça o login para continuar.</p>
        <LoginForm />
      </main>
    </>
  );
}

export default Home;