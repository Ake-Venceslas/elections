import HeaderComponent from "@/components/header/HeaderComponents";
import HeroComponent from "@/components/hero/HeroComponents";
import FooterComponent from "@/components/footer/FooterComponents"
import Image from "next/image";

export default function Home() {
  return (
   <>
   <HeaderComponent />
   <HeroComponent />
   <FooterComponent />
   </>
  );
}
