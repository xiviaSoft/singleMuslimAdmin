import { Dialog, DialogContent, DialogActions, Box, Typography, Icon } from "@mui/material";
import CustomButton from "components/CustomButton/CustomButton";
import { COLORS } from "constant/color";

interface CustomDialogBoxProps {
    open: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    icon?: React.ReactNode;
}

export const CustomDialogBox: React.FC<CustomDialogBoxProps> = ({
    open,
    title,
    children,
    onClose,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    icon,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: COLORS.white.light,
                    borderRadius: "16px",
                    maxWidth: "400px",
                    padding: "40px",
                    margin: 0,
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                    pt: 3,
                }}
            >
                {icon && (
                    <Icon
                        sx={{
                            bgcolor: COLORS.primary.hardDark,
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.white.main,
                        }}
                    >
                        {icon}
                    </Icon>
                )}
                <Typography sx={{ fontSize: "20px", fontWeight: 700, color: COLORS.primary.main }}>
                    {title}
                </Typography>
            </Box>

            <DialogContent
                sx={{
                    padding: "0",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: COLORS.primary.hard,
                    textAlign: "left",
                    my: "24px",
                    maxHeight: "300px",
                    overflowY: "auto",


                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: COLORS.white.main,
                        borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: COLORS.primary.main,
                        borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: COLORS.primary.hardDark,
                    },
                }}
            >
                {children}
            </DialogContent>

            <DialogActions>
                {onConfirm && <CustomButton title={confirmText} onClick={onConfirm} />}
                <CustomButton title={cancelText} onClick={onClose} variant="outlined" />
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialogBox;
