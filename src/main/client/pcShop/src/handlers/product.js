import {isValidCategory, isValidProductName, isValidUUID} from "../validation/productRequestsValidation.js";

const Server = "http://localhost:8080/api";

export const fetchSearchResults = async (userInput) => {
    try {

        // If the userInput is empty or invalid, exit early to prevent requests
        if (!userInput || typeof userInput !== 'string') {
            return;
        }

        // Array to store valid fetch requests
        const requests = [];

        // Determine which endpoint to call based on the user input
        if (isValidUUID(userInput)) {
            console.log("userInput", JSON.stringify(userInput));
            requests.push(fetch(Server + `/product?uuid=${userInput}`).catch(() => null));
        } else if (isValidCategory(userInput)) {
            const normalizedCategory = userInput.toUpperCase().replace(/\s+/g, '_');
            requests.push(
                fetch(Server + `/product?category=${normalizedCategory}`).catch(() => null) // handle errors silently
            );
        } else if (isValidProductName(userInput)) {
            requests.push(
                fetch(Server + `/product?name=${userInput}`).catch(() => null) // handle errors silently
            );
        } else {
            console.log("Input doesn't match any valid type.");
            return;
        }

        return await Promise.all(requests);
    } catch (error) {
        console.error(error);
    }
};