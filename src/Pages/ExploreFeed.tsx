import React from 'react'
// Components
import PostsComponent from '../Components/Posts'
import NewPost from '../Components/NewPost';
import { db } from '../Config/firebase';
import { useHistory } from 'react-router-dom';



interface IState {
    posts: {
      imageUrl: string,
      profileImageUrl: string,
      firstName: string,
      lastName: string,
      likes: number,
      description: string,
      postUrl: string,
    }[]  
}

const ExploreFeed: React.FC<{}> = props => {
    const history = useHistory()
    const [posts, setPosts] = React.useState<IState["posts"]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
  

    const docsRef = db.collection("posts");
    React.useEffect(() => {
        const fetchPosts = () => {
            docsRef.get()
            .then((querySnapshot) => {
                const data:any = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(data);
                setPosts(data);
                setLoading(false)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
        fetchPosts()
    }, [])
    
    return (
        <div className="center" /* style={{backgroundColor: '#FAFAFA'}} */>
            <div className="maxWidth800 padding1">
              <div className="gallery">
                {posts.map((post, index) => {
                    return(
                      <div className="pics" key={index}>
                        <img
                          onClick={() => history.push(post.postUrl)}
                          className="roundedImages"
                          style={{width: '100%'}}
                          src={post.imageUrl} 
                        />
                      </div>
                    )
                })}
              </div>
            </div>
      </div>
    )
}

export default ExploreFeed