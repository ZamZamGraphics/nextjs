import { ListItemButton, ListItemIcon } from "@mui/material";
import Link from "next/link";

const SidebarItem = ({ item }) => {
  return item && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        "&: hover": {
          backgroundColor: "#cccccc",
        },
        paddingY: "12px",
        paddingX: "24px",
      }}
    >
      <ListItemIcon
        sx={{
          color: "#dddddd",
        }}
      >
        {item.icon && item.icon}
      </ListItemIcon>
      {item.title}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
