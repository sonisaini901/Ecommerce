import { CLEAR_ADDRESS_ERRORS, GET_ADDRESS_BY_ID_FAIL, GET_ADDRESS_BY_ID_REQUEST, GET_ADDRESS_BY_ID_SUCCESS, GET_ADDRESS_FAIL, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, NEW_ADDRESS_FAIL, NEW_ADDRESS_REQUEST, NEW_ADDRESS_RESET, NEW_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_RESET, UPDATE_ADDRESS_SUCCESS } from "../Types/AddressTypes";

export const addressDetailsReducer = (state = { addressDetails: {} }, { type, payload }) => {

    switch (type) {
        case GET_ADDRESS_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ADDRESS_BY_ID_SUCCESS:
            return {
                loading: false,
                addressDetails: payload,
            };
        case GET_ADDRESS_BY_ID_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ADDRESS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const addressReducer = (state = { addressInfo: {} }, { type, payload }) => {

    switch (type) {
        case GET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ADDRESS_SUCCESS:
            return {
                loading: false,
                addressInfo: payload,
            };
        case GET_ADDRESS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ADDRESS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// New Shipping Address Reducer
export const addShippingReducer = (state = { shipping: {} }, { type, payload }) => {
    switch (type) {
        case NEW_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_ADDRESS_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                shipping: payload.blog,
            };
        case NEW_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_ADDRESS_RESET:
            return {
                ...state,
                success: false,
                shipping: {},
            };
        case CLEAR_ADDRESS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// Shipping Address Reducer
export const shippingReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case UPDATE_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_ADDRESS_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ADDRESS_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}