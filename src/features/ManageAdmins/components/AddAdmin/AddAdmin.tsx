import { Stack } from "@mui/material";
import { CustomPasswordField, CustomSelect, CustomTextField } from "components";
import { FormProvider, useForm } from "react-hook-form"


const AddAdmin = () => {
    const methods = useForm();
    return (
        <Stack spacing={2}>
            <FormProvider {...methods}>
                <CustomSelect
                    name="role"
                    label="Select Role"
                    labelOutside={true}
                    options={adminRole.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                />
                <CustomTextField name="firstName" placeholder="Admin First Name" type="text" width="100%" />
                <CustomTextField name="lastName" placeholder="Admin Last Name" type="text" width="100%"/>
                <CustomTextField name="email" placeholder="Admin Email" type="email" width="100%"/>
                <CustomPasswordField name="password" placeholder="Admin Password"width="100%" />
            </FormProvider>
        </Stack>
    )
}

export default AddAdmin

const adminRole = [
    'Super Administrator',
    'Administrator',
]