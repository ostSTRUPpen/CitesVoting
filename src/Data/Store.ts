import { writable } from 'svelte/store';

export const Username = writable('');
export const UserID = writable('');
export const UserRole = writable('');

//Špatné, ale pro testování stačí
/*
export const Username = writable('test');
export const UserID = writable('645e680bfcbaf6a6280e8ec0');
export const UserRole = writable('user');
*/
