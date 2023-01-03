import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ProfileBox() {
    return (
        <>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'space-between',alignItems:'center',textAlign:'center'}}>
                <Box sx={{width:100,height:100,borderRadius:'50%',border:2,borderColor:'primary.main'}} ></Box>
                <Box sx={{width:100}}>100명</Box>
                <Box sx={{width:100}}>100명</Box>
            </Box>
            <Typography sx={{paddingY:3}}>
                앙버터의 일기장에 오신 것을 환영합니다.
            </Typography>
        </>


  );
}