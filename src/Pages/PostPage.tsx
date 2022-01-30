import React from 'react'
// Components
import PostsComponent from '../Components/Posts'
import NewPost from '../Components/NewPost';
// Firebase
import { db, auth } from '../Config/firebase'
// ios 100vh issue
import Div100vh from 'react-div-100vh'
// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams, Link, useHistory } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
import IconButton from '@material-ui/core/IconButton';


const PostPage: React.FC<{}> = props => {
    const history = useHistory()
    let { postId }:any = useParams()
    const [id, setId] = React.useState<string>("1")
    const [post, setPost] = React.useState<any>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        setId(postId)
    }, [postId])


    React.useEffect(() => {
    const fetchPost = async () => {
      
        const docsRef = db.collection("posts").doc(id)
        docsRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setPost(doc.data())
                setLoading(false)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        }
    fetchPost()

  }, [id])



    return (
      <>
        {loading ?
          <Div100vh className="center2 backgroundColor">
            <CircularProgress />
          </Div100vh>
          :
          <>
          <header className="header" >
            <div className="maxWidth800 row" style={{paddingTop: '5px', paddingBottom: '5px'}}>  
                    <IconButton
                        onClick={() => history.goBack()}
                    >
                        <AiOutlineArrowLeft style={{color: '#111111', height: '25px'}}/>
                    </IconButton >
            </div>
          </header>
        
          <div className="center backgroundColor">
              <div className="maxWidth800 padding">
                    <PostsComponent
                        postData={post}
                    />
              </div>
          </div>
        </>
        }
      </>
    )
}

export default PostPage