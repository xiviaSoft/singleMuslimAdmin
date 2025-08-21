import { Button, ButtonProps } from "@mui/material";
import { COLORS } from "constant/color";

interface ButtonTypes extends ButtonProps {
    title?: string;
    textColor?: string;
    background?: string;
}

const CustomButton = ({
    variant = "contained",
    title,
    endIcon,
    startIcon,
    onClick,
    textColor,
    background,
    ...props
}: ButtonTypes) => {
    return (
        <Button
            {...props}
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            sx={{
                borderRadius: "50px",
                textTransform: "capitalize",
                px: "30px",
                py: "15px",
                ...(variant === "contained" && {
                    backgroundColor: background ? background : COLORS.primary.main,
                    color: textColor ? textColor : COLORS.white.main,
                }),
                ...(variant === "outlined" && {
                    border: "1px solid #315D57",
                    color: "#315D57",
                    backgroundColor: "transparent",
                }),
            }}
        >
            {title}
        </Button>
    );
};
export default CustomButton;
