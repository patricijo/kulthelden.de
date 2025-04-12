import Image from "next/image";

type Probs = {
  image: string | null;
  name: string;
};

export const BackdropImage = ({ image, name }: Probs) => {
  return (
    <div className="relative h-[60vh] w-full -mb-32">
      <div className="absolute inset-0 bg-black/60 z-10" />
      {image !== null && (
        <Image src={image} alt={name} fill className="object-cover" priority />
      )}
      <div className="relative z-20 mx-auto h-full flex flex-col items-center justify-center pb-32 px-8">
        <h1 className="text-white/90 text-4xl md:text-5xl font-bold drop-shadow-xl">
          {name}
        </h1>
      </div>
    </div>
  );
};
