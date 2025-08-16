
import { Box, Stack, Typography } from "@mui/material"
import { COLORS } from "constant/color"

const Description = () => {
    return (
        <Box sx={{ width: '100%', mt: 3, mb: 2, borderRadius: '8px', backgroundColor: COLORS.white.thin }}>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: COLORS.black.dark }} >
                Descriptoin
            </Typography>
            <Box mt={2} sx={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 4px 0px', height: '160px', borderRadius: '15px', padding: '8px' }}>
                <Typography>
                    Can you please check the users profile?
                </Typography>
            </Box>

        </Box>
    )
}



export default Description
