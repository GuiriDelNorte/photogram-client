import React from 'react'
// iOS 100vh problem
import Div100vh from 'react-div-100vh'
// Auth Context
/* import { useAuth } from '../Context/AuthContext'; */
// React router
import { useHistory, Link, RouteComponentProps } from "react-router-dom";
// Material UI
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
// 
import queryString from 'querystring'

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


const ResetPasswordPage: React.FC<RouteComponentProps> = props => {
  const [verifying, setVerifying] = React.useState<boolean>(true);
  const [verified, setVerified] = React.useState<boolean>(false);
  const [changing, setChanging] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');
  const [confirm, setConfirm] = React.useState<string>('');
  const [oobCode, setOobCode] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const history = useHistory()


  React.useEffect(() => {
    console.log('extracting code')

    let stringParams = queryString.parse(props.location.search)

    if (stringParams) {
      let oobCode = stringParams.oobCode as string;

      if (oobCode) {
        console.log('code found')
        verifyPasswordResetLink(oobCode)
        // Verify code
      }
      else {
        console.log('unable to find code')
        setVerified(false)
        setVerifying(false)
      }

    }
    else {
      console.log('unable to find code')
      setVerified(false)
      setVerifying(false)
    }

  }, [])

  const verifyPasswordResetLink = (_oobCode:string) => {
    auth.verifyPasswordResetCode(_oobCode)
    .then(result => {
      console.log(result)
      setOobCode(_oobCode)
      setVerified(true)
      setVerifying(false)
    })
    .catch(error => {
      console.log(error)
      setVerified(false)
      setVerifying(false)
    })
  }

  const resetPassword = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (error !== '') {
      setError('')
    }

    setChanging(true)

    auth.confirmPasswordReset(oobCode, password)
    .then(() => {
      history.push('/login')
    })
    .catch(error => {
      console.log(error)
      setError(error.message)
      setChanging(false)
    })
  }

  return (
      <Div100vh style={flex} className="backgroundColor">
        {verifying ?
        
          <Div100vh className="center2">
            <CircularProgress />
          </Div100vh>

          :
            <>
              {verified ?
                  <>
                    <div className="maxWidth500 loginBox">
                      <img src={coverImage} className="imageRadius" width="100%" style={{marginBottom: '30px'}} />
                      <div className="paddingBox">
                          
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

                              {/* {sent ?
                                <Alert style={{marginBottom: '30px'}} severity="success">
                                  Check your email for password reset instructions.
                                </Alert>
                                :
                                null
                              } */}
                            
                              <CustomTextField
                                  name="email"
                                  className="textInput"
                                  label="Password"
                                  type="password"
                                  variant="outlined"
                                  onChange={e => setPassword(e.target.value)}
                                  value={password}
                              />

                              <CustomTextField
                                  style={{marginTop: '10px'}}
                                  name="confirm"
                                  className="textInput"
                                  label="Repeat password"
                                  type="password"
                                  variant="outlined"
                                  onChange={e => setConfirm(e.target.value)}
                                  value={confirm}
                              />
                                
                            </ThemeProvider>
                                
                            <button /* disabled={verifying} */ className="btnPrimary" style={{marginTop: '25px'}} type="submit">Reset password</button>
                            <div className="center1" style={{marginTop: '20px'}}>
                                <Link className="atag" to="/login">Login</Link>
                            </div>

                          </form>
                      </div>
                    </div>
                  </>
                :
                  <>
                    <Div100vh className="center2">
                      Invalid link.
                    </Div100vh>
                  </>

              }
            </>
        }
          
        
      </Div100vh>
  )
}

export default ResetPasswordPage

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}