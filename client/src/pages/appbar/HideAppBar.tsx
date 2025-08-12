import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';


interface Props {
    window?: () => Window;
    children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
}
const ButtonStyle = {
    backgroundColor: '#000',
    '&:hover': {
        backgroundColor: '#00BCD4',
    },
    borderRadius: '30px 35px',
    color: 'white',
    padding: '0.5rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
};


export default function HideAppBar(props: Props) {
    return (
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{ maxHeight: '3.8rem' }} >
                    <Toolbar sx={{ backgroundColor: '#fefefe ', display: 'flex', justifyContent: 'space-around' }}>
                        <Grid spacing={2} justifyContent="space-between">
                            <img src={'/sapiens.png'} alt="SAPIENS" style={{ width: '6rem' }} />
                        </Grid>
                        <Grid sx={{ display: 'flex', gap: 3 }}>
                            <Typography variant="h6" component="div" className='font-bold text-[#000] '>
                                Contactanos
                            </Typography>
                            <Link to="/login">
                                <Button sx={ButtonStyle}
                                    className="hover:transform hover:scale-102 transition duration-300 ease-in-out "

                                >
                                    Iniciar Sesion
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button sx={ButtonStyle}
                                    className="hover:transform hover:scale-102 transition duration-300 ease-in-out ">
                                    Registrarse
                                </Button>
                            </Link>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}
