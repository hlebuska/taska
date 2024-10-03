import { AppBar, Box, Divider, Grid, Paper, Typography } from '@mui/material';
import ToDoTask from '../ToDoTask/ToDoTask';

export default function Main() {
    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '56px',
                marginLeft: '14%',
                height: '100%',
                width: '46%',
            }}
        >
            {/* Top Navigation */}
            <AppBar position="static" color="transparent" elevation={0} sx={{ marginBottom: 2, height: '12%', p: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Project Name
                </Typography>
            </AppBar>
            <Divider></Divider>
            {/* Tasks */}
            <Box
                sx={{
                    borderRight: '1px solid #E0E0E0',
                    p: 2,
                    bgcolor: '#eeeeee',
                    height: '100%',
                }}
            >
                <Grid container spacing={2} sx={{ p: 1 }}>
                    <Grid item xs={6}>
                        <ToDoTask />
                        <ToDoTask />
                    </Grid>
                    <Grid item xs={6}>
                        <ToDoTask />
                        <ToDoTask />
                        <ToDoTask />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
