import { Copyright } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div
      className={`flex w-full flex-col sm:flex-row justify-center items-center gap-3 text-[#5F4A37] bg-[#f9efd1] py-4`}
    >
      <div className="flex items-center gap-3">
        <Copyright />
        <p>All rights reserved 2025</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <p>Built by :</p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Image
            src={"/assets/InscribeLogo.png"}
            width={50}
            height={50}
            alt="Inscribe Logo"
          />
          <Image
            src={"/assets/SDCLogo.png"}
            width={50}
            height={50}
            alt="SDC Logo"
          />
          <Image
            src={"/assets/GDGLogo.png"}
            width={50}
            height={50}
            alt="GDG Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
