import { useState, } from 'react'

export function useForm(inputValues: { name?: string | undefined, email?: string  | undefined, password?: string  | undefined, token?: string  | undefined}) {
    const [values, setValues] = useState(inputValues);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}