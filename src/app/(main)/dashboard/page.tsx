"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/app/api/lib/api';

const DashboardPage = () => {
    const { token } = useAuth();
    const [usuario, setUsuario] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const response = await api.get('/auth/me');
                    setUsuario(response.data);
                } catch (error) {
                    console.error("Falha ao buscar dados do usuário", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [token]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {usuario ? (
                <p>Seja bem-vindo, {usuario.nome}!</p>
            ) : (
                <p>Não foi possível carregar os dados do usuário.</p>
            )}
        </div>
    );
};

export default DashboardPage;