import { useEffect, useState } from 'react';

/**
 * localStorage hook (LS - is the localStorage)
 *
 * @param {string} keyName - key for using all LS API methods
 * @param {any} defaultValue - default value (in case if the value from LS is absent)
 *
 * @returns {Object [
*   value - parsed value, returned from getItem method of LS;
*   setValue - setValue method from LA (including stringifying and passed key),
* ]}
*
*/

const getStorageData = (keyName: string, defaultValue: any = '') => {
	const savedItem: any = localStorage.getItem(keyName);
	const parsedItem = JSON.parse(savedItem);
	return parsedItem || defaultValue;
};
   
export const useLocalStorage = (keyName: string, initialValue: any = '') => {
	const [value, setValue] = useState(() => {
			return getStorageData(keyName, initialValue);
	});
		
	useEffect(() => {
			localStorage.setItem(keyName, JSON.stringify(value));
	}, [keyName, value]);

	return [value, setValue];
};