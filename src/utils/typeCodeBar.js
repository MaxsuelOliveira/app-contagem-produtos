function typeCodeBar(codigo) {
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

export default { typeCodeBar };
