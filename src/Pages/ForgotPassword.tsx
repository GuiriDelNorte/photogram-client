import React, { useRef, useState } from 'react'
// iOS 100vh problem
import Div100vh from 'react-div-100vh'
// Auth Context
/* import { useAuth } from '../Context/AuthContext'; */
// React router
import { useHistory, Link } from "react-router-dom";
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


const ForgotPassword: React.FC<{}> = () => {
  const [sending, setSending] = React.useState<boolean>(false);
  const [sent, setSent] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');


  const resetPassword = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error !== '') {
      setError('')
    }

    setSending(true)

    auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Email sent')
      setSent(true)
      setSending(false)
    })
    .catch((error) => {
      console.log(error)
      setError(error.message)
      setSending(false)
    })

  }

  return (
      <Div100vh style={flex} className="backgroundColor">
          <div className="maxWidth500 loginBox">
              <img src={coverImage} className="imageRadius" width="100%" style={{marginBottom: '30px'}} />
              <div className="paddingBox">
                  {/* <div className="logoBig" style={{textAlign: 'center', marginBottom: '20px'}}>
                      Register
                  </div>
*/}
                  <div className="" style={{
                    textAlign: 'center', 
                    marginBottom: '30px',
                    fontSize: '13px',
                    color: '#8E8E8E'
                  }}>
                      Reset password.
                  </div>
                  <form onSubmit={resetPassword}>
                    <ThemeProvider theme={theme}>
                      {error === '' ?
                        null
                        :
                        <Alert style={{marginBottom: '30px'}} variant="outlined" severity="error">
                          Failed to reset password
                        </Alert>
                      }

                      {sent ?
                        <Alert style={{marginBottom: '30px'}} severity="success">
                          Check your email for password reset instructions.
                        </Alert>
                        :
                        null
                      }
                    
                      <CustomTextField
                          name="email"
                          /* inputRef={emailRef}  */
                          className="textInput"
                          label="Email"
                          type="email"
                          variant="outlined"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                      />
                        
                    </ThemeProvider>
                        
                    <button disabled={sending} className="btnPrimary" style={{marginTop: '25px'}} type="submit">Reset password</button>
                    <div className="center1" style={{marginTop: '20px'}}>
                        <Link className="atag" to="/login">Login</Link>
                    </div>

                  </form>
              </div>
          </div>
      </Div100vh>
  )
}

export default ForgotPassword

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
