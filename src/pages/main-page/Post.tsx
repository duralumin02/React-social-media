import { Post as IP } from './MainPage';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
	post: IP;
}

interface Like {
	userId: string;
	likeId: string;
}

const Post = (props: Props) => {
	const { post } = props;
	const likeRef = collection(db, 'likes');
	const [user] = useAuthState(auth);
	const [likes, setLikes] = useState<Like[] | null>(null);

	const likeDoc = query(likeRef, where('postId', '==', post.id));

	const getLike = async () => {
		const data = await getDocs(likeDoc);
		setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
	};

	const hasUserLike = likes?.find((like) => like.userId === user?.uid);

	useEffect(() => {
		getLike();
	}, []);

	const addLike = async () => {
		try {
			const newDoc = await addDoc(likeRef, {
				userId: user?.uid,
				postId: post.id,
			});
			if (user) {
				setLikes((pre) => (pre ? [...pre, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }]));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const removeLike = async () => {
		try {
			const likeToDeleteQuery = query(likeRef, where('postId', '==', post.id), where('userId', '==', user?.uid));
			const likeToDeleteData = await getDocs(likeToDeleteQuery);
			const likeId = likeToDeleteData.docs[0].id;
			const likeToDelete = doc(db, 'likes', likeId);

			await deleteDoc(likeToDelete);
			if (user) {
				setLikes((pre) => pre && pre.filter((like) => like.likeId !== likeId));
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className="bg-primary rounded-md w-1/2 p-5 flex flex-col gap-3 m-auto mt-4">
				<h1 className="text-3xl font-extrabold">{post.title}</h1>
				<p>{post.description}</p>
				<p className="text-sm">@{post.username}</p>
				<button className="text-2xl" onClick={hasUserLike ? removeLike : addLike}>
					{hasUserLike ? <>&#128078;</> : <>&#128077;</>}
				</button>
				{likes && <p className="text-lg">Likes: {likes.length} </p>}
			</div>
		</div>
	);
};
export default Post;
