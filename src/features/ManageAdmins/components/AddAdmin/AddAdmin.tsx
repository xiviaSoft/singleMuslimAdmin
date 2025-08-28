import { Stack } from "@mui/material";
import { CustomPasswordField, CustomSelect, CustomTextField } from "components";
import { FormProvider, useForm } from "react-hook-form"


const AddAdmin = () => {
  
    return (
        <Stack spacing={2}>

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
            <CustomTextField name="lastName" placeholder="Admin Last Name" type="text" width="100%" />
            <CustomTextField name="email" placeholder="Admin Email" type="email" width="100%" />
            <CustomPasswordField name="password" placeholder="Admin Password" width="100%" />

        </Stack>
    )
}

export default AddAdmin

const adminRole = [
    'Super Admin',
    'Admin',
]