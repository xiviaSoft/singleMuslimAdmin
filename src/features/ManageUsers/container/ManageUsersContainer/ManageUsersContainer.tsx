import { Add, KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { CustomButton, PageHeader } from "components";
import { UserTable, UserTabs } from "features/ManageUsers/components";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTES } from "constant";

const ManageUsersContainer = () => {

    const methods = useForm();
    const navigate = useNavigate()
    const handleUserPage = () => {
        navigate(ROUTES.ADD_USER)
    }
    return (
        <FormProvider {...methods}>
            <Stack gap={2}>
                <PageHeader title="Manage Users" />
                <UserTabs />

                {/* Top Actions */}
                <Stack direction={"row"} sx={{ justifyContent: "end", gap: "10px" }}>
                    <Box sx={{ display: "flex", mr: "auto" }}>
                        <CustomButton
                            variant="contained"
                            title="Add User"
                            onClick={handleUserPage}
                            endIcon={<Add />}
                        />
                    </Box>
                    <CustomButton
                        variant="outlined"
                        title="Filter"
                        endIcon={<Tune />}
                    />
                    <CustomButton variant="contained" title="Sort By" endIcon={<KeyboardArrowDown />} />
                </Stack>



                <UserTable />
            </Stack>
        </FormProvider>
    );
};

export default ManageUsersContainer;
