'use client';

import './index.scss';
import Main from './Components/Main/Main';
import TopBar from './Components/TopBar/TopBar';
import SideBar from './Components/SideBar/SideBar';
import { Box } from '@mui/material';

export default function Home() {
    return (
        <Box sx={{ height: '100vh', widhth: '100vw' }}>
            <TopBar />;{/* <SideBar /> */}
            <Main />
        </Box>
    );
}
