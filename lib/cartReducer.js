// Initial state for the cart
const initialState = {
    items: [], // To store cart items
    subTotal: 0, // Subtotal without discount
    discount: 0, // Discount applied
};

// Reducer function to handle actions related to the cart
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // Action to update the cart items
        case "UPDATE_CART":
            return {
                ...state,
                items: action.payload.items, // Update cart items
            };

        // Action to update the subtotal and discount after coupon application
        case "UPDATE_SUBTOTAL":
            return {
                ...state,
                subTotal: action.payload.subTotal, // Updated subtotal after discount
                discount: action.payload.discount, // Updated discount
            };

        default:
            return state; // Return the state as is for unrecognized actions
    }
};

export default cartReducer;
