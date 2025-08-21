import { KeyboardArrowLeftRounded } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { COLORS } from 'constant/color'
// import { ROUTES } from 'constant'

import { useNavigate } from 'react-router'
type ArrowBackProps = {
    title: string
}
const ArrowBack = ({ title }: ArrowBackProps) => {
    const navigate = useNavigate()
    return (

        <Stack direction="row" alignItems="center" spacing={1}  padding={'48px 0 24px'}>
            <KeyboardArrowLeftRounded
                onClick={() => navigate(-1)}

                sx={{ height: 44, width: 44, cursor: 'pointer' }}
            />
            <Typography sx={{fontSize:'28px',fontWeight:'700',color:COLORS.black.dark}} >{title}</Typography>
        </Stack>

    )
}

export default ArrowBack
