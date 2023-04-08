import { useCallback, useEffect, useState } from 'react';
import diaryService from '../services/diary_api';

const useHomePosts = (nextPage) => {
    const [diaryList, setDiaryList] = useState([]);
    const [next, setNext] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const sendQuery = useCallback(async () => {
        // console.log('sendQueryStart', nextPage, diaryList);
        setError(null);
        try {
            setLoading(true);
            const res = await diaryService.getFollowingDiary(nextPage);
            if (res?.data.data) {
                setDiaryList((prev) => {
                    let list = [...prev, ...res.data.data];
                    const filteredData = list.reduce(function (acc, current) {
                        if (
                            acc.findIndex(
                                (e) => parseInt(e.diaryId) === parseInt(current.diaryId),
                            ) === -1
                        ) {
                            acc.push(current);
                        }
                        return acc;
                    }, []);
                    list = filteredData;
                    // console.log('sendQueryEnd', nextPage, list);
                    return list;
                });
                setNext(res.data.next);
            } else {
                setError('일기를 불러오는데 실패했습니다.');
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }, [nextPage]);

    useEffect(() => {
        console.log('useEffect', nextPage);
        sendQuery(nextPage);
    }, [nextPage]);
    return [diaryList, next, error, loading];
};

export default useHomePosts;
