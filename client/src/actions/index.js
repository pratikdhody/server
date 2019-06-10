import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    return function(dispatch) {
        axios
        .get('/api/current_user')
        .then(res => dispatch({ FETCH_USER, paylod: res}));
    };
};