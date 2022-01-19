import React from 'react'
import { useLocation } from "react-router-dom";



const TitleLogo:React.FC<{}> = () => {
    let location = useLocation();
    if (location.pathname.match(/explore/)) {
        return <div className="logo">Explore</div>
    }
    if (location.pathname.match(/share/)) {
        return <div className="logo">Share</div>
    }
    if (location.pathname.match(/saved/)) {
        return <div className="logo">Saved</div>
    }
    if (location.pathname.match(/profile/)) {
        return <div className="logo">Profile</div>
    }
    else {
        return <div className="logo">Photogram</div>
    }
}

export default TitleLogo