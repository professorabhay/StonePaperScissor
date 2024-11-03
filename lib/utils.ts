import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (input?: string): string => {
  switch (input) {
      case "1":
          return('/rock.png');
          
      case "2":
          return('/paper.png');
        
      case "3":
          return('/scissors.png');
         
      case "4":
          return('/spock.png');

      case "5":
          return('/lizard.png');
    
      default:
          return('');
     
  }
};

export function copyToClipboard(address: string) {
    const el = document.createElement('textarea');
    el.value = address;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export function timeformat(s: any) {
    return (
      (s - (s %= 60)) / 60 +
      (9 < s ? " minutes : " : " minutes : 0") +
      s +
      " seconds"
    );
  }
