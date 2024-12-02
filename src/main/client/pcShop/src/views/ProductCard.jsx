import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { fetchProductByProductName } from "../handlers/product.js";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import EuroIcon from "@mui/icons-material/Euro";
import Divider from "@mui/material/Divider";

export const ProductCard = () => {
    const { productName } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        fetchProductByProductName(productName)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [productName]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6" color="error">
                    Product not found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                backgroundColor: 'rgba(202,205,227,0.65)',
                padding: "1rem",
            }}
        >
            <Card sx={{ width: "100%", maxWidth: 600, boxShadow: 6 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`data:image/jpeg;base64,${product.images?.[0]?.data || ""}`}
                    alt={product.productName || "Product"}
                />
                <Divider/>
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        {product.productName || "Unnamed Product"}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1" color="text.secondary">
                        <b>Description:</b><br/> {product.description || "No description available."}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <b>Availability:</b>  {product.availability || "No description available."}
                    </Typography>
                    <Divider/>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing(0.5),
                            marginTop: theme.spacing(2),
                        }}
                    >
                        <Typography variant="h5" color="primary">
                            {product.price || "N/A"}
                        </Typography>
                        <EuroIcon color="primary" fontSize="small" />
                    </Box>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                    <Button variant="contained" color="primary" size="large">
                        Add to Cart
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};
