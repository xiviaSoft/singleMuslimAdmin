import { KeyboardArrowDown, Tune } from "@mui/icons-material"
import { Stack } from "@mui/material"
import { CustomButton, CustomDialogBox, CustomTable, MoreVertMenu, PageHeader } from "components"
import { REPORT_TABLE_DATA } from "constant"
import { UserDetailTab } from "features/ManageUsers/components"
import { useState } from "react"


const ManageSafetyReportContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const handleLogout = () => {
        console.log("User logged out");
        setShowLogout(false);
    };
    const menuItems = [
        { label: "Edit", action: () => setShowLogout(true) },
        { label: "Delete", action: () => setShowLogout(true) },
    ];

    return (
        <div>
            <PageHeader title="Safety Reports" />
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
            <CustomTable movertIcon={<MoreVertMenu items={menuItems} />} columns={REPORT_TABLE_DATA.columns} rows={REPORT_TABLE_DATA.rows} />
            








        </div>
    )
}

export default ManageSafetyReportContainer
