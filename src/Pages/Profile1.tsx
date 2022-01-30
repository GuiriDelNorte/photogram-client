import React from 'react'
// Components
import PostsComponent from '../Components/Posts'
import NewPost from '../Components/NewPost';
// Material UI
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useHistory, useParams } from 'react-router-dom';
import { auth, db } from '../Config/firebase';



interface IState {
    posts: {
      imageUrl: string,
      profileImageUrl: string,
      firstName: string,
      lastName: string,
      likes: number,
      description: string,
      postUrl: string
    }[]  
}

const ProfilePage1: React.FC<{}> = props => {
    let { uid }:any = useParams()
    const history = useHistory()
    const [posts, setPosts] = React.useState<IState["posts"]>([])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [id, setId] = React.useState<string>("1")
    const [loading, setLoading] = React.useState<boolean>(true)
    const [name, setName] = React.useState<string>('')
    const [avatarUrl, setAvatarUrl] = React.useState<string>('')
    const [bio, setBio] = React.useState<string>('')
    const [followers, setFollowers] = React.useState<string>('')
    const [following, setFollowing] = React.useState<string>('')


    React.useEffect(() => {
        setId(uid)
    }, [uid])

    /* Fetch all user posts */
    const docsRef = db.collection("posts").where("uid", "==", id);
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
    }, [id])
    
    React.useEffect(() => {
        const docRef1 = db.collection("users").doc(id)

        const fetchUserName = async () => {
            docRef1.get().then(function(doc:any) {
                if (doc.exists) {
                    console.log('get request')
                    //console.log("Document data:", doc.data());
                    setName(doc.data().fullName)
                    setAvatarUrl(doc.data().avatarUrl)
                    setBio(doc.data().bio)
                    setFollowers(doc.data().followers)
                    setFollowing(doc.data().following)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });    
        }
        fetchUserName()
        
    }, [id])


    /* Menu list */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        auth.signOut()
        .then(() => {
            history.push('/login')
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return (
        <>
            <header className="header zIndex linkHover">
                <div className="maxWidth800 row" style={{paddingTop: '5px', paddingBottom: '5px'}}>  
                        <IconButton
                            onClick={() => history.goBack()}
                        >
                            <AiOutlineArrowLeft style={{color: '#111111', height: '25px'}}/>
                        </IconButton >
                </div>
            </header>
            <div className="center" /* style={{backgroundColor: '#FAFAFA'}} */>
                <div /* className={zoom ? "fullWidth" : "maxWidth800 padding"} */ className="maxWidth800 profileBoxPadding">
                {/* <NewPost newPost={placeholder}/> */}
                
                    
                    <div className="profileItems profileItemsPadding">
                        <Avatar
                            className="profileAvatar"
                            style={{height: '100px', width: '100px', marginTop: '0', marginBottom: '15px', /* border: '1px solid #DBDBDB', padding: '4px' */}}
                            src={avatarUrl} 
                        />
                        <div style={flex} className="paddingItems flexGrow centerMobile">
                            <div className="ProfileMetrics">
                                <b>{posts.length}</b>
                                <div className="smallText">posts</div>
                            </div>
                            <div className="ProfileMetrics" style={{marginLeft: '20px'}}>
                                <b>{followers.length}</b> 
                                <div className="smallText">followers</div>
                            </div>
                            <div className="ProfileMetrics" style={{marginLeft: '20px'}}>
                                <b>{following.length}</b> 
                                <div className="smallText">following</div>
                            </div>

                            {/* <div style={flex2} className="displayWeb">
                                <Link to="/profile/edit" style={{textDecoration:'none', color: '#111111', alignItems: 'center'}} className="">
                                    <div style={{marginTop: '15px', width: '100%', textAlign: 'center', fontSize: '13px'}} className="editProfileBtn">
                                        Edit profile
                                    </div>
                                </Link>
                                <button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="mobileSettingsBtn" style={{marginTop: '15px', marginLeft: '10px'}}>
                                    <AiOutlineSetting className="iconColor"/>
                                </button>
                            </div> */}
                        </div>
                        
                    </div>

                
                    <div className="username1 profileItemsPadding">
                        {name}
                    </div>

                    <div className="bio profileItemsPadding">
                        {bio}
                    </div>

                    {/* <div style={flex1} className="displayMobile profileItemsPadding">
                        <Link to="/profile/edit" style={{textDecoration:'none', color: '#111111'}} className="flexGrow">
                            <div style={{marginTop: '15px', width: '100%', textAlign: 'center',}} className="editProfileBtn">
                                Edit profile
                            </div>
                        </Link>
                        <button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="mobileSettingsBtn" style={{marginTop: '15px'}}>
                            <AiOutlineSetting className="iconColor"/>
                        </button>
                    </div> */}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Link style={{ textDecoration: 'none', color: '#000000DE' }} to="/change-password">
                            <MenuItem onClick={handleClose}>Change password</MenuItem>
                        </Link>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>

                        <div className="gallery" style={{marginTop: '20px'}}>
                            {posts.map((post, index) => {
                                return(
                                <div className="pics" key={index}>
                                    <img
                                    className="roundedImages"
                                    style={{width: '100%'}}
                                    src={post.imageUrl} 
                                    onClick={() => history.push(post.postUrl)}
                                    />
                                </div>
                                )
                            })}
                        </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage1


const flex = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-15px'
}

const flex1 = {
    display: 'flex',
    flexDierection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
}

const flex2 = {
    display: 'flex',
    flexDierection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: '-15px',
    marginLeft: '50px'
}