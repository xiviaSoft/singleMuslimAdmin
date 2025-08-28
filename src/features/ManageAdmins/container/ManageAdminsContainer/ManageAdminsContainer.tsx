import { Box } from "@mui/material";
import { CustomDialogBox, PageHeader } from "components";
import { AddAdmin, AdminCard } from "features/ManageAdmins/components";
import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "libs";
import { FormProvider, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
// make sure you export initialized db

type Admin = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type AddAdmin = {
    role: string
    firstName: string
    lastName: string
    password: string
    email: string
}

const ManageAdminsContainer = () => {
    const methods = useForm<AddAdmin>();
    const [isOpen, setIsOpen] = useState(false);
    const [admins, setAdmins] = useState<Admin[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "admins"), (snapshot) => {
            const adminList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Admin[];
            setAdmins(adminList);
        });

        return () => unsubscribe();
    }, []);

    const handleConfirm = async (data: AddAdmin) => {
        try {
             await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await addDoc(collection(db, "admins"), {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                role: data.role,
                createdAt: new Date(),
            });
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
                <AddAdmin />
            </CustomDialogBox>

            <PageHeader
                leftComponent="button"
                title="Manage Admins"
                onClick={() => setIsOpen(true)}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {admins.map((admin) => (
                    <AdminCard key={admin.id} admin={admin} />
                ))}
            </Box>
        </FormProvider>
    );
};

export default ManageAdminsContainer;
