import { Box, Divider, Stack, Typography } from "@mui/material"
import AnalyticsChart from "../AnalyticsChart/AnalyticsChart"
import AmountOfContentAddedUser from "../AmountOfContentAddedUser/AmountOfContentAddedUser"
import { COLORS } from "constant/color"


const IndividualAnalytics = () => {
    return (
        <Stack>
            <Typography sx={{ fontSize: '20px', fontWeight: '900', color: COLORS.black.dark, my: '16px' }}>
                Individual Analytics
            </Typography>

            <Stack direction={{md:'row',xs:'column'}} gap={'60px'} padding={2}>
                <Box>
                    <Typography sx={{ fontWeight: '500', color: COLORS.black.dark, my: '8px' }}>
                        Data Usage of the Company
                    </Typography>
                    <AnalyticsChart />

                </Box>

                <Box>
                    <Typography sx={{ fontWeight: '500', color: COLORS.black.dark, my: '8px' }}>
                        Uploaded Documents
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: 800, fontSize: '24px', color: COLORS.black.darkGray }}>
                        1000
                    </Typography>

                </Box>
            </Stack>
            <Divider />
            <AmountOfContentAddedUser />
        </Stack>
    )
}

export default IndividualAnalytics
