import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import 'dayjs/locale/ko';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'atom/auth';
import { diaryState } from 'atom/dairy';
import diaryService from '../../services/diary_api';

export default function Calender() {
    const [date, setDate] = useState(dayjs());
    const user = useRecoilValue(userState);
    const setDiary = useSetRecoilState(diaryState);

    useEffect(() => {
        console.log(user.id);
        diaryService.getDiary(user.id, date.format('YY-M-D')).then((res) => {
            if (res) {
                console.log(res.data);
                setDiary(res.data);
            } else {
                alert('일기를 불러오는데 실패했습니다.');
            }
        });
    }, [date]);

    const CustomCalendarPicker = styled(CalendarPicker)`
        margin: 0;
        width: 100%;
        height: 330px;
    `;
    function handleSelectedDay(newDate) {
        setDate(newDate);
    }

    function handleMonthChange(newDate) {
        console.log(newDate);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <CustomCalendarPicker
                date={date}
                onChange={handleSelectedDay}
                onMonthChange={handleMonthChange}
            />
        </LocalizationProvider>
    );
}
