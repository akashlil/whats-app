import { Button } from "@material-ui/core";
import styled from "styled-components";
export default function Home() {
  return (
    <div>
      <h1>ok</h1>
      <SidebarButton color="primary" variant="contained">
        ok google
      </SidebarButton>
      <Button color="primary">@mui/material</Button>
    </div>
  );
}

const SidebarButton = styled(Button)`
  width: 100%;
  height: 150px;
`;
