import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import {
    Box,
    ListItemIcon,
    ListItem,
    List,
    styled,
    ListItemText,
    useTheme,
    ListItemButton,
} from "@mui/material";
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import OrdersIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';


const SidebarItems = ({ toggleMobileSidebar }: any) => {
    const pathname = usePathname();
    const pathDirect = pathname;
    const theme = useTheme();
  
    const ListItemStyled = styled(ListItem)(() => ({
        padding: 0,
        ".MuiButtonBase-root": {
          whiteSpace: "nowrap",
          marginBottom: "2px",
          padding: "8px 10px",
          borderRadius: "8px",
          backgroundColor: "transparent !important",
          color: theme.palette.text.secondary,
          paddingLeft: "10px",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },
          "&.Mui-selected": {
            color: "black",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "black",
            },
          },
        },
      }));

    return (
        <Box sx={{ px: 3, paddingTop: "10px" ,marginTop: "10px",borderTop: "4px solid #242571"}}>
            <List sx={{ pt: 0 }} className="sidebarNav" component="div">
                {Menuitems.map((item,index) => {
                    return (
                        <List component="div" disablePadding key={item.id}>
                            <ListItemStyled>
                                <ListItemButton
                                component={Link}
                                href={item.href}
                                selected={pathDirect === item.href}
                                onClick={toggleMobileSidebar}
                                >
                                <ListItemIcon
                                    sx={{
                                    minWidth: "36px",
                                    p: "3px 0",
                                    color: "inherit",
                                    }}
                                >
                                    {index === 0 ? <DashboardIcon /> : index === 1 ? <OrdersIcon /> : <SettingsIcon />}
                                </ListItemIcon>
                                <ListItemText>
                                    <>{item.title}</>
                                </ListItemText>
                                </ListItemButton>
                            </ListItemStyled>
                            </List>
                                );

                            })}
            </List>
        </Box>
    );
};
export default SidebarItems;