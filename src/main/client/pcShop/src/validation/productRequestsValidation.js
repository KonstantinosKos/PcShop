export const isValidUUID = (input) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(input);
};

export const  isValidCategory = (input) => {
    const normalizedInput = input.toUpperCase().replace(/\s+/g, '_');
    const validCategories = ['PC_LAPTOPS', 'GAMING', 'MOBILE_TABLETS', 'IMAGE_SOUND', 'HARDWARE', 'PRINTERS'];
    return validCategories.includes(normalizedInput);
};

// Helper function to check if input matches a product name (basic validation)
export const  isValidProductName = (input) => {
    return input.includes(' ');
};
