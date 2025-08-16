import { Stack, Typography } from "@mui/material"
import { CustomTable } from "components"
import { COLORS } from "constant/color"


const Reporter = () => {
    return (
        <>
        <Stack direction="column" gap={2} sx={{ marginTop: '24px' }}>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: COLORS.black.dark }} >
                Reporter
            </Typography>
            <CustomTable rows={REPORT_TABLE_DATA.rows} columns={REPORT_TABLE_DATA.columns} />

        </Stack>
        <Stack direction="column" gap={2} sx={{ marginTop: '24px' }}>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: COLORS.black.dark }} >
                Content
            </Typography>
            <CustomTable rows={REPORT_TABLE_DATA.rows} columns={REPORT_TABLE_DATA.columns} />

        </Stack>
        </>
    )
}

export default Reporter

const REPORT_TABLE_DATA = {
    columns: [
        { label: "COMPANY NAME", field: "companyName" },
        { label: "USER NAME", field: "userName" },
        { label: "SUBJECT", field: "subject" },
        { label: "CATEGORY", field: "category" },
        { label: "CONTENT", field: "content" },
        { label: "STATUS", field: "status" },
    ],
    rows: [
        {
            companyName: "Coral Design",
            userName: "Lance Stroll",
            subject: "I found out he was not part",
            category: "Misuse",
            content: "User Profile",
            status: "Open",
        },
        // ...Array(7).fill({
        //     companyName: "Coral Design",
        //     userName: "Lance Stroll",
        //     subject: "I found out he was not part",
        //     category: "Unrecognized User",
        //     content: "Comment",
        //     status: "New",
        // }),
    ],
};
