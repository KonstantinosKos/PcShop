import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import {useTheme} from '@mui/material/styles';

export const About = () => {
    const theme = useTheme();

    return (
        <Box sx={{padding: theme.spacing(4), textAlign: 'center'}}>
            <Typography variant="h3" gutterBottom sx={{fontWeight: 'bold', color: theme.palette.primary.main}}>
                About PcShop
            </Typography>

            <Typography variant="body1" sx={{marginBottom: theme.spacing(4), color: theme.palette.text.secondary}}>
                At PcShop, our mission is to make PC shopping and store management effortless and enjoyable.
                We bring together technology enthusiasts and retail managers to create an ecosystem that empowers both.
            </Typography>

            <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', marginTop: theme.spacing(4)}}>
                Meet the Team
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.spacing(2),
                }}
            >
                <Card sx={{maxWidth: 345, minWidth: 345,maxHeight: 180, minHeight: 180}}>
                    <CardMedia
                        image="/static/images"
                        title="Founder"
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Alex Johnson
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Founder & CEO<br/>
                            Alex is a tech visionary with a passion for simplifying the online shopping experience
                            for customers and administrators alike.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: 345, minWidth: 345,maxHeight: 180, minHeight: 180}}>
                    <CardMedia
                        image="/static/images"
                        title="Developer"
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Emma Wilson
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Lead Developer<br/>
                            Emma is the mastermind behind PcShop’s full-stack architecture, ensuring seamless
                            performance.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{maxWidth: 345, minWidth: 345,maxHeight: 180, minHeight: 180}}>
                    <CardMedia
                        image="/static/images/"
                        title="UX Designer"
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Michael Brown
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            UX Designer<br/>
                            Michael ensures the platform is intuitive and user-friendly, making every interaction a
                            delight.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <Box sx={{marginTop: theme.spacing(4)}}>
                <Typography variant="h6" sx={{fontStyle: 'italic', color: theme.palette.text.secondary}}>
                    "At PcShop, we don’t just sell PCs; we build a community where technology meets passion."
                </Typography>
            </Box>
        </Box>
    );
};
