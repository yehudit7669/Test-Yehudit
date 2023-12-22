import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface NewPostDialogProps {
  open: boolean;
  onClose: () => void;
  onPostCreate: (title: string, body: string) => void;
}

const NewPostDialog: React.FC<NewPostDialogProps> = ({ open, onClose, onPostCreate }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleCreatePost = () => {
    // Validate the form fields
    if (!title.trim() || !body.trim()) {
      alert('Title and body are required.');
      return;
    }

    // Call the parent component's function to create a new post
    onPostCreate(title, body);

    // Reset form fields
    setTitle('');
    setBody('');

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          margin="normal"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Body"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreatePost} color="primary">
          Create Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPostDialog;