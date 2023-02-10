import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { CalendarPicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import 'dayjs/locale/ko';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'atom/auth';
import { diaryState } from 'atom/dairy';
import diaryService from '../../services/diary_api';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Badge, Box } from '@mui/material';

export default function Calender() {
    const [date, setDate] = useState(dayjs());
    const user = useRecoilValue(userState);
    const setDiary = useSetRecoilState(diaryState);
    let diaryDays = null;
    const [init, setInit] = useState(false);

    const handleEvents = (newDate) => {
        console.log('getEvents', newDate);
        diaryService.getDiaryEvent(user.id, newDate).then((response) => {
            if (response?.data) {
                //console.log('diaryDays', Array.from(new Set(response.data)));
                diaryDays = Array.from(new Set(response.data));
                if (!init) {
                    setInit(diaryDays);
                }
                console.log('diaryDays', diaryDays);
            }
        });
    };

    useEffect(() => {
        handleEvents(date.format('YY-M-D'));
        diaryService.getDiaryByDate(user.id, date.format('YY-M-D')).then((res) => {
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
        console.log('onchange');
    }

    function handleMonthYearChange(newDate) {
        diaryDays = [];
        handleEvents(newDate.format('YY-M-D'));
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <CustomCalendarPicker
                autoFocus={true}
                date={date}
                onChange={handleSelectedDay}
                onMonthChange={handleMonthYearChange}
                renderDay={(day, _value, DayComponentProps) => {
                    const DMY = dayjs(day).format('D');
                    let hasDiary = null;
                    if (init) {
                        if (diaryDays) {
                            hasDiary = diaryDays.includes(DMY);
                        } else {
                            hasDiary = init.includes(DMY);
                        }
                    }
                    return (
                        <Badge
                            key={day.toString()}
                            overlap="circular"
                            badgeContent={
                                hasDiary ? (
                                    <Box sx={{ mr: 3.5, scale: '0.5', color: '#092508' }}>
                                        <FiberManualRecordIcon />
                                    </Box>
                                ) : null
                            }
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}>
                            <PickersDay {...DayComponentProps} />
                        </Badge>
                    );
                }}
            />
        </LocalizationProvider>
    );
}
