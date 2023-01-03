import AppBar from "../components/appbar";
import {Box} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileBox from "../components/Profile/profileBox";
import Calender from "../components/Profile/calender";
import Diary from "../components/Profile/diary";
import DATA from '../components/Profile/data';



export default function Profile() {
    const isMobile = useMediaQuery("(max-width: 600px)");
    const boxStyle = {borderRadius:2,border:2,borderColor:'primary.main',backgroundColor: 'background.default',padding:2,margin:2};
    let diaryData = [...DATA];


    return (
        <div className="profile" >
            <AppBar />
            <Box sx={{ margin:'auto',display:'flex',flexDirection: isMobile?'column':'row',justifyContent: 'center',alignItems: 'flex-start' ,padding:1}}>
                <Box sx={{...boxStyle,width: 320}} >
                    <ProfileBox />
                    <Calender />
                </Box>
                <Box sx={{maxWidth:760,flexGrow: 1,}} >
                    {diaryData.map((data) => (
                         <Diary key={data.id} data={data} style={boxStyle} />))}
                </Box>
            </Box>
        </div>
  );
}