import AsyncStorage from "@react-native-async-storage/async-storage";

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

export const isProductLimitReached = (products, limit) => {
  return limit !== false && products.length >= limit;
};

export function setStatus(status) {
  if (status === "progress") {
    return "Em progresso";
  } else if (status === "done") {
    return "Finalizado";
  } else {
    return "Desconhecido";
  }
}

export function typeCodeBar(codigo) {
  const length = codigo.length;

  if (/^\d+$/.test(codigo)) {
    if (length === 8) return "EAN-8";
    if (length === 12) return "UPC-A";
    if (length === 13) return "EAN-13";
    if (length === 14) return "EAN-14";
  }

  if (/^[\x20-\x7E]+$/.test(codigo)) {
    if (length >= 1 && length <= 48) return "Code 128";
    if (length === 10 || length === 36) return "Code 39";
  }

  return "Desconhecido";
}

export function expiresIn() {
  return new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
}

export function getDateExpire(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function isExpired(timestamp) {
  return new Date().getTime() >= timestamp;
}

export const FormattingInputs = {
  formatCNPJ(value) {
    const cnpj = value.replace(/\D/g, "");
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  },

  formatCPF(value) {
    const cpf = value.replace(/\D/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },

  formatPhone(value) {
    const phone = value.replace(/\D/g, "");
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  },

  formatCep(value) {
    const cep = value.replace(/\D/g, "");
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  },

  formatDate(value) {
    const date = value.replace(/\D/g, "");
    return date.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  },

  formatHour(value) {
    const hour = value.replace(/\D/g, "");
    return hour.replace(/(\d{2})(\d{2})/, "$1:$2");
  },

  formatMoney(value) {
    const money = value.replace(/\D/g, "");
    return money.replace(/(\d{1,})(\d{2})/, "$1,$2");
  },
};

export const decodeToken = (token) => {
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return tokenPayload;
};

export function isTokenExpired(token) {
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;
}

export async function Logout() {
  await AsyncStorage.multiSet([
    ["isToken", ""],
    ["isLogin", "false"],
    ["isAccount", "free"],
  ]);
}
