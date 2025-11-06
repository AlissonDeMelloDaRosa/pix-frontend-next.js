"use client";

import { useState, type FC, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios, { isAxiosError } from 'axios';
import Link from 'next/link';
import styles from './Form.module.css';

const RegistrationForm: FC = () => {
    const [nome, setNome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [numeroConta, setNumeroConta] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const apiUrl = 'http://localhost:7500/v1/usuarios';

        try {
            await axios.post(apiUrl, {
                nome,
                cpf_cnpj: cpfCnpj,
                numero_conta: numeroConta,
                senha
            });

            setSuccess('Cadastro realizado com sucesso! Redirecionando...');
            setTimeout(() => router.push('/'), 2000);

        } catch (err) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.error || 'Não foi possível realizar o cadastro.');
            } else {
                setError('Erro de conexão. Tente novamente.');
            }
        }
    };

    return (
            <div className={styles.formContainer}>
            <h2 className={styles.title}>Criar conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="nome">Nome Completo</label>
                        <input className={styles.input} type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="cpf_cnpj">CPF ou CNPJ</label>
                        <input className={styles.input} type="text" id="cpf_cnpj" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="numero_conta">Número da Conta</label>
                        <input className={styles.input} type="text" id="numero_conta" value={numeroConta} onChange={(e) => setNumeroConta(e.target.value)} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="senha">Senha</label>
                        <input className={styles.input} type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {success && <p className={styles.errorMessage}>{success}</p>}

                    <button className={styles.button} type="submit">Cadastrar</button>
                </form>
                <div className={styles.linkContainer}>
                    <Link href="/">Já tem uma conta? Faça login</Link>
                </div>
            </div>    );
};

export default RegistrationForm;