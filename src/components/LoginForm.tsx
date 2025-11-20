"use client";

import { useState, type FC} from 'react';
import { useRouter } from 'next/navigation';
import axios, { isAxiosError } from 'axios';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema,type LoginForm as LoginFormType} from '@/schemas/authSchemas';
import { set, useForm } from 'react-hook-form';

const LoginForm: FC = () => {
    const [apiError, setApiError] = useState<string>('');
    const router = useRouter();
    const { login } = useAuth();
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = async (data: LoginFormType) => {
        setApiError('');
        const apiUrl = 'http://localhost:7500/v1/auth/login';

        try {
            const response = await axios.post<{ token: string }>(apiUrl, data);
            const { token } = response.data;
            login(token);
            router.push('/dashboard');

        } catch (err) {
             if (isAxiosError(err)) {
                setApiError(err.response?.data?.error || 'Credenciais inválidas.');
            } else {
                setApiError('Erro de conexão.');
            }
        }
    };


    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Login</h2>
            {/* --- 5. O HANDLESUBMIT DO REACT-HOOK-FORM ENVOLVE NOSSO ONSUBMIT --- */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="cpf_cnpj">CPF ou CNPJ</label>
                    {/* --- 6. REGISTRAMOS O INPUT E REMOVEMOS O CONTROLE MANUAL --- */}
                    <input 
                        className={styles.input} 
                        type="text" 
                        id="cpf_cnpj" 
                        {...register('cpf_cnpj')} // 'register' cuida do value, onChange, onBlur, etc.
                    />
                    {/* --- 7. EXIBIMOS O ERRO DE VALIDAÇÃO DO ZOD --- */}
                    {errors.cpf_cnpj && <p className={styles.errorMessage}>{errors.cpf_cnpj.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="senha">Senha</label>
                    <input 
                        className={styles.input} 
                        type="password" 
                        id="senha" 
                        {...register('senha')} 
                    />
                    {errors.senha && <p className={styles.errorMessage}>{errors.senha.message}</p>}
                </div>
                
                {/* Exibimos o erro que vem da API */}
                {apiError && <p className={styles.errorMessage}>{apiError}</p>}

                {/* --- 8. MELHORAMOS A EXPERIÊNCIA DO USUÁRIO --- */}
                <button className={styles.button} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <div className={styles.linkContainer}>
                <Link href="register">Não tem uma conta? Cadastre-se</Link>
            </div>
        </div>
    );
};

export default LoginForm;