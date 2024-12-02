import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchProductByCategory} from "../handlers/product.js";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import EuroIcon from '@mui/icons-material/Euro';

const ProductsPage = () => {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        try {
            const normalizedCategory = category.toUpperCase().replace(/\s+/g, '_');
            fetchProductByCategory(normalizedCategory)
                .then(response => setProducts(response.data));
        } catch (error) {
            console.log(error)
        }
    }, []);

    const handleProduct = (productName) => {
        navigate(`${productName}`);
    }

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: theme.spacing(4),
                padding: theme.spacing(4),
            }}
        >
            {products.map((product, index) => (
                <Box
                    key={index}
                    sx={{
                        width: 300,
                        height: 450,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: theme.spacing(1),
                        boxShadow: theme.shadows[3],
                        cursor: 'pointer',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: theme.shadows[6],
                        },
                        padding: theme.spacing(2),
                    }}
                    onClick={() =>  handleProduct(`${product.productName}`)} // Replace with navigation logic
                >
                    <Typography
                        variant="h6"
                        sx={{color: theme.palette.text.primary, marginBottom: theme.spacing(1)}}
                    >
                        {product.productName}
                    </Typography>
                    <Avatar
                        alt={product.productName}
                        src={`data:image/jpeg;base64,${product.images[0].data}`}
                        sx={{
                            width: 100,
                            height: 100,
                            marginBottom: theme.spacing(2),
                        }}
                    />
                    <Typography
                        variant="caption"
                        sx={{color: theme.palette.text.primary, }}
                    >
                        <b>Product Number:</b> <br/>{product.uuid}
                    </Typography>
                    <Divider
                        sx={{
                            width: '100%',
                        }}
                    />
                    <Typography
                        variant="overline"
                        sx={{color: theme.palette.text.primary,}}
                    >
                        <b>Description:</b> <br/>{product.description}
                    </Typography>
                    <Divider
                        sx={{
                            width: '100%',
                        }}
                    />
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.text.primary,
                            gap: theme.spacing(0.5),
                        }}
                    >
                        <b>Price:</b> {product.price} <EuroIcon fontSize="small" />
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default ProductsPage;