import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../pages/App.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import GameSelection from "../pages/GameSelection.tsx";
import GameLayout from "../layout/templates/game";
import Game from "../pages/Game.tsx";
import GameWithLevel from "../pages/GameLevel.tsx";
import AuthLayout from "../layout/templates/auth";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import ResetPassword from "../pages/ResetPassword.tsx";
import ConfirmAccountTemplate from "../features/confirm-sign-up/templates";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/games" element={<GameLayout/>}>
                    <Route path="selection" element={<GameSelection/>}/>
                    <Route path="game/:operator" element={<GameWithLevel/>}/>
                    <Route path="game/:operator/:level" element={<Game/>}/>
                </Route>
                <Route path="/auth" element={<AuthLayout/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="forgot-password" element={<ForgotPassword/>}/>
                    <Route path="reset-password" element={<ResetPassword/>}/>
                    <Route path="confirm-sign-up" element={<ConfirmAccountTemplate/>}/>
                </Route>
                <Route path="/" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes
