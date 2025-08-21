
import { Box, Container, Typography } from '@mui/material';
import { CustomButton, CustomTextField } from 'components';
import { COLORS } from 'constant/color';
import { FormProvider, useForm } from 'react-hook-form';

const EmailTab = () => {
    const methods = useForm();
    return (
        <Box sx={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' ,m:'auto'}}>
            <FormProvider  {...methods}>
                <Typography sx={{fontWeight:500,color:COLORS.gray.main}}>
                    * If you require a new login to CollabMind Admin panel, please update the email address below.
                </Typography>
                <CustomTextField name='email' placeholder='' type='email' width='100%' label='Email' />
                <CustomButton variant='contained' title='Update' fullWidth />
            </FormProvider>
        </Box>
    )
}

export default EmailTab
