import { CheckCircle, Dangerous } from "@mui/icons-material";
import { Box, ListItem } from "@mui/material";
import { COLORS } from "constant/color";

const PasswordCriteriaList = ({ password }: { password: string }) => {
    const isMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const criteria = [
        { label: "Minimum 8 characters", valid: isMinLength },
        { label: "At least 1 uppercase letter", valid: hasUppercase },
        { label: "At least 1 lowercase letter", valid: hasLowercase },
        { label: "At least 1 number or special character", valid: hasNumberOrSpecial },
    ];

    return (
        <Box component="ul" sx={{ my: 3 }}>
            {criteria.map((item, idx) => (
                <ListItem
                    key={idx}
                    sx={{
                        color: item.valid ? COLORS.primary.main : COLORS.error.main,

                        p: 0,

                        fontSize: '14px',
                        gap: 1
                    }}
                >
                    {item.valid ? (
                        <CheckCircle fontSize="small" sx={{ color: COLORS.primary.main }} />
                    ) : (
                        <Dangerous fontSize="small" color="error" />
                    )}
                    {item.label}
                </ListItem>
            ))}
        </Box>
    );
};
export default PasswordCriteriaList;