import { Avatar } from '@mui/material';
import defaultUserImage from '../../assets/userDefaultImg.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function UserImage(props) {
    const [imageUrl, setImageUrl] = useState(defaultUserImage);
    useEffect(() => {
        if (props.profileImage) {
            setImageUrl(process.env.REACT_APP_API_URL + props.profileImage);
        }
    }, [props.profileImage]);
    return (
        <Link to={'/' + props.userId}>
            <Avatar
                sx={{ width: props.width, height: props.width, margin: 'auto' }}
                src={imageUrl ?? defaultUserImage}
                imgProps={{
                    onError: () => {
                        setImageUrl(defaultUserImage);
                    },
                }}
            />
        </Link>
    );
}
