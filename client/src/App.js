import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"; // eslint-disable-line
import HomePage from "Scenes/homePage";
import LoginPage from "Scenes/loginPage";
import ProfilePage from "Scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux"; // to select or grab the resources that are in that reducer
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    // Temp from orgin
    const isAuth = Boolean(useSelector((state) => state.token));


    return <div className='app'>
        <BrowserRouter> {/*for routes handling*/}
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/*to reset css to basic styling*/}
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to='/' />} />
                    <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    </div>;
}

export default App;