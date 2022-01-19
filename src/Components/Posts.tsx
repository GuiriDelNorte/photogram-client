import React from 'react'
// React Icons
import  { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlinePushpin} from "react-icons/ai";
// Material UI
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
// Firebase
import { db } from '../Config/firebase'
// React router
import { Link } from 'react-router-dom'


interface IProps {
    postData: {
        uid: string,
        imageUrl: string,
        likes: [],
        description: string,
    }
}

const PostComponent: React.FC<IProps> = ({postData}) => {
    const [name, setName] = React.useState<string>('')
    const [avatarUrl, setAvatarUrl] = React.useState<string>('')
    const [profileUrl, setProfileUrl] = React.useState<string>('')
    const [liked, setLiked] = React.useState(false)
    const [loading, setLoading] = React.useState<boolean>(true)
    

    const handleClick = () => {
        if (liked) {
          setLiked(false)
          // likes -1
          
        } else {
          setLiked(true)
          // likes +1
        }
    }

    
    React.useEffect(() => {
        const docRef = db.collection("users").doc(postData.uid);
        const fetchUserName = async () => {
            console.log('fetch useEffect')
            docRef.get().then(function(doc:any) {
                if (doc.exists) {
                    console.log('get request')
                    //console.log("Document data:", doc.data());
                    setName(doc.data().fullName)
                    setAvatarUrl(doc.data().avatarUrl)
                    setProfileUrl(doc.data().profileUrl)
                    setLoading(false)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            
        }
        fetchUserName();
    }, [postData.uid !== undefined])
    

    return (
        <Grow in={loading === false}>
            <div /* className={zoom ? "post2" : "post"} */ className="post">
                <div className="row alignCenter userBox">
                    <img
                    className="profileImage" 
                    src={avatarUrl}
                    />
                    <div className="username">
                        {name}
                    </div>
                </div>
                <img
                    /* onClick={handleZoom} */
                    /* className={zoom ? "image2 unzoomCursor" : "image zoomCursor"}  */
                    className="image zoomCursor"
                    src={postData.imageUrl}
                />

                <div className="row alignCenter buttonBox">
                    <IconButton onClick={handleClick} aria-label="like">
                    {liked ?
                        <AiFillHeart style={{color: '#ED4956'}}/>
                        :
                        <AiOutlineHeart/>  
                    }
                    
                    </IconButton>
                    <IconButton aria-label="comment">
                    <AiOutlineMessage/>
                    </IconButton>
                    <IconButton aria-label="save">
                    <AiOutlinePushpin/>
                    </IconButton>
                </div>
                
                <div className="likeBox">
                    <b>{postData.likes.length}</b> likes 
                </div>

                <div className="row alignCenter userBox" style={{
                    marginTop: '-10px',
                    paddingBottom: '30px',
                    marginBottom: '2px'
                }}>
                    <div style={{marginLeft: '5px', marginRight: '5px'}}>
                        <Link to={profileUrl} style={{textDecoration: 'none', color: '#111111'}}>
                            <span className="username" style={{marginLeft: '-1px'}}>{name}</span>
                        </Link>
                        <span className="description">{postData.description}</span>
                    </div>
                </div>     

            </div>

        </Grow>
    )
}

export default PostComponent


