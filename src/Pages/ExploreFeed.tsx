import React from 'react'
// Components
import PostsComponent from '../Components/Posts'
import NewPost from '../Components/NewPost';
import { db } from '../Config/firebase';

const postData = [
    {
      imageUrl: "https://images.unsplash.com/photo-1624916888581-48904076264b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1625056174569-336aeaac87cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      profileImageUrl: "https://www.prog-it.net/wp-content/uploads/2019/09/Parpala-Jari-017.jpg",
      firstName: "Jari",
      lastName: "Parpala",
      likes: 4299,
      description: '#newPost'
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      profileImageUrl: "data:image/jpeg;base64,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",
      firstName: "Jaana",
      lastName: "Parpala",
      likes: 240,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626836806891-fa16e5e73c96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626643590239-4d5051bafbcc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626640986936-d0733a2441e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626861932319-06d1b0e85dc1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626816900590-962998cc5776?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626807063944-6cfcec35558b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626842703061-694d3e731b69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1626727029134-ca085f394a58?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      profileImageUrl: "https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg",
      firstName: "Pulius",
      lastName: "Parpala",
      likes: 2354,
      description: '#newPost'
    },
]

interface IState {
    posts: {
      imageUrl: string,
      profileImageUrl: string,
      firstName: string,
      lastName: string,
      likes: number,
      description: string
    }[]  
}

const ExploreFeed: React.FC<{}> = props => {

    const [posts, setPosts] = React.useState<IState["posts"]>(postData)
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