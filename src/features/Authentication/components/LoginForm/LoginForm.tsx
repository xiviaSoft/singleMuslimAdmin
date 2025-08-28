import { Typography } from "@mui/material"
import { CustomButton, CustomPasswordField, CustomTextField, FormWraper } from "components"
import { FormProvider, useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "libs"
import { ROUTES } from "constant"
import { useNavigate } from "react-router"
import { doc, setDoc } from "firebase/firestore"

interface loginType {
    email: string
    password: string
}

const LoginForm = () => {
    const navigate = useNavigate()
    const methods = useForm<loginType>()
    const { handleSubmit } = methods

    const onSubmit = async (data: loginType): Promise<void> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user

            await setDoc(doc(db, "admins", user.uid), {
                uid: user.uid,
                email: user.email,
                role: "admin",
                name: "New Admin",
                createdAt: new Date(),
            })

            console.log("User logged in:", user)
            navigate(ROUTES.ADMINS)
        } catch (error: any) {
            console.error("Login failed:", error.message)
        
        }
    }

    return (
        <FormWraper>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography sx={{ fontSize: "32px", fontWeight: 900, textAlign: "center" }}>
                        Login
                    </Typography>

                    <CustomTextField
                        type="email"
                        placeholder="Enter your email address"
                        name="email"
                        label="Email"
                        width="100%"
                    />

                    <CustomPasswordField
                        placeholder="Enter your password"
                        name="password"
                        label="Password"
                        width="100%"
                    />

                    <CustomButton type="submit" variant="contained" title="Login" fullWidth />
                </form>
            </FormProvider>
        </FormWraper>
    )
}

export default LoginForm
