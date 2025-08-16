import { KeyboardArrowDown, Tune } from "@mui/icons-material"
import { Stack } from "@mui/material"
import { CustomButton, CustomTable, PageHeader } from "components"
import { REPORT_TABLE_DATA } from "constant"


const ManageSafetyReportContainer = () => {
    return (
        <div>
            <PageHeader title="Safety Reports" />
            <Stack direction={'row'} sx={{ justifyContent: 'end', gap: '10px' }}>
                <CustomButton variant="outlined" title="Filter" endIcon={<Tune />} />
                <CustomButton variant="contained" title="Sort By" endIcon={<KeyboardArrowDown />} />
            </Stack>
            <CustomTable columns={REPORT_TABLE_DATA.columns} rows={REPORT_TABLE_DATA.rows} />

        </div>
    )
}

export default ManageSafetyReportContainer
