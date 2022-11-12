import LogoDark from "../../assets/images/logos/monsterlogo.svg";
import Image from "next/image";
import Link from "next/link";
import LogoColor from "../../assets/images/logos/logo-no-background.svg"

const Logo = () => {
  return (
    <Link href="/">
        <Image src={LogoColor} alt="logo" width={200} />
    </Link>
  );
};

export default Logo;
