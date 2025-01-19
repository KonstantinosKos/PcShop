import * as React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from "@mui/x-date-pickers";

const CustomDateField = ({ onChange, label}) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DatePicker
                label={label}
                views={['month', 'year']}
                onChange={onChange}
                sx={{width: "38%"}}
            />
        </LocalizationProvider>
    );
};
export default CustomDateField;