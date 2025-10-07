import { Box, Typography } from "@mui/material";
import { CustomDialogBox, PageHeader } from "components";
import { AddAdmin, AdminCard } from "features/ManageAdmins/components";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { COLORS } from "constant/color";
import { Admin } from "collections";
import { useAddAdmin, useAdmins } from "features/ManageAdmins/hooks";

import { auth } from "libs";

export type AdminWithId = Admin & { id: string };

const ManageAdminsContainer = () => {
    const methods = useForm<Admin>();
    const [isOpen, setIsOpen] = useState(false);

    const { data: adminsData = [], isLoading } = useAdmins();
    const addAdminMutation = useAddAdmin();

    const handleConfirm = methods.handleSubmit(async (data) => {
        try {
            await addAdminMutation.mutateAsync(data);
            methods.reset();
            setIsOpen(false);
        } catch (err) {
            console.error("Error adding admin:", err);
        }
    });

    return (
        <FormProvider {...methods}>
            <CustomDialogBox
                open={isOpen}
                title="Add New Admin"
                onClose={() => setIsOpen(false)}
                onConfirm={handleConfirm}
                confirmText={
                    addAdminMutation.isPending ? "Adding..." : "Add Admin"
                }
            >
                <AddAdmin mode="add" />
            </CustomDialogBox>

            <PageHeader
                leftComponent="button"
                title="Manage Admins"
                onClick={() => {
                    methods.reset({
                        role: undefined,
                        firstName: "",
                        lastName: "",
                        email: "",
                        phoneNumber: "",
                    });
                    setIsOpen(true);
                }}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {isLoading ? (
                    <Typography>Loading admins...</Typography>
                ) : adminsData.length === 0 ? (
                    <Typography
                        sx={{
                            width: "100%",
                            height: "100vh",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "29px",
                            color: COLORS.gray.light,
                        }}
                    >
                        No other admins
                    </Typography>
                ) : (
                    adminsData
                        .filter((myData) => myData.id !== auth.currentUser?.uid)
                        .map((admin: any) => (
                            <AdminCard key={admin.id} admin={admin} />
                        ))
                )}
            </Box>
        </FormProvider>
    );
};

export default ManageAdminsContainer;
