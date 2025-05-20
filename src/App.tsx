import React from "react";
import Header from "@/components/Header";
import SubnetInput from "@/components/SubnetInput";

const App: React.FC = () => {
  return (
    <>
      <Header title={"Calculadora de Subneteo"} />
      <main className="w-4/5 m-auto h-screen bg-primary font-primary grid grid-cols-2">
        <SubnetInput />
      </main>
    </>
  );
};

export default App;
