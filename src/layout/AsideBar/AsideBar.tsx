import {
    Drawer,
    IconButton,
    Stack,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NAVDATA } from "constant";
import { COLORS } from "constant/color";
import { Link, useLocation } from "react-router";
import { useState } from "react";

const AsideBar = () => {
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width:650px)");
    const [open, setOpen] = useState(false);

    const renderNavItems = () => (
        <Stack
            sx={{
                bgcolor: COLORS.primary.light,
                height: "100%",
                width: "100px",
                alignItems: "center",
                pt: "50px",
                gap: "15px",

            }}
            className="iconBox"
        >
            {NAVDATA.map((navItem) => {
                const isActive = location.pathname === navItem.path;
                return (
                    <Link key={navItem.path} to={navItem.path}>
                        <Stack
                            sx={{
                                bgcolor: isActive ? COLORS.primary.hardDark : COLORS.white.thin,
                                width: "58px",
                                height: "60px",
                                borderRadius: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": {
                                    bgcolor: COLORS.primary.hardDark,
                                    "& .icon": {
                                        color: COLORS.white.light,
                                    },
                                },

                            }}
                        >
                            <navItem.icon className="icon"
                                sx={{
                                    color: isActive ? COLORS.white.thin : COLORS.primary.hardDark,
                                    fontSize: "30px",

                                }}
                            />
                        </Stack>
                    </Link>
                );
            })}
        </Stack>
    );

    if (isMobile) {
        return (
            <>

                <IconButton
                    sx={{ alignSelf:'self-start', }}
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon sx={{ fontSize: 30 }} />
                </IconButton>

                <Drawer
                    anchor="left"
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{ sx: { width: "100px" } }}
                >
                    {renderNavItems()}
                </Drawer>
            </>
        );
    }

    // Desktop Sidebar
    return (
        <Stack
            component={"aside"}
            sx={{
                bgcolor: COLORS.primary.light,
                height: "100vh",
                width: "100px",
                margin: "5px",
                position: "fixed",
                borderRadius: "14px",
                alignItems: "center",
                pt: "50px",
                gap: "15px",
            }}
        >
            {renderNavItems()}
        </Stack>
    );
};

export default AsideBar;
