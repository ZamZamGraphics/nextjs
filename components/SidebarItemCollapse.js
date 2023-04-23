import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/router";

const SidebarItemCollapse = ({ item, handleDrawerToggle }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const checkOpen = router.pathname.includes(item.path) ? true : false;

  useEffect(() => {
    setOpen(checkOpen);
  }, [checkOpen]);

  return item ? (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          "&: hover": {
            backgroundColor: "#19376D",
          },
          paddingY: "10px",
          paddingX: "15px",
        }}
      >
        <ListItemIcon
          sx={{
            color: "#ffffff",
            opacity: 0.3,
            minWidth: "40px",
          }}
        >
          {item.icon && item.icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography>{item.title}</Typography>}
        />
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) =>
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
      </Collapse>
    </>
  ) : null;
};

export default SidebarItemCollapse;
