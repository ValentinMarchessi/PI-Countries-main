import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CountryDetails from './components/CountryDetails/CountryDetails';
import ActivityForm from './components/ActivityForm/ActivityForm';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Landing />} />
					<Route path="/" element={<App />}>
						<Route path="home" element={<Home />} />
						<Route path="country/:id" element={<CountryDetails />} />
						<Route path="activity/create" element={<ActivityForm />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
