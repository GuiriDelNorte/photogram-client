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


interface IState {
    posts: {
      id: string,
      uid: string,
      imageUrl: string,
      likes: [],
      description: string
    }[]  
}

const HomeFeed: React.FC<{}> = props => {

  const [posts, setPosts] = React.useState<IState["posts"]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [uid, setUid] = React.useState<string>("uid")
  const [following, setFollowing] = React.useState<any>([])
  
  
  React.useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid)
          setUid(user.uid)
        }
        else {
          console.log('no user detected')
        }
      })
  }, [])

  React.useEffect(() => {
    const fetchUserNameAndPosts = async () => {
      const docRef1 = db.collection("users").doc(uid)
      if (uid.length === 0) {
        return
      } else {
        await docRef1.get().then(function(doc:any) {
            if (doc.exists) {
              console.log('get request')
              setFollowing(doc.data().following)
              console.log("following:", following)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        if (following.length === 0) {
          return
        } else {
          const docsRef = db.collection("posts").where("uid", "in", following)
          docsRef.get()
            .then((querySnapshot) => {
                const data:any = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Post data", data);
                setPosts(data);
                setLoading(false)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            }); 
          }
        }
    } 
    fetchUserNameAndPosts()

  }, [uid, following.length === 0])



    return (
      <>
        {loading ?
          <Div100vh className="center2 backgroundColor">
            <CircularProgress />
          </Div100vh>
          :
          <div className="center backgroundColor">
              <div className="maxWidth800 padding">
                {posts.map((post, key) => {
                    return(
                    <PostsComponent
                        key={key}
                        postData={post}
                    />
                    )
                })}
              </div>
          </div>
        }
      </>
    )
}

export default HomeFeed