const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um nome válido",
    },
  },
  
  number: {
    custom: {
      isValid: (value) => {
        let trimmedValue = value?.replace(/\s/g, "");
        return parseInt(trimmedValue?.replace("/", "").length, 10) === 16;
      },
      message: "Digite um número de cartão válido",
    },
  },
  
  expiry: {
    custom: {
      isValid: (value) => parseInt(value?.replace("/", "").length, 10) === 4,
      message: "Data inválida",
    },
  },
  
  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 3,
      message: "CVC inválido",
    },
  },
};
  
export default validations;
  
function isValidString(value) {
  return value || value?.trim();
}
  
