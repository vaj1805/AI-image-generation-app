import {surpriseMePrompts} from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    //random idx from 1 to 49.
    const randomPrompt = surpriseMePrompts[randomIndex];
    
    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id , photo) {
    FileSaver.saveAs(photo , `download-${_id}.jpg`);
}
