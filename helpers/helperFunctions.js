import moment, { max } from "moment/moment";
import 'moment/locale/nl';

export const readingTime = (content)=>{
    let wordsPerMin = 100;
    let wordInContent = content.trim().split(/\s+/);
    let readingTimeMin = Math.ceil(wordInContent.length / wordsPerMin);
    return readingTimeMin;

}
export const stripTrailingSlash = (imageUrl) => {
    return imageUrl.endsWith('/') ?
        imageUrl.slice(0, -1) :
        imageUrl;
};

export const splitComma = (item) => {
    return item.split(',');
};

export const generateSlug = (title) => {
    return title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
};
export const convertTime = (time)=>{
    return moment(time).format('MMMM Do YYYY')
 };
 export const limitText= (content,maxLength) =>{
    if(content.length > max){
        return content.substring(0,maxLength) + "..."
    }
    return content;
 }
