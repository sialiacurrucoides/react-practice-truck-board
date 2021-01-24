export  const formatDate = (timepoint) => {
    const d = new Date(timepoint);
    const monthNum = Number(d.getMonth());
    const month = monthNum >= 9 ? monthNum + 1 : "0" + (monthNum + 1);
    const day = Number(d.getDate()) > 9 ? d.getDate() : "0" + d.getDate();
    const minutes = Number(d.getMinutes()) === 0 ? "00" : d.getMinutes();
    return `${d.getFullYear()}.${month}.${day} ${d.getHours()}:${minutes}`; 
}