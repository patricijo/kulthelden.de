import Image from "next/image";
import { ReactNode } from "react";

type Probs = {
  image?: string | null;
  name: ReactNode;
};

export const BackdropImage = ({ image, name }: Probs) => {
  return (
    <div className="relative h-[60vh] w-full -mb-32">
      <div className="absolute inset-0 bg-black/60 z-10" />
      {image && typeof name == "string" && (
        <Image src={image} alt={name} fill className="object-cover" priority />
      )}
      <div className="relative z-20 mx-auto h-full flex flex-col items-center justify-center pb-32 px-8">
        <h1 className="text-white/90 text-4xl md:text-5xl font-bold drop-shadow-xl text-center">
          {name}
        </h1>
      </div>
    </div>
  );
};
