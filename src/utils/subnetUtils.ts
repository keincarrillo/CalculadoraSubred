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
  invalidSubnet: boolean
): boolean {
  // .trim() para eliminar espacios en blanco
  return (
    ip.trim() === "" ||
    mask.trim() === "" ||
    newMask.trim() === "" ||
    invalidSubnet
  );
}
