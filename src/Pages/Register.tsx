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
      htmlFontSize: 16,
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


const Register: React.FC<{}> = () => {
  const [registering, setRegistering] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirm, setConfirm] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const history = useHistory();

  const signUpWithEmailAndPassword = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('passwords do not match');
    }

    if (error !== '') {
      setError('')
    }

    setRegistering(true);

    auth.createUserWithEmailAndPassword(email, password)
    .then(result => {
      console.log(result);
      history.push('/create-account')
    })
    .catch(error => {
      console.log(error)

      if (error.code.includes('auth/weak-password')) {
        setError('Please enter a better password')
      }
      else if (error.code.includes('auth/email-already-in-use')) {
        setError('Email already registered')
      } 
      else {
        setError('Unable to register. Please try again later.')
      }
    })
    
    setRegistering(false);
  }

  return (
      <Div100vh style={flex} className="backgroundColor">
          <div className="maxWidth500 loginBox">
              <img src={coverImage} className="imageRadius" width="100%" style={{marginBottom: '30px'}} />
              <div className="paddingBox">
                  
                  <div className="" style={{
                    textAlign: 'center', 
                    marginBottom: '30px',
                    fontSize: '13px',
                    color: '#8E8E8E'
                  }}>
                      Register to Share & View pictures.
                  </div>
                  <form onSubmit={signUpWithEmailAndPassword}>
                    <ThemeProvider theme={theme}>
                      {error === '' ?
                        null
                        :
                        <Alert style={{marginBottom: '30px'}} variant="outlined" severity="error">
                          {error}
                        </Alert>
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
                      
                      <CustomTextField
                          name="password" 
                          /* inputRef={passwordRef}  */
                          className="textInput"
                          style={{marginTop: '20px'}}
                          label="Password"
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
                        
                    <button disabled={registering} className="btnPrimary" style={{marginTop: '25px'}} type="submit">Register</button>
                    <div className="center1" style={{marginTop: '20px'}}>
                        <Link className="atag" to="/login">Login</Link>
                    </div>

                  </form>
              </div>
          </div>
      </Div100vh>
  )
}

export default Register

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
