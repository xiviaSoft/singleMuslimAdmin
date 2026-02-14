import { Stack } from "@mui/material"
import { CustomPasswordField, CustomSelect, CustomTextField } from "components"
import { GENDER } from "constant"


const UserAccountInfo = () => {
    return (
        <Stack gap={'30px'}>
            <CustomTextField name="name" placeholder="Enter your full name" type="text" width="100%" />
            <CustomPasswordField name="password" placeholder="Enter your password" width="100%" />
            <CustomTextField name="email" placeholder="Enter your email" type="email" width="100%" />
            <CustomTextField name="age" placeholder="Enter your age" type="text" width="100%" />
            <CustomSelect name="gender"
                labelOutside
                label="Select the gender"
                options={GENDER.map((item) => ({
                    label: item,
                    value: item,
                }))} />
        </Stack>
    )
}

export default UserAccountInfo
