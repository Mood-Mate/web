import AppBar from "../components/appbar";
import {Box} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';




export default function Profile() {
    const isMobile = useMediaQuery("(max-width: 600px)");
    return (
        <div className="profile" >
            <AppBar />
            <Box sx={{ margin:'auto',display:'flex',flexDirection: isMobile?'column':'row',justifyContent: 'center' ,padding:1}}>
                <Box sx={{width: 320, height: 300,
                        backgroundColor: 'primary.dark',
                    margin:1,
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7]}}} >

                </Box>
                <Box sx={{maxWidth:900,height:'100vh',flexGrow: 1, margin:1,}} >
                    <Box height={500} sx={{backgroundColor: 'background.default',opacity: [0.5, 0.5, 0.5]}}></Box>
                    <Box height={500} sx={{backgroundColor: 'primary.main'}}></Box>
                    <Box height={500} sx={{backgroundColor: 'primary.main'}}></Box>
                    <Box height={500} sx={{backgroundColor: 'primary.main'}}></Box>
                </Box>
            </Box>
        </div>
  );
}