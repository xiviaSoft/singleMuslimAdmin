import { Box, Typography } from "@mui/material";
import { CustomDialogBox, PageHeader } from "components";
import { AddAdmin, AdminCard } from "features/ManageAdmins/components";
import { useState, } from "react";
import { addDoc, collection, } from "firebase/firestore";
import { auth, db } from "libs";
import { FormProvider, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { COLORS } from "constant/color";
import { Admin } from "collections";
import { useAdmins } from "features/ManageAdmins/hooks";


export type AdminWithId = Admin & { id: string };

const ManageAdminsContainer = () => {
    const methods = useForm<Admin>();
    const [isOpen, setIsOpen] = useState(false);

    const { data: adminsData = [], isLoading } = useAdmins();

    const handleConfirm = async (data: any) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await addDoc(collection(db, "admins"), {
                adminId: userCredential.user.uid,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                phoneNumber: data.phoneNumber || null,
                profileImageData: {
                    url: "",
                    alt: `${data.firstName} ${data.lastName}`,
                },
                createdAt: new Date(),
                lastLogin: new Date(),
                isActive: true,
            });
            methods.reset()
            setIsOpen(false);
        } catch (err) {
            console.error("Error adding admin:", err);
        }
    };

    return (
        <FormProvider {...methods}>
            <CustomDialogBox
                open={isOpen}
                title="Add New Admin"
                onClose={() => setIsOpen(false)}
                onConfirm={methods.handleSubmit(handleConfirm)}
                confirmText="Add Admin"
            >
                <AddAdmin mode="add" />
            </CustomDialogBox>

            <PageHeader
                leftComponent="button"
                title="Manage Admins"
                onClick={() => {
                    // Reset form every time dialog opens
                    methods.reset({
                        role: undefined,
                        firstName: "",
                        lastName: "",
                        email: "",
                        //   password: "",
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
                    adminsData.map((admin: any) => <AdminCard key={admin.id} admin={admin} />)
                )}
            </Box>
        </FormProvider>
    );
};

export default ManageAdminsContainer;
