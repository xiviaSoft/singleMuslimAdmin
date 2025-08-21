
import { Stack } from "@mui/material"
import { NewPasswordForm } from "features/Authentication/components"


const NewPasswordContainer = () => {
    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <NewPasswordForm />
        </Stack>
    )
}



export default NewPasswordContainer
