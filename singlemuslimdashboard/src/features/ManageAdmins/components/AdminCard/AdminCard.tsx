import { Dangerous, } from "@mui/icons-material";
import {
    Box,
    Stack,
    Typography,

} from "@mui/material";
import { useState } from "react";
import { COLORS } from "constant/color";
import { CustomDialogBox, MoreVertMenu } from "components";

const AdminCard = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const menuItems = [
        { label: "Edit", action: () => setShowEdit(true) },
        { label: "Delete", action: () => setShowDelete(true) },
    ];



    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <Stack
                    key={index}
                    sx={{
                        height: "301px",
                        width: { md: '190px', sm: '45%', xs: '98%' },
                        padding: "30px 10px",
                        boxShadow:
                            "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
                        borderRadius: "12px",
                        alignItems: "center",
                        gap: "24px",
                    }}
                >
                    <Stack direction={"column"} sx={{ width: "100%", alignItems: "center" }}>
                        <Box sx={{ display: 'flex', alignSelf: 'end' }}>
                            <MoreVertMenu items={menuItems} />
                        </Box>

                        <Box
                            component={"img"}
                            src="/assets/images/adminProfile.png"
                            sx={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                    </Stack>
                    <Box>
                        <Typography sx={{ fontSize: "18px", fontWeight: "800" }}>
                            Annie Miliana
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: COLORS.black.darkGray }}
                        >
                            Super Administrator
                        </Typography>
                    </Box>
                    <Typography variant="body2">sahar@chopdawg.com</Typography>
                </Stack>
            ))}
            <CustomDialogBox
                open={showDelete}
                title="Delete Admin"
                onClose={() => setShowDelete(false)}
                onConfirm={() => { setShowDelete(false); }}
                confirmText="Yes, I confirm"
                icon={<Dangerous />}
            >
                Are you sure you want to delete the admin “Jack Sparrow”? Actions are not reversable. Their comments and uploads to the project will remain.
            </CustomDialogBox>
            <CustomDialogBox
                open={showEdit}
                title="Edit Admin"
                onClose={() => setShowEdit(false)}
                onConfirm={() => { setShowEdit(false); }}
                confirmText="Update Admin"
                icon={<Dangerous />}
            >
                Are you sure you want to delete the admin “Jack Sparrow”? Actions are not reversable. Their comments and uploads to the project will remain.
            </CustomDialogBox>
        </>
    );
};

export default AdminCard;
