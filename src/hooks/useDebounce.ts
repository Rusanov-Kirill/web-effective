import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T): T => {
    const [debValue, setDebValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebValue(value);
        }, 3000);
    
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debValue;
}

export default useDebounce;