
import { ROUTES } from "constant"
import { Route, Routes as ReactRoutes } from "react-router"
import { AddUser, Admins, Analytics, Login, NewPassword, ReportDetails, SafetyReport, Settings, TwoFactor, UserProfile, Users } from "screens"



const Routes = () => {
    return (
        <ReactRoutes>
            <Route path={ROUTES.ADMINS} element={<Admins />} />
            <Route path={ROUTES.USERS} element={<Users />} />
            <Route path={ROUTES.ADD_USER} element={<AddUser />} />
            <Route path={`${ROUTES.USERS_Profile}/:id`} element={<UserProfile />} />
            <Route path={ROUTES.SAFETY_REPORT} element={<SafetyReport />} />
            <Route path={`${ROUTES.SAFETY_DETAILS}/:id`} element={<ReportDetails />} />
            <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.TWO_FACTOR} element={<TwoFactor />} />
            <Route path={ROUTES.NEW_PASSWORD} element={<NewPassword />} />

        </ReactRoutes>
    )
}

export default Routes
