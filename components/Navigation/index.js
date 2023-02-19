import React, { useState, useEffect } from "react";
import { getUser } from '../../hooks/getUser';

export const Navigation = () => {
    const [userState, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await getUser()

            if (!data?.id) {
                console.log('usuario não está logado!')
            }
            setUser(data)
        }
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.setItem('token', "");
    };

    return (
        <nav>
            <a id="home" className="menu-item" href="/">Home</a>
            {!userState?.id ? (
                <>
                    <span> | </span>
                    <a id="login" className="menu-item" href="/login">Entrar</a>
                    <span> | </span>
                    <a id="register" className="menu-item" href="/register">Criar uma conta</a>
                </>
            ) : (
                <>
                    <span> | </span>
                    <a id="account" className="menu-item" href="/account">Minha conta</a>
                    <span> | </span>
                    <a id="createmenu" className="menu-item" href="/createmenu">Criar Menu</a>
                    <span> | </span>
                    <span> Bem Vindo {userState?.name}, </span>
                    <a id="logout" className="menu-item" href="/login" onClick={handleLogout} >Sair</a>
                </>
            )}
        </nav>
    );
};