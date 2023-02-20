import { useState, useEffect } from 'react'
import { getUser } from '../hooks/getUser';
import { Navigation } from '../components/Navigation';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import client from '../services/apollo-client';

export default function UpdateAccount() {
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

    async function handleUpdate(event) {
        event.preventDefault();

        const name = event.target?.name.value;
        const email = event.target?.email.value;
        const pass = event.target?.password.value;
        const rePass = event.target?.rePassword.value;
        let data = {};

        if (pass && rePass) {
            if (pass != rePass) {
                alert("As senhas não conferem");
                return;
            }

            data.pass = pass;
        }

        if (name != user?.name) {
            data.name = name;
        }

        if (email != user?.email) {
            data.email = email;
        }

        let isUpdate = await makeUpdate(data);

        if (isUpdate) {
            router.push('/account')
        }
    }


    async function makeUpdate(variables) {
        const result = await client.mutate({
            mutation: gql`
            mutation updateUser($email: String, $pass: String, $name: String) {
                updateUser(email: $email, pass: $pass, name: $name) {
                pass
              }
            }
          `,
            variables
        })

        const resToken = result?.data?.updateUser?.pass;

        return resToken ? true : false;
    }


    return (
        <form onSubmit={handleUpdate}>
            <div>
                <input type="text" name="name" placeholder={user?.name} />
            </div>

            <div>
                <input type="email" name="email" placeholder={user?.email} />
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    pattern="[a-z0-9]{1,15}"
                    title="A senha deve conter numeros (0 a 9) ou letras (a to z)."
                    placeholder="Senha"
                />
            </div>

            <div>
                <input
                    type="password"
                    name="rePassword"
                    pattern="[a-z0-9]{1,15}"
                    title="A senha deve conter numeros (0 a 9) ou letras (a to z)."
                    placeholder="Confirme sua Senha"
                />
            </div>

            <div>
                <button>Cadastrar</button>
            </div>
        </form>
    )

}

