import { db } from '../../config/firebase';
import { getDocs, collection, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Post from './Post';

export interface Post {
	id: string;
	username: string;
	title: string;
	description: string;
	userId: string;
}
const MainPage = () => {
	const postRef = collection(db, 'posts');
	const [postsList, setPostsList] = useState<Post[] | null>(null);

	const getPost = async () => {
		const data = await getDocs(postRef);
		setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
	};

	useEffect(() => {
		getPost();
	}, []);
	return (
		<div>
			THIS IS HOME PAGE
			{postsList?.map((post) => (
				<Post post={post} />
			))}
		</div>
	);
};
export default MainPage;
