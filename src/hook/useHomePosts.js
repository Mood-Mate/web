import { useEffect, useState } from 'react';
import diaryService from '../services/diary_api';

const useHomePosts = (nextPage) => {
    const [diaryList, setDiaryList] = useState([]);
    const [next, setNext] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const sendQuery = () => {
        console.log('sendQueryStart', nextPage, diaryList);
        setError(null);
        setLoading(true);
        diaryService
            .getFollowingDiary(nextPage)
            .then((res) => {
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
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    };

    useEffect(() => {
        console.log('useEffect', nextPage);
        sendQuery(nextPage);
    }, [nextPage]);
    return [diaryList, next, error, loading];
};

export default useHomePosts;
