import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
    const { token, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header>
            {token && <button onClick={handleLogout}>Sair</button>}
        </header>
    );
}