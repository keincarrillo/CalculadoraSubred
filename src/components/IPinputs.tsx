import { useState } from "react";
import {
  shouldDisableSubmit,
  isSubnetInvalid,
  maskMacInvalid,
  ipInvalid,
} from "@/utils/subnetUtils";
import { subnetCalc } from "@/utils/subnetCalc";

const MASK_OPTIONS = ["8", "16", "24"];

const IPinputs = () => {
  // Estado unico para agrupar los valores
  const [formValues, setFormValues] = useState({
    ip: "",
    maskMac: "",
    maskNewMac: "",
  });

  // Manejador generico para inputs y selects
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Validaciones
  const subnetInvalid = isSubnetInvalid(
    formValues.maskMac,
    formValues.maskNewMac
  );

  const isMaskNewMacInvalid = maskMacInvalid(Number(formValues.maskNewMac));

  const isIpInvalid = ipInvalid(formValues.ip);

  const isDisabled = shouldDisableSubmit(
    formValues.ip,
    formValues.maskMac,
    formValues.maskNewMac,
    subnetInvalid,
    isIpInvalid
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    subnetCalc(formValues.ip, formValues.maskMac, formValues.maskNewMac);
  };

  return (
    <form
      className="flex flex-col items-center gap-4 text-black mt-10"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <div className="flex flex-col items-start">
          <label className="text-xs font-bold uppercase" htmlFor="ip">
            Dirección IP:
          </label>
          <input
            id="ip"
            name="ip"
            type="text"
            placeholder="Host o Network"
            className="border px-2 py-1 rounded w-36"
            value={formValues.ip}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center -mb-4">
          <span className="font-bold text-lg">/</span>
        </div>

        <div className="flex flex-col items-start">
          <label className="text-xs font-bold uppercase" htmlFor="maskMac">
            Máscara de red:
          </label>
          <select
            id="maskMac"
            name="maskMac"
            className="border px-2 py-1 rounded w-32"
            value={formValues.maskMac}
            onChange={handleInputChange}
          >
            <option value="">Selecciona</option>
            {MASK_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center -mb-4">
          <span className="uppercase text-sm font-semibold">Mover a</span>
        </div>

        <div className="flex flex-col items-start">
          <label className="text-xs font-bold uppercase" htmlFor="maskNewMac">
            Máscara de Subnet:
          </label>
          <input
            id="maskNewMac"
            name="maskNewMac"
            type="number"
            placeholder="Bits nueva MAC"
            className="border px-2 py-1 rounded w-36"
            value={formValues.maskNewMac}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {subnetInvalid && (
        <p className="text-red-600 font-medium text-sm">
          La nueva máscara no puede ser menor que la original.
        </p>
      )}

      {isIpInvalid && (
        <p className="text-red-600 font-medium text-sm">
          Dirección IP inválida.
        </p>
      )}

      {isMaskNewMacInvalid && (
        <p className="text-red-600 font-medium text-sm">
          La máscara de subnet debe ser un número entre 0 y 32.
        </p>
      )}

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

export default IPinputs;
