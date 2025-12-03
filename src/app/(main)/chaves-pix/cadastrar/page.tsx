/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/app/api/lib/api';
import { chavePixSchema, type ChavePixFormData } from '@/schemas/chavePix.schema';
import styles from '@/components/Form.module.css';

const CadastrarChavePixPage = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<ChavePixFormData>({
    tipo: 'CPF',
    valor: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const tiposChave = [
    { value: 'CPF', label: 'CPF' },
    { value: 'CNPJ', label: 'CNPJ' },
    { value: 'EMAIL', label: 'E-mail' },
    { value: 'TELEFONE', label: 'Telefone' },
    { value: 'ALEATORIA', label: 'Chave Aleatória' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    // Validação com Zod
    const validation = chavePixSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      await api.post('/chaves-pix', {
        tipo: validation.data.tipo,
        valor: validation.data.valor,
      });

      alert('Chave PIX cadastrada com sucesso!');
      router.push('/chaves-pix');
    } catch (err: any) {
      console.error('Erro ao cadastrar chave PIX:', err);
      setApiError(
        err.response?.data?.error || 
        'Não foi possível cadastrar a chave PIX. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (formData.tipo) {
      case 'CPF':
        return '000.000.000-00';
      case 'CNPJ':
        return '00.000.000/0000-00';
      case 'EMAIL':
        return 'seu@email.com';
      case 'TELEFONE':
        return '(00) 00000-0000';
      case 'ALEATORIA':
        return 'Será gerada automaticamente';
      default:
        return '';
    }
  };

  return (
    <div className={styles.formContainer} style={{ margin: '2rem auto' }}>
      <h2 className={styles.title}>Cadastrar Nova Chave PIX</h2>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="tipo">
            Tipo de Chave *
          </label>
          <select
            className={styles.input}
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            {tiposChave.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          {errors.tipo && (
            <span className={styles.errorMessage}>{errors.tipo}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="valor">
            Valor da Chave *
          </label>
          <input
            className={styles.input}
            type="text"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            placeholder={getPlaceholder()}
            disabled={formData.tipo === 'ALEATORIA'}
          />
          {errors.valor && (
            <span className={styles.errorMessage}>{errors.valor}</span>
          )}
          {formData.tipo === 'ALEATORIA' && (
            <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              Uma chave aleatória será gerada automaticamente pelo sistema
            </small>
          )}
        </div>

        {apiError && <div className={styles.errorMessage}>{apiError}</div>}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button
            className={styles.button}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Chave'}
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => router.back()}
            style={{ backgroundColor: '#6c757d' }}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#333' }}>
          ℹ️ Tipos de Chave PIX
        </h3>
        <ul style={{ fontSize: '0.9rem', color: '#666', paddingLeft: '1.5rem' }}>
          <li><strong>CPF:</strong> Use seu CPF como chave</li>
          <li><strong>CNPJ:</strong> Para empresas</li>
          <li><strong>E-mail:</strong> Seu endereço de e-mail</li>
          <li><strong>Telefone:</strong> Número de celular com DDD</li>
          <li><strong>Aleatória:</strong> Código gerado automaticamente</li>
        </ul>
      </div>
    </div>
  );
};

export default CadastrarChavePixPage;