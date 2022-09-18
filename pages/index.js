import { Button } from "@material-ui/core";
import styled from "styled-components";
import SideBar from "../components/SideBar/SideBar";
export default function Home() {
  return (
    <div>
      <SideBar></SideBar>
    </div>
  );
}

const SidebarButton = styled(Button)`
  width: 100%;
  height: 150px;
`;
