import { Box } from '@mui/material';

export default function Calendar() {
    return (
        <Box
            sx={{
                borderRight: '1px solid #E0E0E0',
                p: 2,
                position: 'fixed',
                top: '56px',
                height: 'calc(100vh - 56px)',
                right: 0,
                width: '40%',
                borderLeft: '1px solid #E0E0E0',
            }}
        >
            MY CALENDAR
        </Box>
    );
}
