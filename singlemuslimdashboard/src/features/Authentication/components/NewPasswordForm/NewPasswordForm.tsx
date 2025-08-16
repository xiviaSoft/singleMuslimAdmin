import { Typography } from "@mui/material"
import { CustomButton, CustomPasswordField, FormWraper, PasswordCriteriaList } from "components"
import { FormProvider, useForm, useWatch } from "react-hook-form"


const NewPasswordForm = () => {
    const methods = useForm()
    const passwords = useWatch({ control: methods.control, name: "NewPassword", defaultValue: "" });
    return (
        <FormWraper>
            <FormProvider {...methods}>

                <Typography sx={{ fontSize: '32px', fontWeight: 900, textAlign: 'center' }}>Create Password

                </Typography>
                <Typography variant='body2' sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    You are using a temporary password, please create a permanent password below.


                </Typography>
                <CustomPasswordField name="newPassword" label="New password" placeholder="password" width="100%" />
                <CustomPasswordField name="confirmPassword" label="Re-enter new password" placeholder="password" width="100%" />
                <PasswordCriteriaList password={passwords} />

                <CustomButton variant="contained" type="submit" title="Save Password" />
            </FormProvider>
        </FormWraper>
    )
}

export default NewPasswordForm
