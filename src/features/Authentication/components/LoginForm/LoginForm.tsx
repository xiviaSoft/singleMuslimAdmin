import { Box, Stack, Typography } from "@mui/material"
import { CustomButton, CustomPasswordField, CustomTextField, FormWraper } from "components"
import { COLORS } from "constant/color"
import { FormProvider, useForm } from "react-hook-form"


const LoginForm = () => {
    const methods = useForm()
    return (
        <FormWraper>
            <FormProvider {...methods}>

                <Typography sx={{ fontSize: '32px', fontWeight: 900, textAlign: 'center' }}>
                    Login
                </Typography>
                <CustomTextField type="email" placeholder="Enter you email address" name="email" label="Email" width="100%" />
                <CustomPasswordField placeholder="Enter you password" name="password"
                    label="Password" width="100%" />
                <CustomButton type="submit" variant="contained" title="Login" fullWidth />

            </FormProvider>
        </FormWraper>
    )
}

export default LoginForm
