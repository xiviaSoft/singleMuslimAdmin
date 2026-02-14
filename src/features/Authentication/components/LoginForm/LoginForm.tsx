// ✅ LoginForm.tsx
import { Typography } from "@mui/material";
import {
    CustomButton,
    CustomPasswordField,
    CustomTextField,
    FormWraper,
} from "components";
import { FormProvider, useForm } from "react-hook-form";
import { ROUTES } from "constant";
import { useNavigate } from "react-router";

import { useAuth } from "context/AuthContext";


interface LoginType {
    email: string;
    password: string;
}

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth()
    const methods = useForm<LoginType>();
    const { handleSubmit } = methods;

    const onSubmit = async (data: LoginType): Promise<void> => {
        try {
            login(data)


            navigate(ROUTES.ADMINS);
        } catch (error: any) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <FormWraper>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                        sx={{
                            fontSize: "32px",
                            fontWeight: 900,
                            textAlign: "center",
                            mb: 2,
                        }}
                    >
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

                    <CustomButton
                        type="submit"
                        variant="contained"
                        title="Login"
                        fullWidth
                    />
                </form>
            </FormProvider>
        </FormWraper>
    );
};

export default LoginForm;
