import { Stack } from '@mui/material'
import { COLORS } from 'constant/color'
import React from 'react'

const FormWraper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack sx={{ width: { md: '470px', sm: '35px', xs: '270px' }, p: { md: '64px', sm: '56px', xs: '30px' }, gap: 3, bgcolor: COLORS.black.transparent, borderRadius: '15px' }}>
            {children}
        </Stack>
    )
}

export default FormWraper
