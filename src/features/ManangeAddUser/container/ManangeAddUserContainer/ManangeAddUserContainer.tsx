import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { User } from "collections";
import { CustomButton, CustomPhoneNumberField, CustomRadio, CustomSelect, CustomTextField } from "components";
import { EDUCATION_LEVEL, GENDER, MARITAL_STATUS } from "constant";
import { COLORS } from "constant/color";

const ManangeAddUserContainer: React.FC = () => {
    const methods = useForm<User>();

    const onSubmit = (data: User) => {
        console.log("Profile Data:", data);
    };

    return (
        <FormProvider {...methods}>
            <Stack
                component="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                sx={{ p: 2, gap: 3 }}
            >
                <Typography variant="h5" mb={2} fontWeight={700} color={COLORS.primary.hardDark}>
                    Add New User
                </Typography>

                {/* All in ONE grid container */}
                <Grid container spacing={3}>
                    {/* Section: Account Information */}
                    <Grid size={12}>
                        <Typography sx={{ fontSize: '20px', color: COLORS.primary.hardDark, fontWeight: 600 }}>
                            Account Information
                        </Typography>
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="firstName"
                            label="First Name"
                            type="text"
                            placeholder="Enter first name"
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="lastName"
                            label="Last Name"
                            type="text"
                            placeholder="Enter last name"
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                            rules={{ required: "Email is required" }}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomPhoneNumberField name="phoneNumber" label="Phone number" />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            placeholder="Enter you Date of birth"
                        />
                    </Grid>

                    {/* Section: Personal Information */}
                    <Grid size={12}>
                        <Typography sx={{ fontSize: '20px', color: COLORS.primary.hardDark, fontWeight: 600 }}>
                            Personal Information
                        </Typography>
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomRadio
                            label="Gender"
                            name="gender"
                            row
                            options={GENDER.map((item) => ({ label: item, value: item }))}
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomSelect
                            name="maritalStatus"
                            label="Marital Status"
                            labelOutside={true}
                            options={MARITAL_STATUS.map((item) => ({ label: item, value: item }))}
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="religion"
                            label="Religion"
                            type="text"
                            placeholder="Enter religion"
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="city"
                            label="City"
                            type="text"
                            placeholder="Enter city"
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="country"
                            label="Country"
                            type="text"
                            placeholder="Enter country"
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomSelect
                            name="educataion"
                            label="Education Level"
                            labelOutside={true}
                            options={EDUCATION_LEVEL.map((item) => ({ label: item, value: item }))}
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="institution"
                            label="Institution"
                            type="text"
                            placeholder="Enter institution"
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="skills"
                            label="Skills"
                            type="text"
                            placeholder="e.g. React, Firebase, TypeScript"
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="language"
                            label="Preferred Language"
                            type="text"
                            placeholder="Enter language"
                        />
                    </Grid>

                    {/* Section: Social Information */}
                    <Grid size={12}>
                        <Typography sx={{ fontSize: '20px', color: COLORS.primary.hardDark, fontWeight: 600 }}>
                            Social Information
                        </Typography>
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="facebook"
                            label="Facebook"
                            type="text"
                            placeholder="Facebook profile link"
                            showSearchIcon
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="linkedin"
                            label="LinkedIn"
                            type="text"
                            placeholder="LinkedIn profile link"
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="twitter"
                            label="Twitter"
                            type="text"
                            placeholder="Twitter profile link"
                        />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="instagram"
                            label="Instagram"
                            type="text"
                            placeholder="Instagram profile link"
                        />
                    </Grid>

                    <Grid size={12}>
                        <CustomTextField
                            name="bio"
                            label="Bio"
                            type="text"
                            placeholder="Write a short bio"
                            multiline={true}
                            maxLength={300}
                            width="100%"
                        />
                    </Grid>
                </Grid>

                {/* Submit Button */}
                <Box sx={{ mt: '20px', width: '200px', ml: 'auto' }}>
                    <CustomButton title="Submit" type="submit" variant="contained" fullWidth />
                </Box>
            </Stack>
        </FormProvider>
    );
};

export default ManangeAddUserContainer;
