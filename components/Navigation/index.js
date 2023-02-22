import React, { useState, useEffect } from 'react'
import { getUser } from '../../hooks/getUser'
import styles from '../../styles/Home.module.css'

export const Navigation = () => {
  const [userState, setUser] = useState({})

  useEffect(() => {
    async function fetchData() {
      const data = await getUser()

      if (!data?.id) {
        console.log('usuario não está logado!')
      }
      setUser(data)
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.setItem('token', '')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>MenuOnline</div>

      {!userState?.id ? (
        <>
          <ul>
            <a id="home" className="menu-item" href="/">
              Home
            </a>

            <a id="login" className="menu-item" href="/login">
              Entrar
            </a>

            <a id="register" className="menu-item" href="/register">
              Criar uma conta
            </a>
          </ul>
        </>
      ) : (
        <>
          <strong>Logo</strong>
          <ul>
            <a id="account" className="menu-item" href="/account">
              Minha conta
            </a>

            <a id="createmenu" className="menu-item" href="/createmenu">
              Criar Menu
            </a>

            <a id="listmenu" className="menu-item" href="/listmenu">
              Meus Menus
            </a>
          </ul>
          <span> Bem Vindo {userState?.name}, </span>
          <a
            id="logout"
            className="menu-item"
            href="/login"
            onClick={handleLogout}
          >
            Sair
          </a>
        </>
      )}
    </nav>
  )
}
