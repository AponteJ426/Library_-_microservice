import React, { useState, useEffect, ReactNode } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Chip, Dialog, DialogTitle,
    DialogContent, DialogActions, Select, MenuItem, FormControl,
    InputLabel, Alert, Snackbar
} from '@mui/material';
import { fetcher } from '../../../../services/fetcher';

interface User {
    nombre: ReactNode;
    id: number;
    username: string;
    email: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
    isActive: boolean;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newRole, setNewRole] = useState<'USER' | 'ADMIN'>('USER');
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await fetcher('/admin/users', { method: 'GET' });
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeRole = (user: User) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setOpenDialog(true);
    };

    const confirmRoleChange = async () => {
        if (!selectedUser) return;

        try {
            await fetcher(`/admin/users/${selectedUser.id}/role`, {
                method: 'PUT',
                body: JSON.stringify({ role: newRole })
            });

            setUsers(users.map(user =>
                user.id === selectedUser.id ? { ...user, role: newRole } : user
            ));

            setAlert({ message: 'Rol actualizado exitosamente', severity: 'success' });
            setOpenDialog(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setAlert({ message: 'Error al actualizar el rol', severity: 'error' });
        }
    };

    const toggleUserStatus = async (userId: number, isActive: boolean) => {
        try {
            await fetcher(`/admin/users/${userId}/status`, {
                method: 'PUT',
                body: JSON.stringify({ isActive: !isActive })
            });

            setUsers(users.map(user =>
                user.id === userId ? { ...user, isActive: !isActive } : user
            ));

            setAlert({
                message: `Usuario ${!isActive ? 'activado' : 'desactivado'} exitosamente`,
                severity: 'success'
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setAlert({ message: 'Error al cambiar el estado del usuario', severity: 'error' });
        }
    };

    if (loading) {
        return (
            <Box className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
                <Typography variant="h6" className="text-gray-800">
                    Cargando usuarios...
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="p-6 bg-gray-100 min-h-screen">
            <Typography variant="h4" gutterBottom className="text-gray-800 font-semibold mb-6">
                Gestión de Usuarios
            </Typography>

            <TableContainer component={Paper} className="shadow rounded-lg">
                <Table>
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableCell className="font-bold text-gray-700">Usuario</TableCell>
                            <TableCell className="font-bold text-gray-700">Email</TableCell>
                            <TableCell className="font-bold text-gray-700">Rol</TableCell>
                            <TableCell className="font-bold text-gray-700">Estado</TableCell>
                            <TableCell className="font-bold text-gray-700">Fecha Registro</TableCell>
                            <TableCell className="font-bold text-gray-700">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50">
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={user.role === 'ADMIN' ? 'primary' : 'default'}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.isActive ? 'Activo' : 'Inactivo'}
                                        color={user.isActive ? 'success' : 'error'}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Box className="flex gap-2">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleChangeRole(user)}
                                        >
                                            Cambiar Rol
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color={user.isActive ? 'error' : 'success'}
                                            onClick={() => toggleUserStatus(user.id, user.isActive)}
                                        >
                                            {user.isActive ? 'Desactivar' : 'Activar'}
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Cambiar Rol de Usuario</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        ¿Cambiar el rol de <strong>{selectedUser?.username}</strong>?
                    </Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Nuevo Rol</InputLabel>
                        <Select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value as 'USER' | 'ADMIN')}
                        >
                            <MenuItem value="USER">Usuario</MenuItem>
                            <MenuItem value="ADMIN">Administrador</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={confirmRoleChange} variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!alert}
                autoHideDuration={6000}
                onClose={() => setAlert(null)}
            >
                <Alert severity={alert?.severity} onClose={() => setAlert(null)}>
                    {alert?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserManagement;
