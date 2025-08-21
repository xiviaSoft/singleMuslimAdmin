import { Container, Stack, Typography } from "@mui/material"
import { CustomButton, CustomPhoneNumberField, } from "components"
import { COLORS } from "constant/color"
import { FormProvider, useForm } from "react-hook-form"

const PhoneNumberTab = () => {
    const methods = useForm()
    return (
        <Stack spacing={2} sx={{ maxWidth:'440px',mx:'auto' }}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => console.log(data))}>


                    <Typography sx={{ fontWeight: 500, color: COLORS.gray.main, mb: 3 }}>
                        * If you require a new phone number for Two Factor Authentication to CollabMind Admin panel, please update your number below.
                    </Typography>
                    <CustomPhoneNumberField name="phoneNumber" />
                    <CustomButton variant="contained" title="update" fullWidth type="submit" />
                </form>
            </FormProvider>

        </Stack>
    )
}

export default PhoneNumberTab
