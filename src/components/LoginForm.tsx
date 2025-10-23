"use client";

import { useState, type FC, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios, { isAxiosError } from 'axios';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import RegisterPage from '@/pages/register.page';
import styles from './Form.module.css';
const LoginForm: FC = () => {
    const [cpfCnpj, setCpfCnpj] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        const apiUrl = 'http://localhost:7501/api/auth/login';

        try {
            const response = await axios.post<{ token: string }>(apiUrl, {
                cpf_cnpj: cpfCnpj,
                senha: senha,
            });
            const { token } = response.data;
            login(token);
            console.log('Login realizado com sucesso!');
            router.push('/dashboard');

        } catch (err) {
             if (isAxiosError(err)) {
                setError(err.response?.data?.error || 'Credenciais inválidas.');
            } else {
                setError('Erro de conexão.');
            }
        }
    };


    return (
            <div className={styles.formContainer}>
            <h2 className={styles.title}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="cpf_cnpj">CPF ou CNPJ</label>
                    <input className={styles.input} type="text" id="cpf_cnpj" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="senha">Senha</label>
                    <input className={styles.input} type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                
                {error && <p className={styles.errorMessage}>{error}</p>}

                <button className={styles.button} type="submit">Entrar</button>
            </form>
            <div className={styles.linkContainer}>
                <Link href="register.page">Não tem uma conta? Cadastre-se</Link>
            </div>
        </div>
    );
};

export default LoginForm;