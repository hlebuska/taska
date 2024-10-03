import { Box, ListItemButton, List, ListItem, ListItemText } from '@mui/material';

export default function SideBar() {
    return (
        <Box
            sx={{
                maxWidth: 220,
                width: '14%',
                bgcolor: 'background.paper',
                borderRight: '1px solid #E0E0E0',
                position: 'fixed',
                zIndex: 100,
                height: '100vh',
                top: '56px',
            }}
        >
            <nav aria-label="main mailbox folders">
                <List sx={{ p: 0 }}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ bgcolor: '#ebf5ff' }}>
                            {/* <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon> */}
                            <ListItemText primary="Inbox" sx={{ color: 'primary.main' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            {/* <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon> */}
                            <ListItemText primary="Drafts" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}
