import Typography from "@mui/material/Typography";
import {Box, Divider, IconButton} from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
export default function Diary(props) {

    return(
        <Box sx={props.style}>
            <Box sx={{mb:1,}}>
                <Typography variant="h5" sx={{paddingY:1}}>
                    {props.data.title}
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-line',}}>
                    {props.data.content}
                </Typography>
            </Box>
            <Box sx={{py:1}}>
                <Divider />
                    <Box sx={{display:"flex" ,justifyContent:"space-evenly"}}>
                        <IconButton>
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                        <IconButton>
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                        <IconButton>
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                    </Box>
                <Divider />
            </Box>

        </Box>

    );
}