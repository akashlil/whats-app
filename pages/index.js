import SideBar from "../components/SideBar/SideBar";
import styled from "styled-components";

export default function Home() {
  return (
    <Contented>
      <SideBar></SideBar>
    </Contented>
  );
}

const Contented = styled.div`
  @media (min-width: 1200px) {
    max-width: 80%;
    margin: 0 auto;
  }
`;
