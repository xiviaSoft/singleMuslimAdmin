import { Box, Grid, Stack, Typography } from "@mui/material"
import { COLORS } from "constant/color"


const AmountOfContentAddedUser = () => {
    return (
        <Box py={'24px'}>
            <Typography sx={{ fontSize: '20px', fontWeight: '900', color: COLORS.black.dark }}>
                Amount of Content Added by User
            </Typography>
            <Grid container spacing={2} mt={2}>

                {Array.from({ length: 17 }).map(() => (
                    <Grid component={Stack}
                        size={{ md: 2, sm: 4, xs: 6 }}
                        sx={{
                            bgcolor: COLORS.white.main,
                            p: 2,
                            borderRadius: '12px',
                            height: { md: "172px", xs: '152px' },
                            gap: 2,
                        }}
                    >
                        <Typography variant='body2' sx={{ color: COLORS.black.darkGray, fontWeight: 600 }}>
                            Total Content Added
                        </Typography>
                        <Typography variant='body1' sx={{ fontWeight: 800, fontSize: '24px' }}>
                            500
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default AmountOfContentAddedUser
