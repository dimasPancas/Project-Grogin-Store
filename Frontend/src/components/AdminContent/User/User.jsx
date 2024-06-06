import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer, Collapse, FormGroup, TextField, ButtonGroup, Paper } from "@mui/material";
import { Add, Delete, Edit, Restore } from "@mui/icons-material";
import { useAuth } from '../../../contexts/AuthContext';

export default function UserAdmin() {
  const apiUsersUrl = "https://localhost:7249/api/User";
  const [users, setUsers] = useState([]);
  const [editedUserId, setEditedUserId] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUsersUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          accept: "*/*"
        }
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditFormToggle = (userId) => {
    setEditedUserId(editedUserId === userId ? null : userId);
  };

  const handleEditUserSubmit = async (editedUser) => {
    try {
      const response = await axios.patch(apiUsersUrl, editedUser, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Updated user data:", response.data);
      fetchUsers();
      setEditedUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ bgcolor: "#634C9F", color: "white", borderRadius: 2, fontWeight: 'bold', mb: 2 }}
      >
        Add User
      </Button>
      {/* <TableContainer sx={{ borderRadius: 2 }}> */}
      <Table>
        <TableHead sx={{ backgroundColor: '#634C9F' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'white', borderTopLeftRadius: '7px' }}>No</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Username</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <>
              <TableRow key={user.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f4f4' } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.phoneNumber || "-"}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button variant='contained' color="warning" onClick={() => handleEditFormToggle(user.id)}>
                      <Edit />
                    </Button>
                    {/* <Button variant='contained' color="error" onClick={() => handleDeleteUser(user.id)}>
                      <Delete />
                    </Button>
                    <Button variant='contained' color="primary" onClick={() => handleRestoreUser(user.id)}>
                      <Restore />
                    </Button> */}
                  </ButtonGroup>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={editedUserId === user.id} timeout="auto" unmountOnExit>
                    <FormGroup onSubmit={() => handleEditUserSubmit(user.id)}>
                      <TextField
                        label="Email"
                        defaultValue={user.email}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Username"
                        defaultValue={user.userName}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Phone Number"
                        defaultValue={user.phoneNumber || "-"}
                        fullWidth
                        margin="normal"
                      />
                      <Button variant='contained' color="success" type="submit">Submit</Button>
                    </FormGroup>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </>
  );
}
