import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../pages/App.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import GameSelection from "../pages/GameSelection.tsx";
import GameLayout from "../layout/templates/game";
import Game from "../pages/Game.tsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/games" element={<GameLayout />}>
                    <Route path="selection" element={<GameSelection />} />
                    <Route path="game/:operator" element={<Game />} />

                </Route>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/game" element={<GameSelection />} />

                GameSelection
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes
