import axios from "axios";
import { CLEAR_ADDRESS_ERRORS, DELETE_ADDRESS_FAIL, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_ADDRESS_BY_ID_FAIL, GET_ADDRESS_BY_ID_REQUEST, GET_ADDRESS_BY_ID_SUCCESS, GET_ADDRESS_FAIL, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, NEW_ADDRESS_FAIL, NEW_ADDRESS_REQUEST, NEW_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "../Types/AddressTypes";

// Get Address Details
export const getAddressDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADDRESS_REQUEST });

        const { data } = await axios.get(`/api/v1/shipping/${id}`);

        dispatch({
            type: GET_ADDRESS_SUCCESS,
            payload: data.shipping,
        });
    } catch (error) {
        dispatch({
            type: GET_ADDRESS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Address Details By Id
export const getAddressDetailsById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADDRESS_BY_ID_REQUEST });

        const { data } = await axios.get(`/api/v1/addressdetail/${id}`);

        dispatch({
            type: GET_ADDRESS_BY_ID_SUCCESS,
            payload: data.shipping,
        });
    } catch (error) {
        dispatch({
            type: GET_ADDRESS_BY_ID_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Add Shipping Address
export const createShipping = (addressData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ADDRESS_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/address/add`, addressData, config);

        dispatch({
            type: NEW_ADDRESS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_ADDRESS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Shipping Address
export const updateShipping = (id, addressData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADDRESS_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/address/${id}`, addressData, config);

        dispatch({
            type: UPDATE_ADDRESS_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ADDRESS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Address
export const deleteAddress = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ADDRESS_REQUEST });

        const { data } = await axios.delete(`/api/v1/address/${id}`);

        dispatch({
            type: DELETE_ADDRESS_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: DELETE_ADDRESS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Clear All Errors
export const clearAddressErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ADDRESS_ERRORS });
}