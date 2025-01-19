import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

const CustomSelect = ({value, onChange, label, options}) => {
    return (
        <FormControl
            sx={{width: "38%"}}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                label={label}
                sx={{width: "100%"}}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;
