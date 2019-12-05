// THIS FUNCTION FOR CHANGE MILISECONDS TO READABLE DATE
function toDate(miliseconds) {
    let date = new Date(miliseconds);
    // let res = date.toString("dd MMM"); // "Dec 20"        
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export default toDate