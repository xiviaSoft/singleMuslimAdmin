import { Add } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography, CircularProgress } from "@mui/material";
import { CustomButton, CustomTextField } from "components";
import { COLORS } from "constant/color";
import { useAuth, useToast } from "context";
import { FormProvider, useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs";
import { useMutation } from "@tanstack/react-query";

interface FormValues {
    firstName: string;
    lastName: string;
}

const AccountInfoTab = () => {
    const { user } = useAuth();
    const { showToast } = useToast();

    const methods = useForm<FormValues>({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
        },
    });

    // ✅ React Query mutation for updating user data
    const updateUserMutation = useMutation({
        mutationFn: async (data: FormValues) => {
            if (!user) throw new Error("No user found");
            const userRef = doc(db, "admins", user.adminId);
            await updateDoc(userRef, {
                firstName: data.firstName,
                lastName: data.lastName,
            });
        },
        onSuccess: () => {

            showToast("User updated successfully", "success");
        },
        onError: (e) => {

            showToast(`${e}`, "error");
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) console.log("Selected file:", file);
    };

    const onSubmit = (data: FormValues) => {
        updateUserMutation.mutate(data);
    };

    return (
        <Stack gap={"30px"}>
            <Typography sx={{ fontSize: "20px", fontWeight: 900 }}>
                Account Information
            </Typography>

            <Stack direction="row" sx={{ maxWidth: "500px", gap: "30px" }}>
                {/* ✅ Avatar Section */}
                <Box sx={{ position: "relative", height: "140px", width: "140px" }}>
                    <Avatar
                        sx={{
                            width: "140px",
                            height: "140px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
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
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                                "&:hover": { bgcolor: COLORS.primary.main },
                            }}
                        >
                            <Add />
                        </IconButton>
                    </label>
                </Box>

                {/* ✅ Form Section */}
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Stack gap="20px" width={"100%"}>
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
                                label="Last Name"
                                width="100%"
                            />


                            <CustomButton
                                title={
                                    // updateUserMutation.isPending ? (
                                    //     <CircularProgress size={22} color="inherit" />
                                    // ) : (
                                    "Update"
                                    //     )
                                }
                                variant="contained"
                                type="submit"
                                fullWidth
                                disabled={updateUserMutation.isPending}
                            />
                        </Stack>
                    </form>
                </FormProvider>
            </Stack>
        </Stack>
    );
};

export default AccountInfoTab;
