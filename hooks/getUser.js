import { gql } from "@apollo/client";
import client from "../services/apollo-client";

export async function getUser() {
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
    `,
    fetchPolicy: "no-cache" 
    });

    return data?.getUser;
}