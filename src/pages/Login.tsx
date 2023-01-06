import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
	const signInWithGoogle = async () => {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
	};
	return (
		<div>
			THIS IS LOGIN PAGE
			<p className="my-3">Sign in with Google and continue</p>
			<button className="btn btn-primary btn-sm" onClick={signInWithGoogle}>
				Sing in with google
			</button>
		</div>
	);
};
export default Login;
