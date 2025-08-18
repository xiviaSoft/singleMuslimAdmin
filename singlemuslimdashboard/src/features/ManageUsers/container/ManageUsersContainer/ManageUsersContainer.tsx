import { KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { CustomButton, CustomDialogBox, MoreVertMenu, PageHeader } from "components";

import { UserDetailTab, UserTable, UserTabs } from "features/ManageUsers/components";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";


const ManageUsersContainer = () => {
    const [showLogout, setShowLogout] = useState(false);


    const handleLogout = () => {
        console.log("User logged out");
        setShowLogout(false);
    };
    const menuItems = [
        { label: "Edit", action: () => setShowLogout(true) },
        { label: "Delete", action: () => setShowLogout(true) },
    ];


    const methods = useForm()


    return (
        <FormProvider {...methods}>

            <Stack gap={2}>
                <PageHeader title="Manage Users" />
                <UserTabs />
                <Stack direction={'row'} sx={{ justifyContent: 'end', gap: '10px' }}>
                    <CustomButton variant="outlined" title="Filter" endIcon={<Tune />} />
                    <CustomButton variant="contained" title="Sort By" endIcon={<KeyboardArrowDown />} />
                </Stack>


                <CustomDialogBox
                    open={showLogout}
                    title="Edit you detail ?"
                    onClose={() => setShowLogout(false)}
                    onConfirm={handleLogout}
                    confirmText="Yes, Edit"

                >
                    <UserDetailTab />
                </CustomDialogBox>
                <UserTable icon={<MoreVertMenu items={menuItems} />} />
            </Stack>
        </FormProvider>
    )
}

export default ManageUsersContainer
