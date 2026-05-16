import {
  heroArticles,
  datNuocVaoXuanArticles,
  benChenTraXuanArticles,
  sacMauGiaiTriArticles,
  tetMuonNoiArticles,
  khatVongVietArticles,
  camNangTetArticles,
  tetAroundTownArticles,
  chucXuanArticles,
} from "@/data/mock-data";
import { Article } from "@/types/article";

export const articleService = {
  getHeroArticles: (): Article[] => heroArticles,
  getDatNuocVaoXuan: (): Article[] => datNuocVaoXuanArticles,
  getBenChenTraXuan: (): Article[] => benChenTraXuanArticles,
  getSacMauGiaiTri: (): Article[] => sacMauGiaiTriArticles,
  getTetMuonNoi: (): Article[] => tetMuonNoiArticles,
  getKhatVongViet: (): Article[] => khatVongVietArticles,
  getCamNangTet: (): Article[] => camNangTetArticles,
  getTetAroundTown: (): Article[] => tetAroundTownArticles,
  getChucXuan: (): Article[] => chucXuanArticles,

  getArticleBySlug: (slug: string): Article | undefined => {
    const all = [
      ...heroArticles,
      ...datNuocVaoXuanArticles,
      ...benChenTraXuanArticles,
      ...sacMauGiaiTriArticles,
      ...tetMuonNoiArticles,
      ...khatVongVietArticles,
      ...camNangTetArticles,
      ...tetAroundTownArticles,
      ...chucXuanArticles,
    ];
    return all.find((a) => a.slug === slug);
  },
};
