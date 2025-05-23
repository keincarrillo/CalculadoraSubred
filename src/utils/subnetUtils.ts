export const isSubnetInvalid = (mask: string, newMask: string): boolean => {
  const numericMask = Number(mask); // Casteo
  const numericNewMask = Number(newMask);

  if (isNaN(numericMask) || isNaN(numericNewMask)) return false;
  return numericNewMask < numericMask;
};

export const shouldDisableSubmit = (
  ip: string,
  mask: string,
  newMask: string,
  invalidSubnet: boolean,
  invalidIP: boolean
): boolean => {
  // .trim() para eliminar espacios en blanco
  return (
    ip.trim() === "" ||
    mask.trim() === "" ||
    newMask.trim() === "" ||
    invalidSubnet ||
    invalidIP
  );
};

export const maskMacInvalid = (maskNewMac: number) => {
  return (
    String(maskNewMac) !== "" &&
    (isNaN(maskNewMac) || maskNewMac > 32 || maskNewMac < 0)
  );
};

export const ipInvalid = (ip: string) => {
  return ip !== "" && !isValidIPv4(ip);
};

export const isValidIPv4 = (ip: string): boolean => {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return ipRegex.test(ip);
};
