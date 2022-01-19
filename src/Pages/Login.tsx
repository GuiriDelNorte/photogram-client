import React from 'react'
// iOS 100vh issue
import Div100vh from 'react-div-100vh'
// Material UI
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
// Static image
import coverImage from '../images/image.jpeg'
// React router
import { useHistory, Link } from 'react-router-dom';
// Firebase
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




const Login: React.FC<{}> = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const history = useHistory();

  const SignIn = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (error !== '') {
      setError('')
    }
    setLoading(true);

    auth.signInWithEmailAndPassword(email, password)

    .then(result => {
      console.log(result)
      history.push('/')
    })

    .catch(error => {
      console.log(error)
      setLoading(false)
      setError('Unable to login')
    })
  }


  return (
      <Div100vh style={flex} className="backgroundColor">
          <div className="maxWidth500 loginBox">
              <img src={coverImage} className="imageRadius" width="100%" style={{marginBottom: '30px'}} />
              <div className="paddingBox">
                  <div className="logoBig" style={{textAlign: 'center', marginBottom: '20px'}}>
                      Photogram
                  </div>

                

                  <form onSubmit={SignIn}>
                    <ThemeProvider theme={theme}>
                      {error === '' ?
                          <div className="" style={{
                            textAlign: 'center', 
                            marginBottom: '30px',
                            fontSize: '13px',
                            color: '#8E8E8E'
                          }}>
                              Share high quality pictures to your followers.
                          </div>
                        :
                        <>
                          <Alert style={{marginBottom: '10px'}} variant="outlined" severity="error">
                            {error}
                          </Alert>

                          <div className="center1" style={{marginTop: '20px', marginBottom: '20px'}}>
                            <span style={text}>Forgot password? </span><Link className="atag" to="/reset">Reset password</Link>
                          </div>
                        </>
                      }
                      <CustomTextField
                          name="Email" 
                          /* inputRef={emailRef}  */
                          className="textInput"
                          label="Email"
                          type="email"
                          variant="outlined"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                      />
                      
                      <CustomTextField
                          name="Password" 
                          /* inputRef={passwordRef}  */
                          className="textInput"
                          style={{marginTop: '10px'}}
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                          variant="outlined"
                          onChange={e => setPassword(e.target.value)}
                          value={password}
                      />
                    </ThemeProvider>
                       
                    <button disabled={loading} className="btnPrimary" style={{marginTop: '25px'}} type="submit">Login</button>
                  </form>

                  <div className="center1" style={{marginTop: '20px'}}>
                      <Link className="atag" to="/register">Register</Link>
                  </div>
              </div>
          </div>
      </Div100vh>
    )
}

export default Login

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const text = { 
  fontSize: '13px',
  color: '#8E8E8E',
  marginRight: '5px',
  display: 'flex',
  alignItems: 'center'
}
