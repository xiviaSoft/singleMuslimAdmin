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
    Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { CustomButton, CustomSelect, CustomTextField, MultipulCustomSelect } from "components";
import { COLORS, GenderTypes, LANGUAGES, MARITAL_STATUS, RELIGION_OPTIONS, Religions, SoftSkills, TechnicalSkills } from "constant";

import { useParams } from "react-router";
import useUpdateUser from "features/ManageUserProfile/hooks/useUpdateUser";
import { User } from "collections";
import useUser from "features/ManageUserProfile/hooks/useUser";
import { useToast } from "context";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "libs";


const Section = ({ title }: { title: string }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
        </Typography>
        <Divider sx={{}} />
    </Box>
);

const EditProfile = () => {
    const { showToast } = useToast()
    const { id: UserId } = useParams()
    const updateUser = useUpdateUser(UserId || "");
    const { data: user, isLoading } = useUser(UserId || "");
    const methods = useForm<User>({
        defaultValues: user ?? {},
    });


    const { handleSubmit, reset } = methods;


    const [disableWork, setDisableWork] = useState(false);
    const [disableSocial, setDisableSocial] = useState(false);


    const onSubmit = (data: User) => {
        if (!UserId) return;
        const cleanedData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );
        updateUser.mutate(cleanedData as Partial<User>);
        showToast("user updated successfully", "success");

    };
    const suspendUser = async () => {
        if (!UserId) return;

        try {
            const userRef = doc(db, "users", UserId);
            await updateDoc(userRef, {
                isSuspended: true,
                isActive:false
            });
            showToast("User suspended successfully", "warning");
        } catch (error) {
            console.error("Error suspending user:", error);
            showToast("Failed to suspend user", "error");
        }
    };
    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    if (isLoading) return <p>Loading...</p>;
    console.log(user, 'user')
    return (
        <FormProvider {...methods}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 900,
                    mx: "auto",
                    p: 4,
                    borderRadius: 3,
                    // backgroundColor: "#fafafa",
                    backgroundColor: COLORS.white.thin,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Edit Profile
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    {/* Personal Details */}
                    <Section title="Personal Details" />
                    <Grid container spacing={2}>
                        {/* --- Personal Info Fields (same as before) --- */}
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField
                                name="firstName"
                                label="First Name"
                                type="text"
                                placeholder="Enter first name"
                                rules={{ required: "First name is required" }}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField
                                name="lastName"
                                label="Last Name"
                                type="text"
                                placeholder="Enter last name"
                                rules={{ required: "Last name is required" }}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="email" label="Email" type="email" placeholder="enter you email" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField
                                name="phoneNumber"
                                label="Phone Number"
                                type="text"
                                placeholder="Enter phone number"
                                allowOnly="numeric"
                                maxLength={11}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomSelect
                                name="religion"
                                label="Religion"
                                options={Religions.map((item) => ({
                                    label: item,
                                    value: item,
                                }))}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomSelect
                                name="gender"
                                label="Gender"
                                options={GenderTypes.map((item) => ({
                                    label: item,
                                    value: item,
                                }))}
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField name="dateOfBirth" label="Date of Birth" type="date" placeholder="" />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomSelect
                                name="maritalStatus"
                                label="Marital Status"
                                options={MARITAL_STATUS.map((item) => ({
                                    label: item,
                                    value: item,
                                }))}
                            />
                        </Grid>
                        <Grid size={12}>
                            <CustomTextField
                                name="address"
                                label="Address"
                                type="text"
                                placeholder="Enter address"
                                multiline
                                minRows={2}
                            />
                        </Grid>
                        <Grid size={12}>
                            <CustomTextField
                                name="bio"
                                label="Bio"
                                type="text"
                                placeholder="Enter bio"
                                multiline
                                minRows={2}
                            />
                        </Grid>
                    </Grid>

                    {/* Education */}
                    <Section title="Education" />
                    <Grid container spacing={2}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField
                                name="educationInformation.institutionName"
                                label="Institution Name"
                                type="text"
                                placeholder="Enter your institution"
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField
                                name="educationInformation.highestDegree"
                                label="Highest Degree"
                                type="text"
                                placeholder="Enter your degree"
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField
                                name="educationInformation.fieldOfStudy"
                                label="Field of Study"
                                type="text"
                                placeholder="Enter field of study"
                            />
                        </Grid>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <CustomTextField
                                name="educationInformation.graduationYear"
                                label="Graduation Year"
                                type="text"
                                placeholder="Enter graduation year"
                            />
                        </Grid>
                    </Grid>

                    {/* Skills */}
                    <Section title="Skills" />
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 4 }} >
                            <MultipulCustomSelect
                                name="skills.languages"
                                label="Languages"

                                options={LANGUAGES.map((item) => ({ label: item, value: item }))}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} >
                            <MultipulCustomSelect
                                name="skills.softSkills"
                                label="Soft Skills"
                                options={SoftSkills.map((item) => ({ label: item, value: item }))}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} >
                            <MultipulCustomSelect
                                name="skills.technicalSkills"
                                label="Technical Skills"
                                options={TechnicalSkills.map((item) => ({ label: item, value: item }))}
                            />
                        </Grid>
                    </Grid>

                    {/* Work Experience (Accordion + Checkbox) */}
                    <Accordion defaultExpanded sx={{ backgroundColor: COLORS.white.thin, }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Section title="Work Experience" />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={disableWork}
                                        onChange={(e) => setDisableWork(e.target.checked)}
                                    />
                                }
                                label="Disable"
                                onClick={(e) => e.stopPropagation()}
                                sx={{ ml: 'auto' }}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="workExperience.companyName"
                                        label="Company Name"
                                        type="text"
                                        placeholder="Enter company name"
                                        disabled={disableWork}
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="workExperience.role"
                                        label="Role"
                                        type="text"
                                        placeholder="Enter role"
                                        disabled={disableWork}
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="workExperience.address"
                                        label="Company Address"
                                        type="text"
                                        placeholder="Enter address"
                                        disabled={disableWork}
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="workExperience.isCurrent"
                                        label="Currently Working"
                                        type="text"
                                        placeholder="Enter address"
                                        disabled={disableWork}
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="workExperience.startDate"
                                        label="Start Date"
                                        type="date"
                                        disabled={disableWork}
                                        placeholder=""
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="workExperience.endDate"
                                        label="End Date"
                                        type="date"
                                        disabled={disableWork}
                                        placeholder=""
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <CustomTextField
                                        name="workExperience.description"
                                        label="Description"
                                        type="text"
                                        placeholder="Enter description"
                                        multiline
                                        minRows={2}
                                        disabled={disableWork}

                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    {/* Social Links (Accordion + Checkbox) */}
                    <Accordion defaultExpanded sx={{ backgroundColor: COLORS.white.thin, }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Section title="Social Links" />
                            {/* <Section sx={{ flexGrow: 1 }}>Social Links</Section> */}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={disableSocial}
                                        onChange={(e) => setDisableSocial(e.target.checked)}

                                    />
                                }
                                label="Disable"
                                onClick={(e) => e.stopPropagation()}
                                sx={{ ml: 'auto' }}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="socialLinks.facebook"
                                        label="Facebook"
                                        type="text"
                                        placeholder="Facebook URL"
                                        disabled={disableSocial}
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="socialLinks.instagram"
                                        label="Instagram"
                                        type="text"
                                        placeholder="Instagram URL"
                                        disabled={disableSocial}
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="socialLinks.linkedin"
                                        label="LinkedIn"
                                        type="text"
                                        placeholder="LinkedIn URL"
                                        disabled={disableSocial}
                                    />
                                </Grid>
                                <Grid size={{ md: 6, xs: 12 }}>
                                    <CustomTextField
                                        name="socialLinks.twitter"
                                        label="Twitter"
                                        type="text"
                                        placeholder="Twitter URL"
                                        disabled={disableSocial}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Stack direction={'row'} gap={2}>
                            <CustomButton title="Suspend User" variant="outlined" onClick={suspendUser} />
                            <CustomButton title="Delete User" background={COLORS.error.dark} />
                            <CustomButton title="Update Profile" type="submit" />
                        </Stack>
                        {/* <Button type="submit" variant="contained">
                            Update Profile
                        </Button> */}

                    </Box>
                </Box>
            </Paper>

        </FormProvider>
    );
};


export default EditProfile;
