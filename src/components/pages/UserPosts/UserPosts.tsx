import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../../services/User/userApis";
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon from MUI
import NewPostDialog from "../NewPostDialog/NewPostDialog";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface UserPostsProps {
    userId: number;
    onClose?: () => void; // Function to close the component
}

const UserPosts: React.FC<UserPostsProps> = ({ userId, onClose }) => {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    const handlePostCreate = (title: string, body: string) => {
        // Fake the post creation (since the server won't actually create it)
        const newPost: Post = {
            userId,
            id: userPosts.length + 1,
            title,
            body,
        };

        // Update the list of posts for the user
        setUserPosts((prevPosts) => [...prevPosts, newPost]);
    };

    useEffect(() => {
        getUserPosts(userId).then((res) => {
            setUserPosts(res.data);
        });
    }, [userId]);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ flex: 1, textAlign: 'center' }}>User Posts</h3>
                {/* button to close this component from the side of the screen*/}
                <IconButton onClick={onClose} color="inherit">
                    <CloseIcon />
                </IconButton>
            </div>
            
            <TableContainer component={Paper} sx={{ maxHeight: '35%' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Body</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.body}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{marginTop:'10px'}} variant="outlined" onClick={() => setDialogOpen(true)}>
                Create Post
            </Button>
            {/* dialog to create new post */}
            <NewPostDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onPostCreate={handlePostCreate}
            />
        </>
    );
}

export default UserPosts;