import { Box, Stack, Typography } from "@mui/material"
import { COLORS } from "constant/color"

const Attachments = () => {
    return (
        <Box sx={{ width: '100%', mt: 3, mb: 2,  borderRadius: '8px', backgroundColor: COLORS.white.light }}>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: COLORS.black.dark }} >
                Attachments
            </Typography>
            <Stack gap={'20px'} direction={'row'} mt={2} flexWrap={'wrap'}>
                {[1, 2, 3].map(() => (
                    <Box component={'img'} src="/assets/images/attachment.png" sx={{ width: '75px', height: '75px', objectFit: 'cover' }} />
                ))}
            </Stack>

        </Box>
    )
}

export default Attachments
