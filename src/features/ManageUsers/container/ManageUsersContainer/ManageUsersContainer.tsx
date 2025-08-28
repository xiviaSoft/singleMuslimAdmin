import { Add, KeyboardArrowDown, Tune } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { CustomButton, CustomDialogBox, MoreVertMenu, PageHeader } from "components";

import { UserDetailTab, UserTable, UserTabs } from "features/ManageUsers/components";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "libs";
import { useNavigate } from "react-router";
import { ROUTES } from "constant";



const ManageUsersContainer = () => {
    const [edit, setEdit] = useState(false);
    // const [addUser, setAddUser] = useState(false);

    const methods = useForm();
    const navigate = useNavigate()



    const handleEdit = () => {
        console.log("User edit");
        setEdit(false);
    };

    // ✅ Save user data in Firestore
    // const handleUserAdd = async (data: any) => {
    //     console.log("New User Data:", data);

    //     // clean undefined values
    //     const cleanData = (obj: any) =>
    //         Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

    //     try {
    //         // generate a userId ( later you can replace this with Firebase Auth UID)
    //         const userId = auth.currentUser?.uid;
    //         if (!userId) {
    //             throw new Error("No authenticated user found");
    //         }




    //         // --- Personal Detail section ---
    //         const personalData = cleanData({
    //             // Basic info
    //             height: data.Height,
    //             build: data.MyBuild,
    //             hairColor: data.MyHairColour,
    //             eyeColor: data.ColourOfMyEyes,
    //             maritalStatus: data.MaritalStatus,
    //             relocate: data.relocate,
    //             lookingToMarry: data.LookingToMarry,

    //             // Location
    //             city: data.city,
    //             state: data.STATE,
    //             country: data.country,

    //             // Languages
    //             firstLanguage: data.MyFirstLanguage,
    //             secondLanguage: data.MySecondLanguage,

    //             // Education
    //             educationLevel: data.EducationLevel,
    //             subject: data.mySubject,

    //             // Lifestyle
    //             livingArrangements: data.MyLivingArrangements,
    //             doISmoke: data.DoISmoke,
    //             doIHaveChildren: data.DoIHaveChildrens,
    //             likeToHaveChildren: data.liketoHaveChildren,

    //             // Financial
    //             income: data.MyIncome,

    //             // Health
    //             disabilities: data.DoIHaveAnyDisabilities,

    //             // Religion
    //             religion: data.Religiousness,
    //             sect: data.MySect,
    //         });


    //         await setDoc(doc(db, "users", userId), personalData);

    //         console.log(" User saved successfully with ID:", userId);

    //         setAddUser(false);
    //     } catch (error) {
    //         console.error(" Error saving user:", error);
    //     }
    // };
    const handleUserPage = () => {
        navigate(ROUTES.ADD_USER)
    }

    const menuItems = [
        { label: "Edit", action: () => setEdit(true) },
        { label: "Delete", action: () => setEdit(true) },
    ];

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

                    <MoreVertMenu
                        items={menuItems}
                        icon={
                            <CustomButton
                                variant="outlined"
                                title="Filter"
                                endIcon={<Tune />}
                            />
                        }
                    />
                    <CustomButton variant="contained" title="Sort By" endIcon={<KeyboardArrowDown />} />
                </Stack>

                {/* Edit Dialog */}
                <CustomDialogBox
                    open={edit}
                    title="Edit your detail ?"
                    onClose={() => setEdit(false)}
                    onConfirm={handleEdit}
                    confirmText="Yes, Edit"
                >
                    <UserDetailTab />
                </CustomDialogBox>

                {/* Add User Dialog */}
                {/* <CustomDialogBox
                    open={addUser}
                    title="Add New User"
                    onClose={() => setAddUser(false)}
                    onConfirm={handleUserPage}
                    confirmText="Yes, Add"
                >
                    <UserDetailTab />
                </CustomDialogBox> */}

                {/* User Table */}
                <UserTable icon={<MoreVertMenu items={menuItems} />} />
            </Stack>
        </FormProvider>
    );
};

export default ManageUsersContainer;
