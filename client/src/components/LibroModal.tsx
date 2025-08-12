import React from 'react';
import { Modal, Box, Typography, Button, Fade, Backdrop } from '@mui/material';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    maxWidth: '95%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    overflowY: 'auto',
};

interface LibroModalProps {
    open: boolean;
    onClose: () => void;
    libro: {
        titulo: string;
        autor: string;
        descripcion?: string;
        imagen: string;
        link?: string;
    } | null;
}

const LibroModal: React.FC<LibroModalProps> = ({ open, onClose, libro }) => {
    if (!libro) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
                        <Box flexShrink={0}>
                            <img
                                src={libro.imagen}
                                alt={`Portada de ${libro.titulo}`}
                                style={{
                                    maxWidth: '150px',
                                    height: 'auto',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {libro.titulo}
                            </Typography>

                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Autor: {libro.autor}
                            </Typography>

                            {libro.descripcion && (
                                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                                    {libro.descripcion}
                                </Typography>
                            )}

                            <Box display="flex" gap={2} mt={3}>
                                <Button
                                    variant="outlined"
                                    onClick={onClose}
                                    sx={{ flexGrow: { xs: 1, sm: 0 } }}
                                >
                                    Cerrar
                                </Button>

                                {libro.link && (
                                    <Button
                                        variant="contained"
                                        href={libro.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ flexGrow: { xs: 1, sm: 0 } }}
                                    >
                                        Ver más
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default LibroModal;