import {
    Box,
    Stack,
    Typography,

} from "@mui/material";
import { useEffect, useState } from "react";
import { COLORS } from "constant/color";
import { CustomDialogBox, MoreVertMenu } from "components";
import AddAdmin from "../AddAdmin/AddAdmin";
import { FormProvider, useForm } from "react-hook-form";

import { useDeleteAdmin, useUpdateAdmin } from "features/ManageAdmins/hooks";

type AdminProps = {
    admin: {
        id: string;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
    };
};
const AdminCard = ({ admin }: AdminProps) => {
    const methods = useForm({
        defaultValues: {
            firstName: admin.firstName,
            lastName: admin.lastName,
            // name: admin.name,
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
    const { mutate: deleteAdmin } = useDeleteAdmin();
    const { mutate: updateAdmin, } = useUpdateAdmin();


    const handleDeleteAdmin = () => {
        deleteAdmin(admin.id);
    };
    const handleEditAdmin = (data: any) => {
        updateAdmin({ id: admin.id, data });
        setShowEdit(false)
        methods.reset()
    };

    useEffect(() => {
        if (showEdit) {
            methods.reset({
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                role: admin.role,
            });
        }
    }, [showEdit, admin, methods]);

    return (
        <>

            <Stack

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
                    <Typography sx={{
                        fontSize: "18px",
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "150px",
                        display: "block",
                        textAlign: "center",
                    }}
                    >
                        {`
${admin.firstName} ${admin.lastName}`}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: COLORS.black.darkGray, textAlign: 'center' }}
                    >
                        {admin.role}
                    </Typography>
                </Box>
                <Typography variant="body2">{admin.email}</Typography>

            </Stack>


            <CustomDialogBox
                open={showDelete}
                title="Delete Admin"
                onClose={() => setShowDelete(false)}
                onConfirm={handleDeleteAdmin}
                confirmText="Yes, I confirm"
            >
                {`Are you sure you want to delete the admin “${admin.firstName} ${admin.lastName}”?`}
            </CustomDialogBox>

            <CustomDialogBox
                open={showEdit}
                title="Update Admin"
                onClose={() => setShowEdit(false)}

                onConfirm={methods.handleSubmit(handleEditAdmin)}
                confirmText="Update Admin"
            >
                <FormProvider {...methods}>
                    <AddAdmin mode="edit" />
                </FormProvider>
            </CustomDialogBox>
        </>
    );
};

export default AdminCard;
