import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import Login from './pages/Login';
import Nav from './components/Nav';
import CreatePost from './pages/create-post/CreatePost';

function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route path="/" element={<MainPage />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/create" element={<CreatePost />}></Route>
			</Routes>
		</div>
	);
}

export default App;
