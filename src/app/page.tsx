import { articleService } from "@/services/article.service";
import HeroSection from "@/sections/home/HeroSection";
import DatNuocVaoXuanSection from "@/sections/home/DatNuocVaoXuanSection";
import BenChenTraXuanSection from "@/sections/home/BenChenTraXuanSection";
import SacMauGiaiTriSection from "@/sections/home/SacMauGiaiTriSection";
import ThreeColSection from "@/sections/home/ThreeColSection";
import TetAroundTownSection from "@/sections/home/TetAroundTownSection";
import ChucXuanSection from "@/sections/home/ChucXuanSection";

export default function HomePage() {
  const heroArticles = articleService.getHeroArticles();
  const datNuocArticles = articleService.getDatNuocVaoXuan();
  const benChenTraArticles = articleService.getBenChenTraXuan();
  const sacMauArticles = articleService.getSacMauGiaiTri();
  const tetMuonNoiArticles = articleService.getTetMuonNoi();
  const khatVongArticles = articleService.getKhatVongViet();
  const camNangArticles = articleService.getCamNangTet();
  const tetAroundTownArticles = articleService.getTetAroundTown();
  const chucXuanArticles = articleService.getChucXuan();

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-6">
      {/* Hero grid */}
      <HeroSection articles={heroArticles} />

      {/* Đất nước vào Xuân - unique layout */}
      <DatNuocVaoXuanSection articles={datNuocArticles} />

      {/* Bên chén trà Xuân */}
      <BenChenTraXuanSection articles={benChenTraArticles} />

      {/* Sắc màu giải trí */}
      <SacMauGiaiTriSection articles={sacMauArticles} />

      {/* 3-col: Tết muôn nơi | Khát vọng Việt | Cẩm nang Tết */}
      <ThreeColSection
        sections={[
          { title: "Tết muôn nơi", slug: "tet-muon-noi", articles: tetMuonNoiArticles },
          { title: "Khát vọng Việt", slug: "khat-vong-viet", articles: khatVongArticles },
          { title: "Cẩm nang Tết", slug: "cam-nang-tet", articles: camNangArticles },
        ]}
      />

      {/* Tết Around Town */}
      <TetAroundTownSection articles={tetAroundTownArticles} />

      {/* Chúc Xuân - mosaic layout */}
      <ChucXuanSection articles={chucXuanArticles} />

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
