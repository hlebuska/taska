import { Box, Button, Divider, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

export default function TopBar() {
    return (
        <Box
            className="TopBar"
            sx={{
                px: 2,
                width: '100%',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                bgcolor: 'white',
                zIndex: 100,
                borderBottom: '1px solid #E0E0E0',
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ margin: 0, color: 'primary.main' }}>
                Taska
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" startIcon={<PersonIcon />}>
                    Account
                </Button>
                <Button variant="outlined" startIcon={<SettingsIcon />}>
                    Settings
                </Button>
            </Box>
        </Box>
    );
}
