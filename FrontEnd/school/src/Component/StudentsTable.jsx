import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EmailUsernameUpdateDialog from "./FormDialog";
import { useEffect, useState } from "react";
import FormDialog from "./FormDialog";
import axios from "axios";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function StudentsTable() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allUsers")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const initialFormValues = {
    email: "user@example.com", // Set the initial email value here
    username: "user123", // Set the initial username value here
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Is Active</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((users) => (
            <StyledTableRow key={users._id}>
              <StyledTableCell component="th" scope="row">
                {users.name}
              </StyledTableCell>
              <StyledTableCell align="right">{users.email}</StyledTableCell>
              <StyledTableCell align="right">
                {users.Active ? "true" : "false"}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Stack
                  direction={{ xs: "column", sm: "row-reverse" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <FormDialog
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    open={open}
                  />
                  <Button
                    style={{
                      marginRight: "8px",
                    }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Stack>{" "}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
