
import { Logout } from "@mui/icons-material";
import { Box, Button } from "@mui/material"
import { CustomDialogBox, PageHeader } from "components"

import { AdminCard, } from "features/ManageAdmins/components"
import { useState } from "react";

const ManageAdminsContainer = () => {

    return (
        <>
            <PageHeader leftComponent="button" title="Manage Admins" />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <AdminCard />
            </Box>


        </>
    )
}

export default ManageAdminsContainer
