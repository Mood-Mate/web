export const parseDate = (raw, type) => {
    const date = new Date(raw);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (type === 'birth') {
        return `${year}년 ${month}월 ${day}일`;
    }
    return `${year}-${month}-${day} ${hour}:${minute}`;
};
