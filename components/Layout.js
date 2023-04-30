import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useState } from "react";
import PrivetRoute from "./PrivetRoute";

const sidebarWidth = "220px";
const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  marginTop: "45px",
}));

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const router = useRouter();

  if (router.pathname.includes("/dashboard")) {
    return (
      <PrivetRoute>
        <Navbar
          sidebarWidth={sidebarWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Sidebar
          sidebarWidth={sidebarWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Main sx={{ ml: { sm: sidebarWidth } }}>{children}</Main>
      </PrivetRoute>
    );
  } else {
    return children;
  }
}
