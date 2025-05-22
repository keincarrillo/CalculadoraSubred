export function isSubnetInvalid(mask: string, newMask: string): boolean {
  const numericMask = Number(mask); // Casteo
  const numericNewMask = Number(newMask);

  if (isNaN(numericMask) || isNaN(numericNewMask)) return false;
  return numericNewMask < numericMask;
}

export function shouldDisableSubmit(
  ip: string,
  mask: string,
  newMask: string,
  invalidSubnet: boolean,
  invalidIP: boolean
): boolean {
  // .trim() para eliminar espacios en blanco
  return (
    ip.trim() === "" ||
    mask.trim() === "" ||
    newMask.trim() === "" ||
    invalidSubnet ||
    invalidIP
  );
}

export function isValidIPv4(ip: string): boolean {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return ipRegex.test(ip);
}
