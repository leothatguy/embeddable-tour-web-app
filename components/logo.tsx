import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative ">
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className="w-12 h-12"
        />
      </div>
      <span className="text-2xl font-bold gradient-text">Tourify</span>
    </div>
  );
};

export default Logo;
