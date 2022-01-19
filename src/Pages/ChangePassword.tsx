import React, { useRef, useState } from 'react'
// iOS 100vh problem
import Div100vh from 'react-div-100vh'
// Auth Context
/* import { useAuth } from '../Context/AuthContext'; */
// React router
import { Redirect, useHistory, Link } from "react-router-dom";
// Material UI
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


import coverImage from '../images/image.jpeg'
import { auth } from '../Config/firebase';

const theme = createTheme({
    typography: {
      // Tell Material-UI what's the font-size on the html element is.
      htmlFontSize: 17,
    },
});

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


const ChangePassword: React.FC<{}> = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [old, setOld] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirm, setConfirm] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const history = useHistory();

  const chantePasswordRequest = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm) {
        setError('Passwords do not match')
        return 
    }

    if (error !== '') {
        setError('')
    }

    setLoading(true)

    auth.currentUser?.updatePassword(password)
    .then(result => {
        console.log('password change successfull')
        history.push('/profile')
    })
    .catch( error => {
        console.log('unable to change password')
        setLoading(false)
        setError(error.message)
    })

  }

  // Makes us unable to access this page if we're logged in with another auth provider (google, facebook, twitter etc)
  /* if (auth.currentUser?.providerData[0]?.providerId !== 'password') {
      return <Redirect to="/" />;
  } */

  return (
      <Div100vh style={flex} className="backgroundColor">
          <div className="maxWidth500 loginBox">
              <img src={coverImage} className="imageRadius" width="100%" style={{marginBottom: '30px'}} />
              <div className="paddingBox">
                 
                  <div className="" style={{
                    textAlign: 'center', 
                    marginBottom: '10px',
                    fontSize: '13px',
                    color: '#8E8E8E'
                  }}>
                      Change password.
                  </div>
                  <form onSubmit={chantePasswordRequest}>
                    <ThemeProvider theme={theme}>
                      {error === '' ?
                        null
                        :
                        <Alert style={{marginBottom: '30px'}} variant="outlined" severity="error">
                          Failed to change password
                        </Alert>
                      }
                        <CustomTextField
                          name="old-password" 
                          /* inputRef={passwordRef}  */
                          className="textInput"
                          style={{marginTop: '20px'}}
                          label="Current Password"
                          type="password"
                          autoComplete="new-password"
                          variant="outlined"
                          onChange={e => setOld(e.target.value)}
                          value={old}
                        />
                    
                        <CustomTextField
                          name="new-password" 
                          /* inputRef={passwordRef}  */
                          className="textInput"
                          style={{marginTop: '20px'}}
                          label="New Password"
                          type="password"
                          autoComplete="new-password"
                          variant="outlined"
                          onChange={e => setPassword(e.target.value)}
                          value={password}
                        />

                        <CustomTextField
                            name="confirm" 
                            /* inputRef={passwordRef}  */
                            className="textInput"
                            style={{marginTop: '10px'}}
                            label="Repeat Password"
                            type="password"
                            autoComplete="new-password"
                            variant="outlined"
                            onChange={e => setConfirm(e.target.value)}
                            value={confirm}
                        />
                        
                    </ThemeProvider>
                        
                    <button disabled={loading} className="btnPrimary" style={{marginTop: '25px'}} type="submit">Change password</button>
                    <div className="center1" style={{marginTop: '20px'}}>
                        <Link className="atag" to="/profile">Return</Link>
                    </div>

                  </form>
              </div>
          </div>
      </Div100vh>
  )
}

export default ChangePassword

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
