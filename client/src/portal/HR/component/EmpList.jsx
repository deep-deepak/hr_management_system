// src/components/Leave.js
import React, { useEffect, useState } from 'react';
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from "moment"
import { authenticatedUser } from '../../../service/authentication';
import AddEmp from './AddEmp';
import { getEmployees } from '../../../service/user';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Delete, EditAttributes } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';

const EmployeeList = () => {

    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const authenticated = await authenticatedUser();
                if (authenticated) {
                    const response = await getEmployees();
                    if (response.status) {
                        setData(response.data)
                        setLoading(false)
                    }
                }
                setLoading(false)
            } catch (error) {
                console.log("error", error)
            }
        })();
    }, [loading])


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container>
                <div className='leave_main'>
                    <h1 className='content_title'>Employee List</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowForm((prev) => !prev)}
                        style={{ marginBottom: '1rem' }}
                        className='apply_leave'
                    >
                        {showForm ? 'Cancel' : 'Add Employee'}
                    </Button>

                </div>

                {showForm ? (
                    <AddEmp useOpen={() => [showForm, setShowForm]} useLoading={() => [loading, setLoading]} />

                ) : (
                    <div className='parent_table'>

                        <div className='attendance_record'>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table" className='table_record'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Full Name</TableCell>
                                                <TableCell>Profile</TableCell>
                                                <TableCell>Joining Date</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Phone Number</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((ele) => {
                                                    const joiningDate = moment(ele.joiningDate).format('DD-MM-YYYY');
                                                    // const endDate = moment(leave.endDate).format('DD-MM-YYYY HH:mm a');
                                                    // const appliedAt = moment(leave.createdAt).format('DD-MM-YYYY HH:mm a');
                                                    return (
                                                        <TableRow key={ele._id}>
                                                            <TableCell>{ele.firstName} {ele.lastName}</TableCell>
                                                            <TableCell>{ele.profile}</TableCell>
                                                            <TableCell>{joiningDate}</TableCell>
                                                            <TableCell>{ele.email}</TableCell>
                                                            <TableCell>{ele.phoneNumber}</TableCell>
                                                            <TableCell>
                                                                <IconButton>
                                                                    <VisibilityIcon />
                                                                </IconButton>
                                                                <IconButton>
                                                                    <EditNoteIcon />
                                                                </IconButton>
                                                                <IconButton >
                                                                    <Delete />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 100]}
                                    component="div"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </div>
                )}
            </Container>
        </LocalizationProvider>
    );
};

export default EmployeeList;
