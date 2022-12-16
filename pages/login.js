import { gql } from "@apollo/client";
import client from "../services/apollo-client";

export default function Login() {
    makeLogin("jamacio@hotmail.com", "teste@123456")

    return (
        <div>
            Login
        </div>
    );
}

async function makeLogin(user, pass) {

    const result = await client.mutate({
        mutation: gql`
      mutation LoginUser ($user: String, $pass: String) {
        getLogin(email: $user, pass: $pass) {
          token
          email
          name
        }
      }
    `,
        variables: { user, pass }
    })

    localStorage.setItem('token', result?.data?.getLogin?.token);
}

