import { Typography } from '@mui/material'
import { CustomButton, FormWraper } from 'components'



const TwoFactorForm = () => {
    return (
        <FormWraper>
            <Typography sx={{ fontSize: '24px', fontWeight: '32px', textAlign: 'center' }}>
                Two-Factor Authentication
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center', marginBottom: '20px' }}>
                Enter your phone number to allow Two-Factor
                Authentication
            </Typography>
            <CustomButton title='Send code' variant='contained' fullWidth type='submit' />
        </FormWraper>
    )
}

export default TwoFactorForm
