import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { signInWithPopup, auth, provider } from "../firebase";

export default function Login() {
  const singIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      alert(error);
    });
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://thumbs.dreamstime.com/b/whatsapp-icon-isolated-white-vector-file-included-whatsapp-flat-icon-164609425.jpg" />
        <Button variant="outlined" onClick={singIn}>
          Google Login in
        </Button>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 120px;
  background-color: white;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border-radius: 100x;
`;
const Logo = styled.img`
  height: 300px;
  width: 300px;
  margin-bottom: 50px;
`;
