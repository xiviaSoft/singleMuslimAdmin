import { Add, KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { CustomButton, CustomDialogBox, MoreVertMenu, PageHeader } from "components";

import { UserDetailTab, UserTable, UserTabs } from "features/ManageUsers/components";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";


const ManageUsersContainer = () => {
    const [edit, setEdit] = useState(false);
    const [addUser, setAddUser] = useState(false);
    // const [isFilter, setIsFilter] = useState(false);


    const handleLogout = () => {
        console.log("User logged out");
        setEdit(false);
    };
    const menuItems = [
        { label: "Edit", action: () => setEdit(true) },
        { label: "Delete", action: () => setEdit(true) },
    ];



    const methods = useForm()


    return (
        <FormProvider {...methods}>

            <Stack gap={2}>


                {/* //PageHeader */}
                <PageHeader title="Manage Users" />


                {/* user tabs */}
                <UserTabs />


                {/* button */}
                <Stack direction={'row'} sx={{ justifyContent: 'end', gap: '10px' }}>
                    <Box sx={{ display: 'flex', mr: 'auto' }}>
                        <CustomButton variant="contained" title="Add User" onClick={() => setAddUser(true)} endIcon={<Add />} />
                    </Box>

                    <MoreVertMenu items={menuItems} icon={<CustomButton variant="outlined" title="Filter" endIcon={<Tune />}
                    />
                    } />
                    <CustomButton variant="contained" title="Sort By" endIcon={<KeyboardArrowDown />} />
                </Stack>

                {/* dilog box */}
                <CustomDialogBox
                    open={edit}
                    title="Edit you detail ?"
                    onClose={() => setEdit(false)}
                    onConfirm={handleLogout}
                    confirmText="Yes, Edit"

                >
                    <UserDetailTab />
                </CustomDialogBox>


                {/* dialog box for user */}
                <CustomDialogBox
                    open={addUser}
                    title="Add New User"
                    onClose={() => setAddUser(false)}
                    onConfirm={handleLogout}
                    confirmText="Yes, Add"

                >
                    <UserDetailTab />
                </CustomDialogBox>
                <UserTable icon={<MoreVertMenu items={menuItems} />} />
            </Stack>
        </FormProvider>
    )
}

export default ManageUsersContainer
