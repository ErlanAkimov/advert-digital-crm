import { createSlice } from '@reduxjs/toolkit';
import { api_url } from '../..';
import axios from 'axios';

const initialState = {
	username: 'Guest',
	auth: false,
	image: 'https://i.ibb.co/C8wYfhL/triken160800029.jpg',
	defaultCountry: 'world',
	language: 'en',
	session: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		authUser: (state, { payload }) => {
			state.username = payload.username;
			state.image = payload.image;
			state.auth = true;
			state.defaultCountry = payload.defaultCountry;
			state.language = payload.language;
			state.session = payload.session;
		},
		switchLanguage: (state) => {
			state.language === 'en' ? (state.language = 'ru') : (state.language = 'en');
			axios.post(`${api_url}/change-my-language`, { language: state.language, username: state.username });
		},
		logout: (state) => {
			sessionStorage.removeItem('auth');
			localStorage.removeItem('auth');
			state.username = 'Guest';
			state.auth = false;
			state.image = 'https://i.ibb.co/C8wYfhL/triken160800029.jpg';
			state.defaultCountry = 'world';
			state.language = 'en';
			state.session = '';
		},
	},
});

export const { authUser, switchLanguage, logout } = userSlice.actions;
export default userSlice.reducer;
