import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
    Box,
    Typography,
    Divider,
    Grid,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,

} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    CustomButton,
    CustomPhoneNumberField,
    CustomSelect,
    CustomTextField,
    MultipulCustomSelect,
} from "components";
import { GENDER, MARITAL_STATUS, LANGUAGES, SoftSkills, TechnicalSkills } from "constant";
import { COLORS } from "constant/color";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "libs";
import { FormData } from "types";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useToast } from "context";
import { useCreateUser } from "features/ManageUsers/hooks";

const Section = ({ title }: { title: string }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
        </Typography>
        <Divider />
    </Box>
);

const ManangeAddUserContainer: React.FC = () => {
    const methods = useForm<FormData>();
    const [disableWork, setDisableWork] = useState(false);
    const [disableSocial, setDisableSocial] = useState(false);
    const { showToast } = useToast()
    const { reset } = methods


    const createUserMutation = useCreateUser(showToast);
    const onSubmit = (data: FormData) => {
        createUserMutation.mutate(data, {
            onSuccess: () => {
                reset(); 
            },
        });
    };

    return (
        <FormProvider {...methods}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 900,
                    mx: "auto",
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: COLORS.white.thin,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Add New User
                </Typography>

                <Box
                    component="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    {/* Personal Details */}
                    <Section title="Personal Details" />
                    <Grid container spacing={2}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="firstName" label="First Name" type="text" placeholder="Enter first name" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="lastName" label="Last Name" type="text" placeholder="Enter last name" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="email" label="Email" type="email" placeholder="Enter email" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="password" label="Password" type="password" placeholder="Enter password" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomPhoneNumberField name="phoneNumber" defaultCountry="US" label="Phone number" placeholder="Enter phone number" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="dateOfBirth" label="Date of Birth" type="date" placeholder="Select date of birth" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomSelect
                                name="gender"
                                label="Gender"
                                options={GENDER.map((g) => ({ label: g, value: g }))}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomSelect
                                name="maritalStatus"
                                label="Marital Status"
                                options={MARITAL_STATUS.map((m) => ({ label: m, value: m }))}
                            />
                        </Grid>
                        <Grid size={12}>
                            <CustomTextField name="address" label="Address" type="text" placeholder="Enter address" multiline minRows={2} />
                        </Grid>
                        <Grid size={12}>
                            <CustomTextField name="bio" label="Bio" type="text" placeholder="Write a short bio" multiline minRows={2} />
                        </Grid>
                    </Grid>

                    {/* Education */}
                    <Section title="Education" />
                    <Grid container spacing={2}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="institutionName" label="Institution Name" type="text" placeholder="Enter institution name" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="highestDegree" label="Highest Degree" type="text" placeholder="Enter highest degree" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="fieldOfStudy" label="Field of Study" type="text" placeholder="Enter field of study" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="graduationYear" label="Graduation Year" type="text" placeholder="Enter graduation year" />
                        </Grid>
                    </Grid>

                    {/* Skills */}
                    <Section title="Skills" />
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <MultipulCustomSelect name="languages" label="Languages" options={LANGUAGES.map((l) => ({ label: l, value: l }))} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <MultipulCustomSelect name="softSkills" label="Soft Skills" options={SoftSkills.map((s) => ({ label: s, value: s }))} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <MultipulCustomSelect name="technicalSkills" label="Technical Skills" options={TechnicalSkills.map((t) => ({ label: t, value: t }))} />
                        </Grid>
                    </Grid>

                    {/* Work Experience */}
                    <Accordion defaultExpanded sx={{ backgroundColor: COLORS.white.thin }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Section title="Work Experience" />
                            <FormControlLabel
                                control={<Checkbox checked={disableWork} onChange={(e) => setDisableWork(e.target.checked)} />}
                                label="Disable"
                                onClick={(e) => e.stopPropagation()}
                                sx={{ ml: "auto" }}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="companyName" label="Company Name" placeholder="Enter company name" disabled={disableWork} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="role" label="Role" placeholder="Enter role" disabled={disableWork} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="companyaddress" label="Company Address" placeholder="Enter company address" disabled={disableWork} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="isCurrent" label="Currently Working" placeholder="Yes / No" disabled={disableWork} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField name="startDate" label="Start Date" type="date" placeholder="Select start date" disabled={disableWork} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField name="endDate" label="End Date" type="date" placeholder="Select end date" disabled={disableWork} />
                                </Grid>
                                <Grid size={12}>
                                    <CustomTextField name="companydescription" label="Description" multiline minRows={2} type="text" placeholder="Enter job description" disabled={disableWork} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    {/* Social Links */}
                    <Accordion defaultExpanded sx={{ backgroundColor: COLORS.white.thin }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Section title="Social Links" />
                            <FormControlLabel
                                control={<Checkbox checked={disableSocial} onChange={(e) => setDisableSocial(e.target.checked)} />}
                                label="Disable"
                                onClick={(e) => e.stopPropagation()}
                                sx={{ ml: "auto" }}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="facebook" label="Facebook" placeholder="Facebook profile URL" disabled={disableSocial} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="instagram" label="Instagram" placeholder="Instagram profile URL" disabled={disableSocial} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="linkedin" label="LinkedIn" placeholder="LinkedIn profile URL" disabled={disableSocial} />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField type="text" name="twitter" label="Twitter" placeholder="Twitter profile URL" disabled={disableSocial} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    {/* Submit Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <CustomButton title="Submit" type="submit" />
                    </Box>
                </Box>
            </Paper>
        </FormProvider>
    );
};

export default ManangeAddUserContainer;
