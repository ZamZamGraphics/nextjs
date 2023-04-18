import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const sidebarWidth = "220px";
const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

export default function Layout({ children }) {
  const router = useRouter();

  if (router.pathname.includes("/dashboard")) {
    return (
      <>
        <Sidebar />
        <Navbar sidebarWidth={sidebarWidth} />
        <Main
          sx={{
            ml: { sm: sidebarWidth },
          }}
        >
          {children}
        </Main>
      </>
    );
  } else {
    return children;
  }
}
