import { useState } from "react";

const types = {
  nome: {
    regex: /^[a-zA-Z0-9\s]+$/,
    message: "Campo em branco",
  },
  descricao: {
    regex: /^[a-zA-Z0-9\s]+$/,
    message: "Campo em branco",
  },
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email valido",
  },
  password: {
    regex: /^[a-zA-Z0-9\s]+$/,
    message: "Senha muito franca",
  },
};

function useForm(type?: keyof typeof types) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>("");

  function validate(value: string) {
    if (!type) return true;
    if (value.length === 0) {
      setError("Campo obrigatorio");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError("");
      return true;
    }
  }

  function onChange({ target }: any) {
    if (error) validate(target.value);
    setValue(target.value);
  }
  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}

export default useForm;
