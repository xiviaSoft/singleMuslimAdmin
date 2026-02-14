import { Add, KeyboardArrowDown } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { CustomButton, PageHeader, CustomPagination, CustomSort } from "components";
import { UserTable, UserTabs } from "features/ManageUsers/components";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ROUTES } from "constant";
import { useState } from "react";

const ManageUsersContainer = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("Active Users");
    // const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("Name (A–Z)");
    const pageSize = 5;

    const handleUserPage = () => navigate(ROUTES.ADD_USER);

    return (
        <FormProvider {...methods}>
            <Stack gap={2}>
                <PageHeader title="Manage Users" />
                <UserTabs value={selectedTab} onChange={setSelectedTab} />

                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <CustomButton
                        variant="contained"
                        title="Add User"
                        onClick={handleUserPage}
                        endIcon={<Add />}
                    />
                    <CustomSort
                        value={sortBy}
                        onChange={setSortBy}
                        options={["Name (A–Z)", "Name (Z–A)", "Newest"]}
                    />
                </Stack>

                {/* Pass pagination + sorting props down */}
                <UserTable
                    filterType={selectedTab}
                    // page={page}
                    sortBy={sortBy}
                    pageSize={pageSize}
                />

                {/* <CustomPagination
                    page={page}
                    count={2} // can be dynamic if you calculate total users
                    onChange={(_, value) => setPage(value)}
                /> */}
            </Stack>
        </FormProvider>
    );
};

export default ManageUsersContainer;
