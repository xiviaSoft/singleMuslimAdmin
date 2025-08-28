import { Dangerous, } from "@mui/icons-material";
import {
    Box,
    Stack,
    Typography,

} from "@mui/material";
import { useEffect, useState } from "react";
import { COLORS } from "constant/color";
import { CustomDialogBox, CustomRadio, MoreVertMenu } from "components";
import AddAdmin from "../AddAdmin/AddAdmin";
import { FormProvider, useForm } from "react-hook-form";
import { PERMISSON_DATA } from "constant";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "libs";

type AdminProps = {
    admin: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
};
const AdminCard = ({ admin }: AdminProps) => {
    const methods = useForm({
  defaultValues: {
    // firstName: admin.firstName,
    // lastName: admin.lastName,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  },
});
const [showEdit, setShowEdit] = useState(false);
const [showDelete, setShowDelete] = useState(false);
const menuItems = [
    { label: "Edit", action: () => setShowEdit(true) },
    { label: "Delete", action: () => setShowDelete(true) },
];
const handleDeleteAdmin = async () => {
    try {
        await deleteDoc(doc(db, "admins", admin.id)); // remove from Firestore
        console.log("Admin deleted:", admin.id);
        setShowDelete(false);
    } catch (err) {
        console.error("Error deleting admin:", err);
    }
}


const handleEditAdmin = async (data: any) => {
    try {
        const adminRef = doc(db, "admins", admin.id);
        
        await updateDoc(adminRef, data); 
        
        
        const updatedSnap = await getDoc(adminRef);
        if (updatedSnap.exists()) {
            console.log("Admin updated successfully!", updatedSnap.data());
        }
        setShowEdit(false);
    } catch (err) {
        console.error("Error updating admin:", err);
    }
};

useEffect(() => {
  if (showEdit) {
    methods.reset({
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  }
}, [showEdit, admin, methods]);

    return (
        <>

            <Stack
                // key={index}
                sx={{
                    height: "301px",
                    width: { md: '190px', sm: '45%', xs: '98%' },
                    padding: "30px 10px",
                    boxShadow:
                        "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
                    borderRadius: "12px",
                    alignItems: "center",
                    gap: "24px",
                }}
            >
                <Stack direction={"column"} sx={{ width: "100%", alignItems: "center" }}>
                    <Box sx={{ display: 'flex', alignSelf: 'end' }}>
                        <MoreVertMenu items={menuItems} />
                    </Box>

                    <Box
                        component={"img"}
                        src="/assets/images/adminProfile.png"
                        sx={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </Stack>
                <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: "800" }}>
                        {admin.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: COLORS.black.darkGray, textAlign: 'center' }}
                    >
                        {admin.role}
                    </Typography>
                </Box>
                <Typography variant="body2">{admin.email}</Typography>
                <CustomDialogBox
                    open={showDelete}
                    title="Delete Admin"
                    onClose={() => setShowDelete(false)}
                    onConfirm={handleDeleteAdmin}
                    confirmText="Yes, I confirm"
                    icon={<Dangerous />}
                >{`Are you sure you want to delete the admin “${admin.name}”? Actions are not reversable. Their comments and uploads to the project will remain `}</CustomDialogBox>
            </Stack>
      


            <CustomDialogBox
                open={showEdit}
                title="Update Admin"
                onClose={() => setShowEdit(false)}
                onConfirm={methods.handleSubmit(handleEditAdmin)}
                confirmText="Update Admin"

            >
                <FormProvider {...methods}>

                <AddAdmin />
                </FormProvider> 
                <Stack mt={2} spacing={2} ml={1}>
                    <Typography>
                        Permissions
                    </Typography>

                    <form >
                        <CustomRadio
                            name="gender"

                            options={PERMISSON_DATA.map((item) => ({
                                label: item,
                                value: item
                            }))}

                        />

                    </form>

                </Stack>
            </CustomDialogBox>
        </>
    );
};

export default AdminCard;
