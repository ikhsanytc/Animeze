import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  center?: boolean;
}

const Provider: React.FC<Props> = ({ children, center }) => {
  return (
    <div
      className={`bg-gradient-to-b from-black to-indigo-600 min-h-screen ${
        center && "flex justify-center items-center flex-col px-4"
      }`}
    >
      {children}
    </div>
  );
};

export default Provider;
