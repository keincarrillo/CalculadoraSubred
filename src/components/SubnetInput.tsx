import React, { useState } from "react";

const SubnetInput = () => {
  const [ip, setIp] = useState<string>("");
  const [maskMac, setMaskMac] = useState<string>("");
  const [maskNewMac, setMaskNewMac] = useState<string>("");
  const [onlyFirstLast, setOnlyFirstLast] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ ip, maskMac, maskNewMac, onlyFirstLast });
  };

  // Validaciones
  const numericMask = Number(maskMac);
  const numericNewMask = Number(maskNewMac);

  const isSubnetInvalid: boolean =
    !isNaN(numericMask) &&
    !isNaN(numericNewMask) &&
    numericNewMask < numericMask;

  const isDisabled: boolean =
    ip.trim() === "" ||
    maskMac.trim() === "" ||
    maskNewMac.trim() === "" ||
    isSubnetInvalid;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 text-black mt-10"
    >
      {/* Línea de inputs horizontal */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <div className="flex flex-col items-start">
          <label className="text-xs font-bold uppercase">Dirección IP:</label>
          <input
            type="text"
            placeholder="Host o Network"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="border px-2 py-1 rounded w-36"
          />
        </div>

        <div className="flex items-center -mb-4">
          <span className="font-bold text-lg">/</span>
        </div>

        <div className="flex flex-col items-start">
          <label className="text-xs font-bold uppercase">Máscara de red:</label>
          <select
            value={maskMac}
            onChange={(e) => setMaskMac(e.target.value)}
            className="border px-2 py-1 rounded w-32"
          >
            <option value="">Selecciona</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
          </select>
        </div>

        <div className="flex items-center -mb-4">
          <span className="uppercase text-sm font-semibold">Mover a</span>
        </div>

        <div className="flex flex-col items-start">
          <label className="text-xs font-bold uppercase">
            Máscara de Subnet:
          </label>
          <input
            type="text"
            placeholder="Bits nueva MAC"
            value={maskNewMac}
            onChange={(e) => setMaskNewMac(e.target.value)}
            className="border px-2 py-1 rounded w-36"
          />
        </div>
      </div>

      {/* Mensaje de error */}
      {isSubnetInvalid && (
        <p className="text-red-600 font-medium text-sm">
          La nueva máscara no puede ser menor que la original.
        </p>
      )}

      {/* Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={onlyFirstLast}
          onChange={() => setOnlyFirstLast(!onlyFirstLast)}
        />
        <label className="text-sm font-medium">
          Calcular solo las primeras y últimas redes
        </label>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isDisabled}
        className={`px-6 py-2 rounded text-white font-semibold transition-colors duration-300 ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        CALCULAR
      </button>
    </form>
  );
};

export default SubnetInput;
