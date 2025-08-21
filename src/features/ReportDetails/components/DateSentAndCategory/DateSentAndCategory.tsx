import { Box, Grid, Stack, Typography } from "@mui/material"
import { DATA_SENT } from "constant";
import { COLORS } from "constant/color"



interface CardType {
    categoryTitle: string;
    title: string
}


const CustomDateSentAndCategory = ({ categoryTitle, title }: CardType) => {
    return (


        <Stack gap={'16px'}>
            <Typography sx={{ fontSize: '11px', fontWeight: 500 }}>
                {categoryTitle}
            </Typography>
            <Box sx={{
                maxWidth: '350px',
                bgcolor: COLORS.gray.lighter,
                height: '60px',
                borderRadius: '36px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography sx={{ color: COLORS.black.main, fontWeight: 500, paddingLeft: '24px' }}>
                    {title}
                </Typography>
            </Box>

        </Stack>
    )
}



const DateSentAndCategory = () => {
    return (
        <Grid container spacing={9}>
            {DATA_SENT.map((item, index) => (
                <Grid key={index} size={{ xs: 12, sm: 5 }} >
                    <CustomDateSentAndCategory categoryTitle={item.categoryTitle} title={item.title} />
                </Grid>
            ))}
        </Grid>
    )
}

export default DateSentAndCategory
