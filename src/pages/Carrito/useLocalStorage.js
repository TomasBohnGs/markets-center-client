import { useState } from "react";

export default function useLocalStorage (key, initValue){

    const [storeValue, setStoreValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item? JSON.parse(item): initValue;
        } catch (error) {
            return initValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoreValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
           console.log("custom localStore: ", error) 
        }
    };
    return [storeValue, setValue];
}
