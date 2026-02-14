import { Stack, Typography } from "@mui/material"
// import { CustomTable } from "components"
import { COLORS } from "constant/color"


const Reporter = () => {

    return (
        <>
            <Stack direction="column" gap={2} sx={{ marginTop: '24px' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, color: COLORS.black.dark }} >
                    Reporter
                </Typography>


            </Stack>
            <Stack direction="column" gap={2} sx={{ marginTop: '24px' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, color: COLORS.black.dark }} >
                    Content
                </Typography>


            </Stack>
        </>
    )
}

export default Reporter

