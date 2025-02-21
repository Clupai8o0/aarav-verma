import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function ensureStartWith(stringToCheck: string, startsWith: string) {
	return stringToCheck.startsWith(startsWith)
		? stringToCheck
		: `${startsWith}${stringToCheck}`;
}

export const generateKey = () => v4();