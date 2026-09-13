

import VisaIcon from "@/icons/visa";

export const iconList = {
  visa: VisaIcon,
  prom: VisaIcon, 
  credit: VisaIcon,
};

export type IconName = keyof typeof iconList;
