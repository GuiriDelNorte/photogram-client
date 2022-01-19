import React, {useRef} from 'react'
// iOS 100vh issue
import Div100vh from 'react-div-100vh'
// Firebase
import { db, auth, app } from '../Config/firebase'
// Material UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

// React Icons
import {AiFillCamera} from "react-icons/ai";
// contenteditable div
import ContentEditable from 'react-contenteditable'
// uuid
import { v4 as uuidv4 } from 'uuid';
// React router
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    button: {
      marginLeft: theme.spacing(1),
    },
  }),
);

const SharePost: React.FC<{}> = props => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState<boolean>(false)
    const [postImageUrl, setpostImageUrl] = React.useState<string>('')
    const subjectTitle = useRef('');
    const [uid, setUid] = React.useState<string>('1')
    const [error, setError] = React.useState<string>('')
    const history = useHistory();
    let postId = uuidv4();
    const [name, setName] = React.useState<string>('')
    const [avatarUrl, setAvatarUrl] = React.useState<string>('')
    
    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
          if (user) {
            setUid(user.uid)
          }
          else {
            console.log('no user detected')
          }
        })
    }, [])

    async function handlePostSubmit(e:any) {
        e.preventDefault()
        setLoading(true)
        try {
            setError('')
            setLoading(true)
            db.collection("posts").doc(postId).set({
              uid:uid,
              imageUrl: postImageUrl,
              postUrl: `/post/${postId}`,
              description: subjectTitle.current,
              likes: []
            })
            const timer = setTimeout(() => {
                setLoading(false)
                history.push("/")
            }, 3500);
            return () => clearTimeout(timer);
        }   catch (error) {
            setError("Something went wrong")
            console.log(error)
        }
        setLoading(false)
    }


    const onChange = async (e:any) => {
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setpostImageUrl(await fileRef.getDownloadURL())
    }

    /* Description */
    const handleChange = (evt:any) => {
        subjectTitle.current = evt.target.value;
    };
    const handleBlur = () => {
        console.log(subjectTitle.current);
    };

    React.useEffect(() => {
        const docRef1 = db.collection("users").doc(uid)

        const fetchUserName = async () => {
            docRef1.get().then(function(doc:any) {
                if (doc.exists) {
                    console.log('get request')
                    //console.log("Document data:", doc.data());
                    setName(doc.data().fullName)
                    setAvatarUrl(doc.data().avatarUrl)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });    
        }
        fetchUserName()
        
    }, [uid])
    
    return (
        <Div100vh className="center backgroundColor">
            <div className="maxWidth800 padding">
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
                    {loading ? <LinearProgress /> : null}
                    {postImageUrl.length === 0 ? 
                        <div className="placeholderImageInput">
                            <input
                                onChange={onChange}
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                variant="outlined"
                                color="default"
                                className={classes.button}
                                startIcon={<AiFillCamera />}
                                component="span"
                                >
                                Share
                                </Button>
                            </label>
                        </div>

                        :
                        <img
                            className="image zoomCursor"
                            src={postImageUrl}
                        />

                }
                
                    <div className="row alignCenter userBox" style={{
                        marginTop: '5px',
                        paddingBottom: '20px',
                        marginBottom: '2px'
                    }}>
                        <div style={{marginLeft: '0px', marginRight: '5px'}}>
                            
                            <ContentEditable 
                                html={subjectTitle.current} 
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                placeholder="Write a caption..."
                                className="description"
                                style={descriptionStyle}
                            />
                            
                        </div>
                    </div>
                    {error === '' ?
                        null
                        :
                        <Alert style={{marginBottom: '30px'}} variant="outlined" severity="error">
                          {error}
                        </Alert>
                    }
                    <div style={paddingBtn}>
                        <div onClick={handlePostSubmit} className="editProfileBtn" style={{
                            margin: '-10px 0  10px 0',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}>
                            Publish
                        </div>
                    </div>

                    

                </div>
            </div>
      </Div100vh>
    )
}

export default SharePost

const paddingBtn = {
    padding: '0 15px 0 15px'
}


const descriptionStyle = {
    width: '100%',
    outline: 'none',
    fontSize: '16px'
}