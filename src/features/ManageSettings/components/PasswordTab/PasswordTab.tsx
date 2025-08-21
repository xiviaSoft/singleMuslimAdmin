import { Box, ListItem, Stack, Typography } from "@mui/material";
import { CustomButton, CustomTextField, PasswordCriteriaList } from "components";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { COLORS } from "constant/color";
import { CheckCircle, Cancel, Dangerous } from "@mui/icons-material";
import { useState } from "react";

// const PasswordCriteriaList = ({ password }: { password: string }) => {
//     const isMinLength = password.length >= 8;
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

//     const criteria = [
//         { label: "Minimum 8 characters", valid: isMinLength },
//         { label: "At least 1 uppercase letter", valid: hasUppercase },
//         { label: "At least 1 lowercase letter", valid: hasLowercase },
//         { label: "At least 1 number or special character", valid: hasNumberOrSpecial },
//     ];

//     return (
//         <Box component="ul" sx={{ my: 3 }}>
//             {criteria.map((item, idx) => (
//                 <ListItem
//                     key={idx}
//                     sx={{
//                         color: item.valid ? COLORS.primary.main : COLORS.error.main,

//                         p: 0,

//                         fontSize: '14px',
//                         gap: 1
//                     }}
//                 >
//                     {item.valid ? (
//                         <CheckCircle fontSize="small" sx={{ color: COLORS.primary.main }} />
//                     ) : (
//                         <Dangerous fontSize="small" color="error" />
//                     )}
//                     {item.label}
//                 </ListItem>
//             ))}
//         </Box>
//     );
// };

const PasswordTab = () => {
    const methods = useForm();
    const passwords = useWatch({ control: methods.control, name: "NewPassword", defaultValue: "" });


    return (
        <Box sx={{ maxWidth: "440px", mx: 'auto', gap: '30px' }}>
            <FormProvider {...methods}>
                <Typography sx={{ fontWeight: 500, color: COLORS.gray.main, mb: 2 }}>
                    * If you require a new login to CollabMind Admin panel, please update the password below.
                </Typography>

                <Stack spacing={2}>
                    <CustomTextField
                        name="CurrentPassword"
                        label="Current password"
                        type="password"
                        placeholder="Current Password"
                        width="100%"
                    />
                    <CustomTextField
                        name="NewPassword"
                        label="New password"
                        type="password"
                        placeholder="New Password"
                        width="100%"

                    />
                    <CustomTextField
                        name="ConfirmPassword"
                        // label="Confirm password"
                        type="password"
                        placeholder="Confirm Password"
                        width="100%"
                    />

                </Stack>

                {<PasswordCriteriaList password={passwords} />}
                <CustomButton title="Update" variant="contained" type="submit" fullWidth />
            </FormProvider>
        </Box>
    );
};

export default PasswordTab;
