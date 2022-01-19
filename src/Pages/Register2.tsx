import React from 'react'
import Div100vh from 'react-div-100vh'
import coverImage from '../images/image.jpeg'
// Material UI
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider, withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
// React icons
import {AiFillCamera} from "react-icons/ai";
// React router
import { useHistory } from 'react-router';
// Firebase
import { db, app, auth, getCurrentTimestamp } from '../Config/firebase';


const theme = createTheme({
    typography: {
      // Tell Material-UI what's the font-size on the html element is.
      htmlFontSize: 16,
    },
});

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
      marginBottom: '20px',
    },
  }),
);

const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#1061E6',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#1061E6',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.2)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1061E6',
          outline: '#1061E6'
        },
      },
    },
})(TextField);


const Register2: React.FC<{}> = () => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState<boolean>(false)
    const [uid, setUid] = React.useState<string>('')
    const [avatarUrl, setAvatarUrl] = React.useState<string>('')
    const [fullName, setFullName] = React.useState<string>('')
    const [bio, setBio] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')
    const history = useHistory()

    React.useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid)
          setUid(user.uid)
        }
        else {
          console.log('no user detected')
        }
        setLoading(false)
      })
    }, [])

    async function handleSubmit(e:any) {
      e.preventDefault()
      setLoading(true)
      try {
          setError('')
          setLoading(true)
          await db.collection("users").doc(uid).set({
            uid: uid,
            fullName: fullName,
            avatarUrl: avatarUrl,
            profileUrl: `/profile?/${uid}`,
            bio: bio,
            following: [],
            followers: [], 
          })
          history.push("/")
      }   catch (error) {
          setError("Something went wrong")
          console.log(error)
      }
      setLoading(false)
    }


    const onChange1 = async (e:any) => {
      const file = e.target.files[0]
      const storageRef = app.storage().ref()
      const fileRef = storageRef.child(file.name)
      await fileRef.put(file)
      setAvatarUrl(await fileRef.getDownloadURL())
    }


    return (
        <Div100vh style={flex} className="backgroundColor">
            <div className="maxWidth500 loginBox">
                <img src={coverImage} className="imageRadius" width="100%" style={{marginBottom: '30px'}} />
                <div className="paddingBox">
                    
                    <Avatar style={{height: '130px', width: '130px', marginTop: '-100px', marginBottom: '20px', border: '5px solid white'}} src={avatarUrl} />

                    <input
                        onChange={onChange1}
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
                        Upload Image
                        </Button>
                    </label>
                    <ThemeProvider theme={theme}>

                      {error === '' ?
                        null
                        :
                        <Alert style={{marginBottom: '30px'}} variant="outlined" severity="error">
                          {error}
                        </Alert>
                      }
                        
                      <CustomTextField
                          name="name" 
                          /* inputRef={emailRef}  */
                          className="textInput"
                          label="Full Name"
                          type="text"
                          variant="outlined"
                          onChange={e => setFullName(e.target.value)}
                          value={fullName}
                      />

                      <CustomTextField
                          name="bio" 
                          /* inputRef={emailRef}  */
                          className="textInput"
                          label="Profile bio"
                          type="text"
                          variant="outlined"
                          onChange={e => setBio(e.target.value)}
                          value={fullName}
                      />
                        
                    </ThemeProvider>
                            
                    <button disabled={loading} className="btnPrimary" style={{marginTop: '25px'}} onClick={handleSubmit}>
                      Get started
                    </button>

                </div>
            </div>
        </Div100vh>
    )
}

export default Register2

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}