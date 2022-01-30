import React from 'react'
// React Router
import { useLocation, Link } from "react-router-dom";
// React Icons
import {AiFillCamera, AiOutlineCamera, AiFillPushpin, AiOutlinePushpin, AiFillHome, AiOutlineHome, AiFillStar, AiOutlineStar,  AiOutlineSmile, AiFillSmile} from "react-icons/ai";
// Material UI
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// Changing logo
import TitleLogo from './Logo';

const WebNavData = [
    {
      iconSelected: <AiFillHome style={{color: '#111111'}}/>,
      /* icon: <HiOutlineHome />, */
      icon: <AiOutlineHome />,
      link: "/"
    },
    {
      iconSelected: <AiFillStar style={{color: '#111111'}}/>,
      /* icon: <HiOutlineHome />, */
      icon: <AiOutlineStar />,
      link: "/explore"
    },
    {
      iconSelected: <AiFillCamera style={{color: '#111111'}}/>,
      /* icon: <HiOutlineHome />, */
      icon: <AiOutlineCamera />,
      link: "/share"
    },
    {
      iconSelected: <AiFillPushpin style={{color: '#111111'}}/>,
      /* icon: <HiOutlineHome />, */
      icon: <AiOutlinePushpin />,
      link: "/saved"
    },
    {
      iconSelected: <AiFillSmile style={{color: '#111111'}}/>,
      /* icon: <HiOutlineHome />, */
      icon: <AiOutlineSmile />,
      link: "/profile"
    },
]

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

const HeaderNav:React.FC<{}> = (props) => {
    const [webNav] = React.useState(WebNavData)
    const classes = useStyles();
    let location = useLocation();
        if (location.pathname.match(/login/) || location.pathname.match(/register/) || location.pathname.match(/post/)  || location.pathname.match(/create-account/) || location.pathname.match(/reset/) || location.pathname.match(/change-password/)) {
            return null;
        } else {
            return (
                <>
                    <header /* className={zoom ? "none" : "header"} */ className="header" >
                        <div className="maxWidth800 row alignCenter headerFlex">
                            <TitleLogo/>
                            
                            <div className="row webNav alignCenter">
                            {webNav.map((val, key) => {
                                return (
                                  <Link to={val.link}>
                                    <IconButton aria-label="like">
                                        { window.location.pathname === val.link ? val.iconSelected :val.icon}
                                    </IconButton >
                                  </Link>
                                )
                            })}
                            
                            </div>
                        </div>

                        </header>
                </>
            )
        }
    }

export default HeaderNav