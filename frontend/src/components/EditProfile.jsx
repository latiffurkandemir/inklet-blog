import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  TextField,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { userAPI } from "../services/api";

function EditProfile({ open, togglePop, userData, onSuccess }) {
  const [newData, setNewData] = useState(userData || {});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await userAPI.updateProfile(newData);
      console.log("Profile updated:", result);

      if (onSuccess) {
        onSuccess(result);
      }

      togglePop();
    } catch (err) {
      setError(err.response?.data || "An error occurred.");
      console.log("Error updating profile:", err);
    }
  };

  return (
    <Dialog open={open} onClose={togglePop} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Edit Profile
        <IconButton
          aria-label="close"
          onClick={togglePop}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "var(--accent-color)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <FormLabel
                htmlFor="nickname"
                sx={{ mb: 1, color: "text.primary" }}
              >
                Nickname:
              </FormLabel>
              <TextField
                id="nickname"
                value={newData?.nickname || ""}
                onChange={handleChange}
                size="small"
                variant="outlined"
                color="accent"
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel
                htmlFor="username"
                sx={{ mb: 1, color: "text.primary" }}
              >
                Username:
              </FormLabel>
              <TextField
                id="username"
                value={newData?.username || ""}
                onChange={handleChange}
                size="small"
                variant="outlined"
                color="accent"
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="email" sx={{ mb: 1, color: "text.primary" }}>
                Email:
              </FormLabel>
              <TextField
                id="email"
                type="email"
                value={newData?.email || ""}
                onChange={handleChange}
                size="small"
                color="accent"
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              },
            }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={togglePop}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditProfile;
