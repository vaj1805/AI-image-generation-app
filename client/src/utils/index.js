import {surpriseMePrompts} from '../constants';

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    //random idx from 1 to 49.
    const randomPrompt = surpriseMePrompts[randomIndex];
    
    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}