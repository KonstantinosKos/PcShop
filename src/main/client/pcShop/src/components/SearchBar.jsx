import {styled} from "@mui/material/styles";
import {alpha, InputBase, ListItemAvatar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {fetchProductByCategory, fetchProductByProductName, fetchProductByUUid,} from "../handlers/product.js";
import {useEffect, useRef, useState} from "react";
import {isValidCategory, isValidProductName, isValidUUID,} from "../validation/productRequestsValidation.js";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";

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
    const [value, setValue] = useState("");

    const [products, setProducts] = useState([{
        uuid: '',
        productName: '',
        price: 0,
        category: '',
        description: '',
        availability: '',
        images: []
    }]);
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const handleSearch = debounce((value) => {
        if (!value || typeof value !== 'string') {
            return;
        }

        if (isValidUUID(value)) {
            fetchProductByUUid(value)
                .then(response => handleSearchByUuid(response));
        } else if (isValidCategory(value)) {
            const normalizedCategory = value.toUpperCase().replace(/\s+/g, '_');
            fetchProductByCategory(normalizedCategory)
                .then(response => handleSearchByCategory(response));
        } else if (isValidProductName(value)) {
            fetchProductByProductName(value)
                .then(response => handleSearchByProductName(response));
        }
    }, 500);

    const handleSearchByUuid = (response) => {
        if (response) {
            setProducts([response.data]);
            setOpenDialog(true)
        }
    }

    const handleSearchByCategory = (response) => {
        if (response) {
            setProducts(response.data);
            setOpenDialog(true)
        }
    }

    const handleSearchByProductName = (response) => {
        if (response) {
            setProducts([response.data]);
            setOpenDialog(true)
        }
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDialog(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClicked = (e, result) => {
        navigate(
            `/category/${encodeURIComponent(result.category)}/${encodeURIComponent(result.productName)}`
        );
        setOpenDialog(false);
    };


    const navigate = useNavigate();
    return (
        <>
            <Search sx={{position: 'fixed', right: 80, top: 10}}>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                    onChange={(e) => {
                        setValue(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    value={value}
                />
            </Search>
            {openDialog && (
                <List ref={dropdownRef}
                      sx={{
                          maxWidth: 360,
                          bgcolor: 'background.paper',
                          position: 'absolute',
                          top: '55px',
                          right: '100px',
                          borderRadius: "10%",
                          padding: '0'
                      }}>
                    {products.map((result, index) => (
                        <div key={index}>
                            <ListItemButton
                                sx={{
                                    display: 'flex',
                                }}
                                onClick={(e) => handleClicked(e, result)}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Product" src={`data:image/jpeg;base64,${result.images[0].data}`}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{
                                                color: 'text.primary',
                                                display: 'inline',
                                            }}
                                        >
                                            {result.productName}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                            <Divider
                                sx={{
                                    width: '80%',
                                    marginLeft: '10%',
                                }}/>
                        </div>
                    ))}
                </List>
            )}
        </>
    )
}

export default SearchBar;