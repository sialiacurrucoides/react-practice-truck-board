export  const formatDate = (timepoint) => {
    const d = new Date(timepoint);
    const monthNum = Number(d.getMonth());
    const month = monthNum >= 9 ? monthNum + 1 : "0" + (monthNum + 1);
    const day = Number(d.getDate()) > 9 ? d.getDate() : "0" + d.getDate();
    const minutes = Number(d.getMinutes()) === 0 ? "00" : d.getMinutes();
    return `${d.getFullYear()}.${month}.${day} ${d.getHours()}:${minutes}`; 
}

export const textDateToTimeStamp = (dateText) => {
    const dateArr = dateText.split(" ");
    const yearMonthDay = dateArr[0].split(".");
    const hourMinutesSeconds = dateArr[1].split(":");
    const year = yearMonthDay[0];
    const monthNr = Number(yearMonthDay[1]) - 1;
    const day = yearMonthDay[2];
    const hour = hourMinutesSeconds[0];
    const minutes = hourMinutesSeconds[1];
    const seconds = hourMinutesSeconds[2];
    const newDate = new Date(year, monthNr, day, hour, minutes, seconds);
    return newDate.getTime(); 
}