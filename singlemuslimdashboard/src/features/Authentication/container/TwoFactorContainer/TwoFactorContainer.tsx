import { Stack } from "@mui/material"
import { TwoFactorForm } from "features/Authentication/components"


const TwoFactorContainer = () => {
    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center',width:'100%',height:'100vh' }}>
            <TwoFactorForm />
        </Stack>
    )
}

export default TwoFactorContainer
