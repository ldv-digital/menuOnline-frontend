import { useState, useEffect } from 'react'
import { getUser } from '../hooks/getUser';
import { Navigation } from '../components/Navigation';
import { useRouter } from 'next/router';
import styles from './account.module.css'

export default function Account() {
    const router = useRouter()
    const [user, setUser] = useState({});

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


    return (
        <>
        <Navigation />
         <div className={styles.body}>
            <div className={styles.conta}>
            <p>Conta</p>
            <p>user: {user?.id}</p>
            <p>Nome: {user?.name}</p>
            <p>Email: {user?.email}</p>

            <br/>
            <a href='/listmenu'><button>Meus Menus</button></a>
            <a href='/createmenu'><button>Criar Menu</button></a>
            <button onClick={() => router.push('/updateaccount')}>Atualizar informacões</button>
            </div>
         </div>
        </>
    );
}

