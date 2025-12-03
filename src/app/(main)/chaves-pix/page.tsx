"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/app/api/lib/api';
import styles from './ChavesPix.module.css';

interface ChavePix {
  id: number;
  tipo: string;
  valor: string;
  data_criacao: string;
  ativa: boolean;
}

const ChavesPixPage = () => {
  const { token } = useAuth();
  const [chaves, setChaves] = useState<ChavePix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchChaves = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError('');
      const response = await api.get('/chaves-pix');
      setChaves(response.data || []);
    } catch (err) {
      console.error('Erro ao buscar chaves PIX:', err);
      setError('Não foi possível carregar suas chaves PIX.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChaves();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir esta chave PIX?')) return;

    try {
      await api.delete(`/chaves-pix/${id}`);
      alert('Chave PIX excluída com sucesso!');
      fetchChaves();
    } catch (err) {
      console.error('Erro ao excluir chave:', err);
      alert('Não foi possível excluir a chave PIX.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando chaves PIX...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Minhas Chaves PIX</h1>
        <button 
          className={styles.btnNova}
          onClick={() => window.location.href = '/chaves-pix/cadastrar'}
        >
          + Cadastrar Chave
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {chaves.length === 0 ? (
        <div className={styles.empty}>
          <p>Você ainda não possui chaves PIX cadastradas.</p>
          <button 
            className={styles.btnNova}
            onClick={() => window.location.href = '/chaves-pix/cadastrar'}
          >
            Cadastrar primeira chave
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {chaves.map((chave) => (
            <div key={chave.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.tipo}>{chave.tipo}</span>
                <span className={`${styles.status} ${chave.ativa ? styles.ativa : styles.inativa}`}>
                  {chave.ativa ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.valor}>{chave.valor}</p>
                <p className={styles.data}>
                  Cadastrada em: {formatDate(chave.data_criacao)}
                </p>
              </div>
              <div className={styles.cardFooter}>
                <button 
                  className={styles.btnDelete}
                  onClick={() => handleDelete(chave.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChavesPixPage;