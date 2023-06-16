export const getShortNumDate = (date)=>{
    let indexEnd = date.indexOf("T");
    let dateShort = date.slice(0,indexEnd).replace(/-/g,"/");

    return dateShort;
}