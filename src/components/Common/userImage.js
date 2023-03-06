import { Avatar } from '@mui/material';
import defaultUserImage from '../../assets/userDefaultImg.png';
import { Link } from 'react-router-dom';

export default function UserImage(props) {
    return (
        <Link to={'/' + props.userId}>
            <Avatar
                sx={{ width: props.width, height: props.width, margin: 'auto' }}
                src={
                    props.profileImage
                        ? process.env.REACT_APP_API_URL + props.profileImage
                        : defaultUserImage
                }
            />
        </Link>
    );
}
