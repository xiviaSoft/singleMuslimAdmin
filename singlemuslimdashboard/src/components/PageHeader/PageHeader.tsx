import { Add } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import CustomButton from "components/CustomButton/CustomButton";
import CustomTextField from "components/CustomTextField/CustomTextField";
import UserCard from "components/UserCard/UserCard";
import { FormProvider, useForm } from "react-hook-form";

interface PageHeaderProps {
    leftComponent?: "button" | "textfield";
    buttonTitle?: string;
    buttonIcon?: React.ReactNode;
    textFieldName?: string;
    textFieldPlaceholder?: string;
    title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
    leftComponent = "textfield",
    buttonTitle = "Add",
    buttonIcon = <Add />,
    textFieldName = "search",
    textFieldPlaceholder = "Search user",
    title = "Manage Users"
}) => {
    const method = useForm();

    return (
        <FormProvider {...method}>
            <Stack
                direction={"row"}
                gap={"20px"}
                sx={{
                    mt: 3,
                    justifyContent: { sm: "space-between", xs: "center" },
                    alignItems: "center",
                    flexWrap: "wrap",
                    mb: 3,
                }}
            >
                {leftComponent === "button" ? (
                    <CustomButton
                        title={buttonTitle}
                        variant="contained"
                        startIcon={buttonIcon}
                    />
                ) : (
                    <CustomTextField
                        name={textFieldName}
                        placeholder={textFieldPlaceholder}
                        type="text"
                        width="285px"
                        showSearchIcon={true}
                    />
                )}

                <Typography
                    sx={{ fontSize: "22px", fontWeight: "900" }}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                >
                    {title}
                </Typography>

                <UserCard />
            </Stack>
        </FormProvider>
    );
};

export default PageHeader;
