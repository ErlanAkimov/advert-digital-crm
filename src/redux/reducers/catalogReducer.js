import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
	name: 'catalog',
	initialState: {
		name: 'orders',
		fullList: [],
		list: [],
		total: 0,
	},

	reducers: {
		setOrdersList: (state, { payload }) => {
			state.list = payload.list;
			state.total = payload.total;
			state.fullList = state.list;
		},
		pushNewComment: (state, { payload }) => {
			const id = payload.data.id;
			const itemIndex = state.list.findIndex((item) => item.id === id);

			if (itemIndex !== -1) {
				state.list[itemIndex].comments.push(payload.newComment);
			}
		},
		searchAction: (state, { payload }) => {
			if (payload.searchBy === 'name') {
				state.list = state.fullList.filter((item) => item.name.toLowerCase().startsWith(payload.searchValue?.toLowerCase()));

			}
			if (payload.searchBy === 'phone') {
				state.list = state.fullList.filter((item) => item.phone.toLowerCase().startsWith(payload.searchValue?.toLowerCase()));

			}
			if (payload.searchBy === 'country') {
				state.list = state.fullList.filter((item) => item.country.toLowerCase().startsWith(payload.searchValue?.toLowerCase()));
			}
		},
	},
});

export const { setOrdersList, pushNewComment, searchAction } = catalogSlice.actions;
export default catalogSlice.reducer;
