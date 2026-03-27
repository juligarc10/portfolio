import { gsap as gsapCore } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsapCore.registerPlugin(ScrollTrigger, TextPlugin);

export const gsap = gsapCore;
export { ScrollTrigger };
