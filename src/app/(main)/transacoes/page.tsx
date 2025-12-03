"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/app/api/lib/api';
import { NavPagination } from '@/components/Pagination';
import styles from './Transacoes.module.css';

interface Transacao {
  id: number;
  valor: number;
  chave_pix_origem: string;
  chave_pix_destino: string;
  descricao?: string;
  data_criacao: string;
  status: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const TransacoesPage = () => {
  const { token } = useAuth();
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const fetchTransacoes = async (page: number = 1) => {
    if (!token) return;

    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/transacoes', {
        params: {
          page,
          limit: pagination.itemsPerPage,
        },
      });

      // Adapte conforme a estrutura da sua API
      const { data, pagination: paginationData } = response.data;
      
      setTransacoes(data || []);
      setPagination(prev => ({
        ...prev,
        currentPage: paginationData?.currentPage || page,
        totalPages: paginationData?.totalPages || 1,
        totalItems: paginationData?.totalItems || 0,
      }));
    } catch (err) {
      console.error('Erro ao buscar transações:', err);
      setError('Não foi possível carregar as transações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacoes(pagination.currentPage);
  }, [token]);

  const handlePageChange = (newPage: number) => {
    fetchTransacoes(newPage);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && transacoes.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando transações...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Minhas Transações</h1>
        <button 
          className={styles.btnNova}
          onClick={() => window.location.href = '/transacoes/nova'}
        >
          + Nova Transação
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {transacoes.length === 0 ? (
        <div className={styles.empty}>
          <p>Nenhuma transação encontrada.</p>
        </div>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Valor</th>
                  <th>Descrição</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((transacao) => (
                  <tr key={transacao.id}>
                    <td>{formatDate(transacao.data_criacao)}</td>
                    <td className={styles.chave}>
                      {transacao.chave_pix_origem}
                    </td>
                    <td className={styles.chave}>
                      {transacao.chave_pix_destino}
                    </td>
                    <td className={styles.valor}>
                      {formatCurrency(transacao.valor)}
                    </td>
                    <td>{transacao.descricao || '-'}</td>
                    <td>
                      <span className={`${styles.status} ${styles[transacao.status.toLowerCase()]}`}>
                        {transacao.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              Mostrando {transacoes.length} de {pagination.totalItems} transações
            </div>
            <NavPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TransacoesPage;