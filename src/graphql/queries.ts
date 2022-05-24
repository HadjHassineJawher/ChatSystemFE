import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query {
    ClientList {
      _id
      username
      image
      is_active
    }
  }
`;

const USER_LOGIN = gql`
  query ClientLogin($email:String!, $password:String! ) {
    ClientLogin(email:$email,password:$password){
      token
      refreshtoken
      userId
    }

  }
`;

const CHATROOM_BY_USER_ID = gql`
  query ChatRoombyUserId($id: String!){
    ChatRoombyUserId(id:$id){
      _id
      members{
        _id
        username
        email
        image
      }
      messages{
          body
          time
      }
    }
}
`
const MESSAGE_BY_CHAT_ROOM = gql`
  query MessagesbyChatRoomID($_Id: String!){
    MessagesbyChatRoomID(_Id:$_Id){
      _id
      body
      time
      chatRoom
      from {
        _id
        username
        email
        image
        phone
      }
    }
}`

const CLIENT_BY_ID = gql`
  query ClientbyI($id: String!){
    ClientbyID(id:$id){
    _id
    image
    username
    age
    email
    phone
  }
}`

export  {
  GET_CLIENTS,
  USER_LOGIN,
  CHATROOM_BY_USER_ID,
  MESSAGE_BY_CHAT_ROOM,
  CLIENT_BY_ID
}