import React, { useState } from "react"

export const useInput = (initialState) => {
    const [value, setValue] = useState(initialState)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange
    }
}