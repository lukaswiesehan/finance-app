export const validateNotEmpty = ({value, setError}) => {
  if(value == '') {
    setError('Dieses Feld darf nicht leer sein.')
    return false
  } else {
    setError(null)
    return true
  }
}

export const validateEmail = ({value, setError}) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(value == '') {
    setError('Bitte gib eine Email-Adresse ein.')
    return false
  } else if(!re.test(value.toLowerCase())) {
    setError('Bitte gib eine korrekte Email-Adresse ein.')
    return false
  } else {
    setError(null)
    return true
  }
}

