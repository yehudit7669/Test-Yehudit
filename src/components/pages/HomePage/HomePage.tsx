import React, { useEffect, useState } from "react";
import { getUsers } from "../../../services/User/userApis";
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import UserPosts from "../UserPosts/UserPosts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface User {
    id: number;
    name: string;
    email: string;
    companyName: string;
}

function HomePage() {
    const tableTitle = ['name', 'email', 'companyName'];
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        //fetch the data of the users
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getUsers();
                const simplifiedUsers = res.data.map((user: any) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    companyName: user.company?.name || ""
                }));
                setUsers(simplifiedUsers);
            } catch (error: any) {
                console.error("Error fetching users:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleCloseUserPosts = () => {
        setSelectedUser(null);
    };

    return (
        <>
        <h1 style={{marginTop:'5%'}}>Users List</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <TextField
                        label="Filter by Name or Email"
                        variant="outlined"
                        margin="normal"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <TableContainer component={Paper} className="tableContainerQuotes">
                        <Table
                            stickyHeader
                            sx={{ minWidth: 360, maxHeight:'40%' }}
                            size="small"
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    {tableTitle.map((title) => (
                                        <TableCell  sx={{fontWeight:'bold'}} align="center" key={title}>{title}</TableCell>
                                    ))}
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {/* Displaying the data with the filter check */}
                                {users
                                    .filter(user =>
                                        user.name.toLowerCase().includes(filter.toLowerCase()) ||
                                        user.email.toLowerCase().includes(filter.toLowerCase())
                                    )
                                    .map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" onClick={() => handleUserSelect(user)}>{user.name}</TableCell>
                                            <TableCell align="center">{user.email}</TableCell>
                                            <TableCell align="center">{user.companyName}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        {/* A loading indicator while fetching data from the API. */}
                        {loading && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        )}
                    </TableContainer>
                </div>
                {/* display the posted of the selected user */}
                {selectedUser && (
                    <div style={{ flex: 1, marginLeft: '20px' }}>
                        <UserPosts userId={selectedUser.id} onClose={handleCloseUserPosts} />
                    </div>
                )}

            </div>
        </>
    );
}

export default HomePage;