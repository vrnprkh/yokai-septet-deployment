import { DEBUG_MODE } from "./constants";

export function setLocalUserID(id : string) {
	if (DEBUG_MODE) {
		sessionStorage.setItem("userId", id);
	} else {
		localStorage.setItem("userId", id);		
	}
}
export function getLocalUserID() {
	return DEBUG_MODE ? sessionStorage.getItem("userId") : localStorage.getItem("userId");
}
export function removeLocalUserID() {
	if (DEBUG_MODE) {
		sessionStorage.removeItem("userId");
	} else {
		localStorage.removeItem("userId")
	}
}