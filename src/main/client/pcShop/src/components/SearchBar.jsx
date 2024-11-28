import {styled} from "@mui/material/styles";
import {alpha, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {fetchSearchResults} from "../handlers/product.js";
import {useEffect, useState} from "react";
import {SearchDialog} from "../dialogs/SearchDialog.jsx";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchBar = () => {
    const [openDialog, setOpenDialog] = useState(false);  // State to control dialog visibility
    const [products, setProducts] = useState([{}]);
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const handleSearchResult = (r) => {
        r.forEach(response => {
            if (response && response.ok) {
                response.json().then(data => {
                    // setProducts([...products, data]);
                    setProducts([data]);
                });
            }
        });
    }

    const handleSearch = debounce((value) => {
        console.log(value);
        if (value.trim()) {
            fetchSearchResults(value).then(r => handleSearchResult(r));
        }
    }, 500);

    const handleDialogClose = () => {
        setOpenDialog(false);  // Close the dialog when the user clicks 'Close'
    }

    return (
        <>
        <Search sx={{position: 'fixed', right: 80, top: 10}}>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
                onChange={e => handleSearch(e.target.value)}
            />
        </Search>
        <SearchDialog open={openDialog} handleDialogClose={handleDialogClose} products={products}/>
        </>
    )
}

export default SearchBar;