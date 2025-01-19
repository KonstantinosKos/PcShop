import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Box from "@mui/material/Box";
import MyTextField from "../components/fields/MyTextField.jsx";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import CustomDateField from "../components/fields/DateField.jsx";
import dayjs from "dayjs";
import CustomSelect from "../components/fields/CustomSelect.jsx";
import Button from "@mui/material/Button";
import useCart from "../customHook/useCart.jsx";
import Divider from "@mui/material/Divider";
import useUser from "../customHook/useUser.jsx";
import {getCredits, updateCard} from "../handlers/user.js";
import {useSnackbar} from "notistack";

export const CheckoutPage = () => {
    const {sessionUser} = useUser();
    const {cartItems, totalPrice} = useCart();

    const [fetchedCards, setFetchedCards] = useState(false);
    const [checked, setChecked] = useState();
    const {enqueueSnackbar} = useSnackbar();

    const [cardToOrder, setCardToOrder] = useState({});
    const [fetchCards, setFetchCards] = useState([]);

    const [newCardSave, setNewCardSave] = useState({
        nameOnCard: '', numberOnCard: '', cardExpireDate: new Date().toDateString(), cardType: '',
    })

    const [webOrder, setWebOrder] = useState({
        uuid: '', webUser: '', orderItems: [], totalPrice: '', quantity: '',
    });

    const disableAddPaymentMethod = useMemo(() => {
        return !newCardSave.nameOnCard || !newCardSave.cardExpireDate || !newCardSave.numberOnCard;
    }, [cardToOrder, newCardSave]);


    useEffect(() => {
        setWebOrder({
            ...webOrder, webUser: sessionUser.id, orderItems: cartItems, totalPrice: totalPrice,
        });
    }, []);


    useEffect(() => {
        getCredits(sessionUser.id)
            .then((res) => {
                setFetchCards(res.data);
                if (res.data[0]?.cardType === 'UNKNOWN') {
                    setFetchedCards(false);
                } else {
                    setFetchedCards(true);
                }
            })
            .catch(() => {
            });
    }, [sessionUser.id]);

    const cardTypeOptions = [{value: 0, label: 'VISA'}, {value: 1, label: 'Master Card'},]

    const updatePaymentMethod = useCallback(async () => {
        try {
            await updateCard(newCardSave, sessionUser.id);
            enqueueSnackbar("Added new payment method!", {variant: "success"});
            return true;
        } catch (error) {
            console.error("Failed to update payment method", error);
            return false;
        }
    }, [newCardSave, sessionUser.id, enqueueSnackbar]);

    const fetchUpdatedCards = useCallback(async () => {
        try {
            const res = await getCredits(sessionUser.id);
            setFetchCards(res.data);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch credit cards", error);
            return [];
        }
    }, [sessionUser.id]);

    const handleCardUpdate = useCallback(() => {
        updatePaymentMethod()
            .then((success) => {
                if (success) {
                    fetchUpdatedCards().then((cards) => {
                        if (cards.length > 0) {
                            setFetchedCards(false);
                        }
                        setCardToOrder(newCardSave);
                    });
                }
            });
    }, [newCardSave, updatePaymentMethod, fetchUpdatedCards]);

    const handleSubmit = useCallback(() => {
        handleCardUpdate();
        window.location.reload()
    }, [handleCardUpdate]);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setNewCardSave(prev => ({...prev, [name]: value}));
    }, []);


    const handleSelectChange = useCallback((selected) => {
        setNewCardSave(prev => ({...prev, cardType: selected}));
    }, []);

    const handleDateChange = useCallback((newDate) => {
        setNewCardSave(prevState => ({
            ...prevState, cardExpireDate: newDate.format('MM/YYYY'),
        }));
    }, []);

    const handleOrder = () => {

    }
    const handleRadioGroup = useCallback((e) => {
        setChecked(e.currentTarget.checked);
        const selectedValue = fetchCards.find(option => option.numberOnCard === e.target.value);
        setCardToOrder(selectedValue);
    }, [fetchCards]);

    const handleDeselect = () => {
        setChecked(false);
        setCardToOrder(null);
    }

    return (<Container maxWidth="lg" style={{marginTop: "2rem"}}>
            <Grid container spacing={2}>
                <Grid size={{xs: 6, md: 8}}>
                    {fetchedCards && (<Box
                        sx={{
                            padding: "2rem",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#fff",
                            marginBottom: "5%"
                        }}
                    >
                        <FormControl>
                            <FormLabel>
                                Saved Credit Cards
                            </FormLabel>
                            <Divider/>
                            <RadioGroup
                            >
                                {fetchCards.map((option, index) => (<FormControlLabel
                                    checked={checked}
                                    key={index}
                                    value={option.numberOnCard}
                                    control={<Radio onClick={handleRadioGroup}/>}
                                    label={`${option.numberOnCard} ${option.nameOnCard}`}/>))}

                            </RadioGroup>
                        </FormControl>
                        < Box mt={2} sx={{textAlign: 'right'}}>
                            <Button
                                onClick={handleDeselect}
                                variant="contained"
                                color="primary"
                            >
                                New Credit Card
                            </Button>
                        </Box>
                    </Box>)}
                    <Box
                        sx={{
                            padding: "2rem",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#fff",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Payment Details
                        </Typography>
                        <form>
                            <Grid container spacing={2}>
                                <MyTextField
                                    label="Name on Card"
                                    type="text"
                                    value={newCardSave.nameOnCard}
                                    name="nameOnCard"
                                    required
                                    onChange={handleChange}
                                />
                                <MyTextField
                                    label="Number on Card"
                                    type="text"
                                    value={newCardSave.numberOnCard}
                                    name="numberOnCard"
                                    required
                                    onChange={handleChange}
                                />
                                <CustomDateField
                                    label="Expire Date on Card"
                                    value={newCardSave.cardExpireDate ? dayjs(newCardSave.cardExpireDate, 'MM/YYYY') : null}
                                    onChange={handleDateChange}
                                />
                                <CustomSelect
                                    label="Card Type"
                                    value={newCardSave.cardType}
                                    onChange={handleSelectChange}
                                    options={cardTypeOptions}
                                />
                            </Grid>
                            <Divider sx={{paddingTop: "25px"}}/>
                            < Box mt={2} sx={{textAlign: 'right'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    disabled={disableAddPaymentMethod}
                                >
                                    Add Payment Card
                                </Button>
                            </Box>
                        </form>
                    </Box>

                </Grid>

                <Grid xs={12} md={4}>
                    <Box
                        sx={{
                            padding: "2rem",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#fff",
                            width: "300px"
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Estimated Delivery
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {/* need endpoint here*/}
                        </Typography>
                        <Box
                            sx={{
                                marginBottom: "1rem",
                                borderBottom: "1px solid #ddd",
                                paddingBottom: "1rem",
                                width: "100%",
                            }}
                        >
                            {webOrder.orderItems.map((item, index) => (<Box
                                key={index}
                                sx={{
                                    display: "flex", flexDirection: "column", marginBottom: "1rem",
                                }}
                            >
                                <Typography variant="body1" gutterBottom>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.productName || 'N/A'}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex", justifyContent: "space-between", alignItems: "center",
                                    }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        {item.quantity}
                                    </Typography>
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                            sx={{fontWeight: "bold"}}
                                        >
                                            {item.price} €
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>))}
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "bold"
                            }}
                        >
                            Total Price
                            <span>{webOrder.totalPrice} €</span>
                        </Typography>
                        < Box mt={2} sx={{textAlign: 'right'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOrder}
                            >
                                Order
                            </Button>
                        </Box>
                    </Box>

                </Grid>
            </Grid>
        </Container>

    );
};
