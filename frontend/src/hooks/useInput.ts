import {useState} from "react";

const useInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);

    return [value, setValue] as const;
}

export default useInput;