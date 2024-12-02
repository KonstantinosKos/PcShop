import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ComputerIcon from '@mui/icons-material/Computer';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import HardwareIcon from '@mui/icons-material/Hardware';
import PrintIcon from '@mui/icons-material/Print';
import {useNavigate} from "react-router-dom";

export const Category = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const categories = [
        { name: 'PC Laptops', icon: <ComputerIcon fontSize="large" /> },
        { name: 'Gaming', icon: <KeyboardIcon fontSize="large" /> },
        { name: 'Mobile Tablets', icon: <TabletAndroidIcon fontSize="large" /> },
        { name: 'Image Sound', icon: <LiveTvIcon fontSize="large" /> },
        { name: 'Hardware', icon: <HardwareIcon fontSize="large" /> },
        { name: 'Printers', icon: <PrintIcon fontSize="large" /> },
    ];

    const handleCategory = (category) => {
        navigate(`/category/${category}`);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: theme.spacing(4),
                padding: theme.spacing(4),
            }}
        >
            {categories.map((category) => (
                <Box
                    key={category.name}
                    sx={{
                        width: 200,
                        height: 210,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: theme.spacing(1),
                        boxShadow: theme.shadows[3],
                        cursor: 'pointer',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: theme.shadows[6],
                        },
                    }}
                    onClick={() => handleCategory(`${category.name}`)}
                >
                    <Box
                        sx={{
                            color: theme.palette.primary.main,
                            marginBottom: theme.spacing(1),
                        }}
                    >
                        {category.icon}
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {category.name}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};
