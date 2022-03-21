import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled 
} 
from "@heroicons/react/solid"
import Moment from "react-moment";
// import { Session } from "next-auth/react";

import {useSession} from "next-auth/react";
import {addDoc, 
        collection, 
        onSnapshot,
        orderBy,
        query,
        serverTimestamp,
        setDoc,
        doc, 
        deleteDoc} 
        from "@firebase/firestore";
import {db} from "../firebase";
import {useEffect,useState} from "react";





function Post({id, username, userImg, img, caption}) {
    const { data: session} = useSession();
    const [comments, setComments] = useState([]);
    const [comment,setComment] = useState("");
    const [likes, setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);

    useEffect(
        () => onSnapshot(
            query(
                collection(db,"posts",id,"comments"),
                orderBy("timestamp","desc")
                ),snapshot =>setComments(snapshot.docs)
                ),
    [db,id]
    );


    useEffect(()=> onSnapshot(collection(db,"posts",id,"likes"),(snapshot)=>
    setLikes(snapshot.docs)
    ),[db,id]);

    useEffect(() => 
        setHasLiked((likes.findIndex(like => like.id === session?.use?.uid)) !== -1),

    [likes]);

    const likePost = async () => {
        if (hasLiked){

            await deleteDoc(doc[db, "posts",id,"likes",session.user.uid]);
        }else{
        await setDoc(doc(db,"posts",id,"likes",session.user.uid),{
            username: session.user.name,
        });
    }
    };



    useEffect(() =>
    onSnapshot(collection(db,"posts",id,"likes"),(snapshot) =>
    setLikes(snapshot.docs)
    ), [db,id]);


    const sendComment = async(e) => {
       e.preventDefault();

       const commentToSend = comment;
       setComment('');

       await addDoc(collection(db, "posts",id,"comments"),{
           comment: commentToSend,
           username: session.user.name,
           userImage: session.user.image,
           timestamp: serverTimestamp(),
       });
    };
    return (
        <div className="bg-white my-7 border rounded-sm">
            
            {/*Header*/}
            <div className="flex items-center p-5">
                <img 
                src={userImg}
                className="rounded-full h-12 w-12  
                object-contain border p-1 mr-3" 
                alt="" />
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5"/>
            </div>


            {/*Image*/}
            <img src={img} className="object-cover w-full" alt="" />


            {/*Buttons*/}
            {session && (
            <div className="flex justify-between px-4
            pt-4">
            <div className="flex space-x-4">
                <HeartIcon onClick={likePost}className="btn"/>
                <ChatIcon className="btn"/>
                <PaperAirplaneIcon className="btn"/>
            </div>

            <BookmarkIcon className="btn"/>

            </div>
     )}



            {/*Caption*/}
            <p className='p-5 truncate'>
                <span className="font-bold mr-1"> {username}</span>
                {caption}

            </p>



            {/*comments*/}
            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thimb-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" 
                            src={comment.data().userImage} 
                            alt="" />
                    <p className="text-sm flex-1">
                        <span className="font-bold">{comment.data().username}
                    </span>{""}
                    {comment.data().comment}
                    </p>
                    <Moment fromNow className="pr-5 text-xs">
                        {comment.data().timestamp?.toDate()}
                    </Moment>

                        </div>


                    ))}
                
                </div>
            )}


            {/*input box*/}
            {/* {session && ( */}
            <form className="flex items-center p-4">
            <EmojiHappyIcon className="h-7"/>
            <input 
            type="text" 
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a Comment....."className="border-none flex-1 focus:ring-0"/>
            <button 
            type="submit" 
            disable={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400">Post</button>
        </form>


            {/* )} */}


        </div>
    );
}

export default Post
