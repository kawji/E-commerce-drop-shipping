import { type LucideIcon } from 'lucide-react';


export type TagProductType = {
    icon:LucideIcon;
    section:string;
    space?:"gap-0" | "gap-1" | "gap-2" | "gap-3" | "gap-4" | "gap-5"
    word1?:string;
    word2?:string;
    word3?:string;
    underword1?:string;
    underword2?:string;
    underword3?:string;
}