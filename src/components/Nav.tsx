import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Nav = () => {
	const [user] = useAuthState(auth);

	const userSignOut = async () => {
		await signOut(auth);
	};
	return (
		<div className="navbar bg-purple-700 mb-20">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					daisyUI
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link to="/"> Home </Link>
					</li>
					{!user ? (
						<li>
							<Link to="/login"> Login </Link>
						</li>
					) : (
						<li>
							<Link to="/create"> Create Posts </Link>
						</li>
					)}

					{user && (
						<li>
							<div>
								<img src={auth.currentUser?.photoURL || ''} alt="" className="w-6 h-6 rounded-full" />
								<p>{auth.currentUser?.displayName}</p>
								<button onClick={userSignOut} className="btn btn-base-100 btn-xs">
									LogOut
								</button>
							</div>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};
export default Nav;
