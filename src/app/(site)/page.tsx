import { api } from "@/services/api";
import HeroSection from "@/sections/home/HeroSection";
import DatNuocVaoXuanSection from "@/sections/home/DatNuocVaoXuanSection";
import BenChenTraXuanSection from "@/sections/home/BenChenTraXuanSection";
import SacMauGiaiTriSection from "@/sections/home/SacMauGiaiTriSection";
import ThreeColSection from "@/sections/home/ThreeColSection";
import TetAroundTownSection from "@/sections/home/TetAroundTownSection";
import ChucXuanSection from "@/sections/home/ChucXuanSection";

export default async function HomePage() {
  const { hero, sections } = await api.home.getData();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <HeroSection articles={hero} />

      <DatNuocVaoXuanSection articles={sections.datNuocVaoXuan} />

      <BenChenTraXuanSection articles={sections.benChenTraXuan} />

      <SacMauGiaiTriSection articles={sections.sacMauGiaiTri} />

      <ThreeColSection
        sections={[
          { title: "Tết muôn nơi", slug: "tet-muon-noi", articles: sections.tetMuonNoi },
          { title: "Khát vọng Việt", slug: "khat-vong-viet", articles: sections.khatVongViet },
          { title: "Cẩm nang Tết", slug: "cam-nang-tet", articles: sections.camNangTet },
        ]}
      />

      <TetAroundTownSection articles={sections.tetAroundTown} />

      <ChucXuanSection articles={sections.chucXuan} />

      <div className="h-8" />
    </div>
  );
}
