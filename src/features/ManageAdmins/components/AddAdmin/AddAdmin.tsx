import { Stack } from "@mui/material";
import { CustomPasswordField, CustomSelect, CustomTextField } from "components";
import { ADMIN_ROLE } from "constant";

interface AddAdminProps {
    mode?: "add" | "edit";
}

const AddAdmin = ({ mode = "add" }: AddAdminProps) => {
    return (
        <Stack spacing={2}>
            <CustomSelect
                name="role"
                label="Select Role"
                labelOutside={true}
                options={ADMIN_ROLE.map((item) => ({
                    label: item,
                    value: item,
                }))}
            />
            <CustomTextField
                name="firstName"
                placeholder="Admin First Name"
                type="text"
                width="100%"
            />
            <CustomTextField
                name="lastName"
                placeholder="Admin Last Name"
                type="text"
                width="100%"
            />
            <CustomTextField
                name="email"
                placeholder="Admin Email"
                type="email"
                width="100%"
            />

            {/* Only show password when adding */}
            {mode === "add" && (
                <CustomPasswordField
                    name="password"
                    placeholder="Admin Password"
                    width="100%"
                />
            )}
        </Stack>
    );
};

export default AddAdmin;
