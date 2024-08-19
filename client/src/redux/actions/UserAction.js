import axios from "axios";


export const fetchUserData = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/empployee'); // Adjust the API endpoint as needed
        dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching data', error);
        dispatch({
            type: 'FETCH_DATA_FAILURE',
            payload: error.message,
        });
    }
};
