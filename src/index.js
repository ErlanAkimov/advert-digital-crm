import './global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
// PAGES
import Homepage from './Pages/NewHomepage/Homepage.jsx';
import Error from './components/404/Error.jsx';

export const api_url = 'https://admin.advert-digital.com/api';
const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
