import { useState, useEffect } from 'react'
import { getUser } from '../hooks/getUser';
import { Navigation } from '../components/Navigation';
import { useRouter } from 'next/router';


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
        <div>
            <Navigation />
            <p>Account</p>
            <p>user: {user?.id}</p>
            <p>user: {user?.name}</p>
            <p>user: {user?.email}</p>

            <br/>
            <button onClick={() => router.push('/updateaccount')}>Atualizar informacões</button>
        </div>
    );
}

