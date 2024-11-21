import TextField from "@mui/material/TextField";

const MyTextField = ({ label, type, value, onChange, required, autoFocus, name }) => {
    return (
        <TextField
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            autoFocus={autoFocus}
            name={name}
            margin="dense"
            variant="standard"
        />
    );
};

export default MyTextField;