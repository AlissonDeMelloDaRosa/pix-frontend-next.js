"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { token, logout } = useAuth();
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        router.push('/');
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                ÁlissonPixFácil
            </Link>
            
            <div 
                className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}
                onClick={() => setIsOpen(false)}
            >
                {token ? (
                    <>
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/chaves-pix">Chaves PIX</Link>
                        <Link href="/transacoes">Transações</Link>
                        <button 
                            onClick={handleLogout}
                            className={styles.logoutBtn}
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/">Login</Link>
                        <Link href="/register">Criar Conta</Link>
                    </>
                )}
            </div>
            
            <button className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </button>
        </nav>
    );
};

export default Navbar;