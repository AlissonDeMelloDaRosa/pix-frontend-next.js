"use client";

import { useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import axios, { isAxiosError } from 'axios';
import Link from 'next/link';
import styles from './Form.module.css';

// --- 1. IMPORTS DO REACT-HOOK-FORM E DO NOSSO NOVO SCHEMA ---
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationForm as RegistrationFormType } from '@/schemas/usuarioSchemas';

const RegistrationForm: FC = () => {
    // --- 2. REMOVEMOS OS USESTATES DOS CAMPOS DO FORMULÁRIO ---
    const [apiError, setApiError] = useState(''); // Renomeado para clareza
    const [success, setSuccess] = useState('');
    const router = useRouter();

    // --- 3. CONFIGURAÇÃO DO REACT-HOOK-FORM ---
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegistrationFormType>({
        resolver: zodResolver(registrationSchema) // Usamos nosso novo schema aqui
    });

    // --- 4. ONSUBMIT RECEBE OS DADOS JÁ VALIDADOS PELO ZOD ---
    const onSubmit = async (data: RegistrationFormType) => {
        setApiError('');
        setSuccess('');

        const apiUrl = 'http://localhost:7500/v1/usuarios';

        try {
            // Enviamos o objeto 'data' diretamente, que já tem o formato correto
            await axios.post(apiUrl, data);

            setSuccess('Cadastro realizado com sucesso! Redirecionando...');
            setTimeout(() => router.push('/'), 2000); // Redireciona para o login

        } catch (err) {
            if (isAxiosError(err)) {
                setApiError(err.response?.data?.error || 'Não foi possível realizar o cadastro.');
            } else {
                setApiError('Erro de conexão. Tente novamente.');
            }
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Criar conta</h2>
            {/* --- 5. USAMOS O HANDLESUBMIT DO REACT-HOOK-FORM --- */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="nome">Nome Completo</label>
                    {/* --- 6. REGISTRAMOS OS INPUTS --- */}
                    <input className={styles.input} type="text" id="nome" {...register('nome')} />
                    {/* --- 7. MOSTRAMOS OS ERROS DO ZOD --- */}
                    {errors.nome && <p className={styles.errorMessage}>{errors.nome.message}</p>}
                </div>
                
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="cpf_cnpj">CPF ou CNPJ</label>
                    <input className={styles.input} type="text" id="cpf_cnpj" {...register('cpf_cnpj')} />
                    {errors.cpf_cnpj && <p className={styles.errorMessage}>{errors.cpf_cnpj.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="numero_conta">Número da Conta</label>
                    <input className={styles.input} type="text" id="numero_conta" {...register('numero_conta')} />
                    {errors.numero_conta && <p className={styles.errorMessage}>{errors.numero_conta.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="senha">Senha</label>
                    <input className={styles.input} type="password" id="senha" {...register('senha')} />
                    {errors.senha && <p className={styles.errorMessage}>{errors.senha.message}</p>}
                </div>

                {apiError && <p className={styles.errorMessage}>{apiError}</p>}
                {success && <p className={styles.successMessage}>{success}</p>} {/* Opcional: estilo diferente para sucesso */}

                <button className={styles.button} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            <div className={styles.linkContainer}>
                <Link href="/">Já tem uma conta? Faça login</Link>
            </div>
        </div>
    );
};

export default RegistrationForm;