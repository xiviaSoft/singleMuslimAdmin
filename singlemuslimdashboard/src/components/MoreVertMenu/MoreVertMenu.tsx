import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface MenuItemType {
    label: string;
    action: () => void;
}

interface MoreVertMenuProps {
    items: MenuItemType[];
}

const MoreVertMenu = ({ items }: MoreVertMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        onClick={() => {
                            handleMenuClose();
                            item.action();
                        }}
                        sx={{ p: '10px 16px', width: '100px' }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MoreVertMenu;
