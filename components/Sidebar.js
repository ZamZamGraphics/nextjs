import { Drawer, List, Stack, Toolbar } from "@mui/material";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import sidebarRoutes from "@/routes/sidebarRoutes";

function Sidebar(props) {
  const { window, sidebarWidth, mobileOpen, handleDrawerToggle } = props;

  const drawer = (
    <List disablePadding>
      <Toolbar sx={{ marginBottom: "20px" }}>
        <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
          Company Logo
        </Stack>
      </Toolbar>
      {sidebarRoutes.map((route, index) =>
        route ? (
          route.child ? (
            <SidebarItemCollapse
              item={route}
              key={index}
              handleDrawerToggle={handleDrawerToggle}
            />
          ) : (
            <SidebarItem
              item={route}
              key={index}
              handleDrawerToggle={handleDrawerToggle}
            />
          )
        ) : null
      )}
    </List>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            color: "white",
            backgroundColor: "#0B2447",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: sidebarWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            borderRight: "0px",
            color: "white",
            backgroundColor: "#0B2447",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Sidebar;
