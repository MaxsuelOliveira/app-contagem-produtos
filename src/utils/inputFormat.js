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
  }
  
};
