import {useState} from "react";
import {Box} from "@mui/material";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calender(){
    const [date,setDate] = useState(new Date());
    return(
        <Box sx={{paddingY:1}}>
            <Calendar onChange={setDate} value={date} />
        </Box>
    );
}