
import { Box } from "@mui/material"
import { CustomDialogBox, PageHeader } from "components"

import { AddAdmin, AdminCard, } from "features/ManageAdmins/components"

import { useState } from "react";


const ManageAdminsContainer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleConfirm = () => {
        console.log('admin detaail added')
    }

    return (
        <>
            <CustomDialogBox
                open={isOpen}
                title="Add New Admin"
                onClose={() => setIsOpen(false)}
                onConfirm={handleConfirm}
                confirmText="Add Admin"

            >
                <AddAdmin />
            </CustomDialogBox>
            <PageHeader leftComponent="button" title="Manage Admins" onClick={() => setIsOpen(true)} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <AdminCard />
            </Box>


        </>
    )
}

export default ManageAdminsContainer
