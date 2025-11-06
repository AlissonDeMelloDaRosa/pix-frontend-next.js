"use client";
import React, {useState} from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                Meu Projeto PIX
            </Link>
            <div className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}
                 onClick={()=> setIsOpen(false)}>
                <Link href="/">Início</Link>
                <Link href="/userlist">Lista de Usuários</Link>
                <Link href="/index">Index</Link>
                <Link href="/about">Sobre</Link>
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
