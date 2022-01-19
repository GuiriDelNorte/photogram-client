import React from 'react'
// Material UI
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// React Icons
import  { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";


interface IProps {
    newPost: {
        imageUrl: string,
        /* profileImageUrl: string,
        firstName: string, 
        lastName: string,
        likes: number, */
    }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1)
    },
  }),
);


const NewPost:React.FC<IProps> = ({newPost}) => {
    const classes = useStyles();

    return (
        <div className="post">
            <img
                className="image"
                src={newPost.imageUrl}
            />

            <div className="row alignCenter between">
                <div className="row alignCenter userBox">
                    <img
                    className="profileImage" 
                    src="https://pbs.twimg.com/profile_images/1335343225431846915/WR8kjkqS_400x400.jpg"
                    />
                    <div className="username">
                        Julius Parpala
                    </div>
                </div>
                
                <Button
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    startIcon={<AiOutlineCloudUpload />}
                    component="span"
                >Post</Button>
                <Button
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    startIcon={<AiOutlineDelete />}
                    component="span"
                >Delete</Button>
            </div>
        </div>
    )
}

export default NewPost