import { Stack } from "@mui/material"

import { LoginForm } from "features/Authentication/components"



const LoginContainer = () => {
  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <LoginForm />
    </Stack>
  )
}

export default LoginContainer
