import { gql } from "@apollo/client";

const CREATE_CLIENT = gql`
  mutation CreateClient(
    $username: String!
    $age: String!
    $email: String!
    $phone: String!
    $password: String!
    $image: String!
  ) {
    CreateClient(
      input: {
        username: $username
        age: $age
        email: $email
        phone: $phone
        password: $password
        image: $image
      }
    ) {
      _id
      username
      email
    }
  }
`;
const RESET_CODE = gql`
  mutation ResetCode($email:String!){
    ResetCode(email:$email)
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPassword($code:String!,$newPassword:String!){
    ResetPassword(code:$code,newPassword:$newPassword)
  }
`;

const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $body: String!
    $chatRoom: String!
    $from: String!

  ) {
    CreateMessage(
      input: {
        body: $body
        chatRoom: $chatRoom
        from: $from
      }
    ) {
        body
        time
        chatRoom
    }
  }
`;

export { CREATE_CLIENT, RESET_CODE, RESET_PASSWORD,CREATE_MESSAGE};
