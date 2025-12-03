/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/app/api/lib/api';
import { transacaoSchema, type TransacaoFormData } from '@/schemas/transacao.schema';
import styles from '@/components/Form.module.css';

const NovaTransacaoPage = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<TransacaoFormData>({
    valor: 0,
    chavePixDestino: '',
    descricao: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor' ? parseFloat(value) || 0 : value,
    }));

    // Limpa erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    // Validação com Zod
    const validation = transacaoSchema.safeParse(formData);

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
      await api.post('/transacoes', {
        valor: validation.data.valor,
        chave_pix_destino: validation.data.chavePixDestino,
        descricao: validation.data.descricao || null,
      });

      alert('Transação realizada com sucesso!');
      router.push('/transacoes');
    } catch (err: any) {
      console.error('Erro ao realizar transação:', err);
      setApiError(
        err.response?.data?.error || 
        'Não foi possível realizar a transação. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer} style={{ margin: '2rem auto' }}>
      <h2 className={styles.title}>Nova Transação PIX</h2>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="chavePixDestino">
            Chave PIX de Destino *
          </label>
          <input
            className={styles.input}
            type="text"
            id="chavePixDestino"
            name="chavePixDestino"
            value={formData.chavePixDestino}
            onChange={handleChange}
            placeholder="CPF, e-mail, telefone ou chave aleatória"
          />
          {errors.chavePixDestino && (
            <span className={styles.errorMessage}>{errors.chavePixDestino}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="valor">
            Valor (R$) *
          </label>
          <input
            className={styles.input}
            type="number"
            id="valor"
            name="valor"
            value={formData.valor || ''}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            placeholder="0.00"
          />
          {errors.valor && (
            <span className={styles.errorMessage}>{errors.valor}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="descricao">
            Descrição (opcional)
          </label>
          <textarea
            className={styles.input}
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Adicione uma descrição"
            rows={3}
            style={{ resize: 'vertical' }}
          />
          {errors.descricao && (
            <span className={styles.errorMessage}>{errors.descricao}</span>
          )}
        </div>

        {apiError && <div className={styles.errorMessage}>{apiError}</div>}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button
            className={styles.button}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Realizar Transação'}
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
    </div>
  );
};

export default NovaTransacaoPage;