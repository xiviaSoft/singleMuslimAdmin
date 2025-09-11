import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { User } from "collections";
import { ArrowBack, CustomButton, CustomPhoneNumberField, CustomRadio, CustomSelect, CustomTextField, PageHeader } from "components";
import { EDUCATION_LEVEL, GENDER, MARITAL_STATUS, ROUTES } from "constant";
import { COLORS } from "constant/color";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "libs";
import { FormData } from "types";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const ManangeAddUserContainer: React.FC = () => {
    const methods = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            const uid = userCredential.user.uid;


            const {
                password,
                companyName,
                companyaddress,
                companydescription,
                role,
                startDate,
                endDate,
                isCurrent,
                technicalSkills,
                softSkills,
                languages,
                facebook,
                twitter,
                linkedin,
                instagram,
                bio,
                highestDegree, institutionName, graduationYear, fieldOfStudy,
                ...rest
            } = data;

            // 2️⃣ Save to Firestore
            await setDoc(doc(db, "users", uid), {

                ...rest,
                uid,

                isActive: true,
                isSuspended: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                bio: bio || "",
                educationInformation: {
                    highestDegree: highestDegree || "",
                    institutionName: institutionName || "",
                    graduationYear: graduationYear || null,
                    fieldOfStudy: fieldOfStudy || "",
                },

                workExperience: {
                    companyName: companyName || "",
                    role: role || "",
                    startDate: startDate ? new Date(startDate) : null,
                    address: companyaddress || "",
                    endDate: isCurrent ? null : endDate ? new Date(endDate) : null,
                    isCurrent: isCurrent || false,
                    description: companydescription || "",
                },

                socialLinks: {
                    facebook: facebook || "",
                    twitter: twitter || "",
                    linkedin: linkedin || "",
                    instagram: instagram || "",
                },


                skills: {
                    technicalSkills: technicalSkills
                        ? (Array.isArray(technicalSkills)
                            ? technicalSkills
                            : technicalSkills.split(",").map((item: string) => item.trim()))
                        : [],

                    softSkills: softSkills
                        ? (Array.isArray(softSkills)
                            ? softSkills
                            : softSkills.split(",").map((item: string) => item.trim()))
                        : [],

                    languages: languages
                        ? (Array.isArray(languages)
                            ? languages
                            : languages.split(",").map((item: string) => item.trim()))
                        : [],
                },
            });

            alert("User signed up successfully!");
            methods.reset()
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <FormProvider {...methods}>
            <Stack
                component="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                sx={{ p: 2, gap: 3 }}
            >

                <Typography variant="h5" my={2} fontWeight={700} color={COLORS.primary.hardDark} fontSize={'30px'}>
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
                        <CustomTextField
                            placeholder='password'
                            name="password"
                            label="Password"
                            type="password"
                            rules={{ required: "Required" }}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomPhoneNumberField name="phoneNumber" defaultCountry="US" label="Phone number" />
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
                        <CustomSelect
                            name="gender"
                            label="Gender"
                            // labelOutside={true}

                            options={GENDER.map((item) => ({
                                label: item,
                                value: item,
                            }))}
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
                        <CustomTextField name="fieldOfStudy" label="Field Of Study " type="text" rules={{ required: "Required" }} placeholder='Field Of Study ' />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField name="highestDegree" label="Highest Degree" type="text" rules={{ required: "Required" }} placeholder='highest degree' />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField name="institutionName" label="Institution Name" type="text" rules={{ required: "Required" }} placeholder='Institution Name' />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField name="graduationYear" label="Graduation Year" type="text" rules={{ required: "Required" }} placeholder='Graduation Year' />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField name="technicalSkills" label="Technical Skills" type="text" rules={{ required: "Required" }} placeholder='Technical Skills' />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField name="softSkills" label="Soft Skills" type="text" rules={{ required: "Required" }} placeholder='Soft Skills' />
                    </Grid>

                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField name="languages" label="Languages" type="text" rules={{ required: "Required" }} placeholder='Languages' />
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
                    <Grid size={12}>
                        <CustomTextField
                            placeholder='Address'
                            name="address"
                            label="Address"
                            type="text"
                            rules={{ required: "Required" }}
                        />
                    </Grid>




                    {/* work experience */}

                    <Grid size={12}>
                        <Typography sx={{ fontSize: '20px', color: COLORS.primary.hardDark, fontWeight: 600 }}>
                            Work Experience
                        </Typography>
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="companyName"
                            label="Company Name"
                            type="text"
                            rules={{ required: "Required" }}
                            placeholder='company name'
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="role"
                            label="Role"
                            type="text"
                            rules={{ required: "Required" }}
                            placeholder='role'
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="companyaddress"
                            label="Company Address"
                            type="text"
                            rules={{ required: "Required" }}
                            placeholder='company address'
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="companydescription"
                            label="Compnay Description"
                            type="text"
                            // rules={{ required: "Required" }}
                            placeholder='company description'
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="startDate"
                            label="Start Date"
                            type="date"
                            rules={{ required: "Required" }}
                            placeholder='start date'
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="endDate"
                            label="End Date"
                            type="date"
                            placeholder='end date'
                        />
                    </Grid>
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <CustomTextField
                            name="isCurrent"
                            label="Currently Working"
                            type="text"
                            placeholder='Enter yes or no '
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
