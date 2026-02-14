import { useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { COLORS } from "constant/color";
import { Logout, } from "@mui/icons-material";

import CustomDialogBox from "components/CustomDialogBox/CustomDialogBox";
import MoreVertMenu from "components/MoreVertMenu/MoreVertMenu";

import { useNavigate } from "react-router";
import { ROUTES } from "constant";
import { useAuth } from "context/AuthContext";


const UserCard = () => {
  const { logout } = useAuth()
  const [showLogout, setShowLogout] = useState(false);
  const naviagte = useNavigate()

  const { user } = useAuth()

  const handleLogout = () => {

    logout()
    naviagte(ROUTES.LOGIN)
    setShowLogout(false);
  };



  const menuItems = [
    { label: "Logout", action: () => setShowLogout(true) },
  ];

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar sx={{ width: 50, height: 50 }} />

      <Stack flexGrow={1}>
        <Typography sx={{ fontWeight: 500, fontSize: "18px", color: COLORS.primary.hard }}>

          {user?.firstName} <span style={{ textTransform: 'lowercase' }}>
            {user?.lastName}
          </span>
        </Typography>
        <Typography variant="body2" color={COLORS.primary.hard}>
          {user?.role}
        </Typography>
      </Stack>

      <MoreVertMenu items={menuItems} />


      {showLogout && (
        <CustomDialogBox
          open={showLogout}
          title="Log out?"
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogout}
          confirmText="Yes, Logout"
          icon={<Logout />}
        >
          Are you sure you want to log out?
        </CustomDialogBox>
      )}


    </Stack>
  );
};

export default UserCard;
