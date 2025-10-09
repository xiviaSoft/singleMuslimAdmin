import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { COLORS } from "constant/color";
import CustomButton from "components/CustomButton/CustomButton";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

interface CustomSortProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

const CustomSort = ({  onChange, options }: CustomSortProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (option: string) => {
        onChange(option);
        handleClose();
    };

    return (
        <>


            <CustomButton variant="contained" onClick={handleClick} title="Sort Options" endIcon={<KeyboardDoubleArrowRight />} />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        mt: 1,
                        "& .MuiMenuItem-root": {
                            fontFamily: "Satoshi, sans-serif",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: COLORS.blue.main,
                            "&:hover": {
                                backgroundColor: COLORS.primary.light,
                            },
                        },
                    },
                }}
            >
                {options.map((opt) => (
                    <MenuItem key={opt} onClick={() => handleSelect(opt)}>
                        {opt}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default CustomSort;
