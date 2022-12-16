import { useEffect, useState } from 'react'
import { gql } from "@apollo/client";
import client from "../services/apollo-client";

export default function Account() {

    const [user, setUser] = useState("");

    useEffect(async () => {
        const { name, id } = await getUser()

        if (!id) {
            console.log('usuario não está logado!')
        }
        setUser(name)

    }, [])

    return (
        <div>
            <p>Account</p>
            <p>user: {user}</p>
        </div>
    );
}

async function getUser() {
    const { data } = await client.query({
        query: gql`
      query {
        getUser {
              email
              name
              pass
              id
          }
      }
    `
    });

    return data?.getUser;
}

