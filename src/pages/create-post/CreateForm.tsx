import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { db, auth } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface createDataForm {
	title: string;
	description: string;
}

const CreateForm = () => {
	const schema = yup.object().shape({
		title: yup.string().required('You must add a title!'),
		description: yup.string().required('You must add description!'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<createDataForm>({
		resolver: yupResolver(schema),
	});

	const [user] = useAuthState(auth);
	const postRef = collection(db, 'posts');
	const navigate = useNavigate();

	const onCreatePost = async (data: createDataForm) => {
		await addDoc(postRef, {
			...data,
			username: user?.displayName,
			userId: user?.uid,
		});
		navigate('/');
	};
	return (
		<div className="p-5 grid justify-center">
			<form className="w-80 flex flex-col gap-4" onSubmit={handleSubmit(onCreatePost)}>
				<input type="text" placeholder="title ..." {...register('title')} className="input input-primary input-bordered input-md w-full max-w-xs" />
				<p style={{ color: 'red' }}>{errors.title?.message}</p>
				<textarea placeholder="description ..." {...register('description')} className="input input-primary input-bordered input-md w-full max-w-xs"></textarea>
				<p style={{ color: 'red' }}>{errors.description?.message}</p>
				<input type="submit" className="btn btn-md btn-primary" />
			</form>
		</div>
	);
};
export default CreateForm;
