import { KeyboardArrowLeftRounded } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
// import { ROUTES } from 'constant'

import { useNavigate } from 'react-router'
type ArrowBackProps = {
    title: string
}
const ArrowBack = ({ title }: ArrowBackProps) => {
    const navigate = useNavigate()
    return (

        <Stack direction="row" alignItems="center" spacing={1} mb={3} mt={2}>
            <KeyboardArrowLeftRounded
                onClick={() => navigate(-1)}

                sx={{ height: 24, width: 24, cursor: 'pointer' }}
            />
            <Typography >{title}</Typography>
        </Stack>

    )
}

export default ArrowBack
