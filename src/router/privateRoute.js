import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../atom/auth';

export default function PrivateRoute({ component: Component }) {
    const user = useRecoilValue(userState);

    return user.isLogin ? Component : <Navigate to="/login" />;
}
