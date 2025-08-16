import { Add } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { CustomButton, CustomTextField } from "components";
import { COLORS } from "constant/color";
import { FormProvider, useForm } from "react-hook-form";

const AccountInfoTab = () => {
    const methods = useForm();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("Selected file:", file);

        }
    };

    return (
        <Stack gap={'30px'}>
            <Typography sx={{fontSize:'20px',fontWeight:900}}>Account Information

            </Typography>
            <Stack direction="row" sx={{ maxWidth: "500px", gap: "30px" }}>

                <Box
                    sx={{
                        position: "relative",
                        height: "140px",
                        width: "140px",
                    }}
                >

                    <Avatar
                        sx={{
                            width: "140px",
                            height: "140px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", // Added shadow
                        }}
                    />
                    <input
                        accept="image/*"
                        type="file"
                        id="upload-avatar"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-avatar">
                        <IconButton
                            component="span"
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: "0%",
                                bgcolor: COLORS.primary.light,
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", // Shadow for button too
                                "&:hover": {
                                    bgcolor: COLORS.primary.main,
                                },
                            }}
                        >
                            <Add />
                        </IconButton>
                    </label>
                </Box>
                <FormProvider {...methods}>
                    <Stack gap="20px" width={'100%'}>
                        <CustomTextField
                            name="firstName"
                            type="text"
                            placeholder=""
                            label="First Name"
                              width="100%"
                        />
                        <CustomTextField
                            name="lastName"
                            type="text"
                            placeholder=""
                            width="100%"
                            label="Last Name "
                        />
                        <CustomButton
                            title="Update"
                            variant="contained"
                            type="submit"
                            fullWidth
                        />
                    </Stack>
                </FormProvider>
            </Stack>
        </Stack>
    );
};

export default AccountInfoTab;
