
import { ROUTES } from "constant"
import { Route, Routes as ReactRoutes } from "react-router"
import { Admins, Login, NewPassword, ReportDetails, SafetyReport, Settings, TwoFactor, Users } from "screens"



const Routes = () => {
    return (
        <ReactRoutes>
            <Route path={ROUTES.ADMINS} element={<Admins />} />
            <Route path={ROUTES.USERS} element={<Users />} />
            <Route path={ROUTES.SAFETY_REPORT} element={<SafetyReport />} />
            <Route path={ROUTES.SAFETY_DETAILS} element={<ReportDetails />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.TWO_FACTOR} element={<TwoFactor />} />
            <Route path={ROUTES.NEW_PASSWORD} element={<NewPassword />} />

        </ReactRoutes>
    )
}

export default Routes
