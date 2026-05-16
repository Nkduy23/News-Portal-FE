import { Article } from "@/types/article";
import { Category } from "@/types/category";

export const categories: Category[] = [
  { id: "1", slug: "dat-nuoc-vao-xuan", name: "Đất nước vào Xuân", nameVi: "Đất nước vào Xuân", color: "#E8435A" },
  { id: "2", slug: "ky-uc-lam-bao", name: "Ký ức làm báo", nameVi: "Ký ức làm báo", color: "#F97316" },
  { id: "3", slug: "ben-chen-tra-xuan", name: "Bên chén trà Xuân", nameVi: "Bên chén trà Xuân", color: "#10B981" },
  { id: "4", slug: "sac-mau-giai-tri", name: "Sắc màu giải trí", nameVi: "Sắc màu giải trí", color: "#8B5CF6" },
  { id: "5", slug: "tet-muon-noi", name: "Tết muôn nơi", nameVi: "Tết muôn nơi", color: "#EC4899" },
  { id: "6", slug: "khat-vong-viet", name: "Khát vọng Việt", nameVi: "Khát vọng Việt", color: "#F59E0B" },
  { id: "7", slug: "cam-nang-tet", name: "Cẩm nang Tết", nameVi: "Cẩm nang Tết", color: "#06B6D4" },
  { id: "8", slug: "chuc-xuan", name: "Chúc Xuân", nameVi: "Chúc Xuân", color: "#EF4444" },
  { id: "9", slug: "tet-around-town", name: "Tết Around Town", nameVi: "Tết Around Town", color: "#3B82F6" },
  { id: "10", slug: "vovvn", name: "VOV.VN", nameVi: "VOV.VN", color: "#14B8A6" },
];

export const navItems = [
  { label: "Đất nước vào xuân", slug: "dat-nuoc-vao-xuan" },
  { label: "Ký ức làm báo", slug: "ky-uc-lam-bao" },
  { label: "Bên chén trà xuân", slug: "ben-chen-tra-xuan" },
  { label: "Sắc màu giải trí", slug: "sac-mau-giai-tri" },
  { label: "Tết muôn nơi", slug: "tet-muon-noi" },
  { label: "Khát vọng Việt", slug: "khat-vong-viet" },
  { label: "Cẩm nang Tết", slug: "cam-nang-tet" },
  { label: "Tết Around Town", slug: "tet-around-town" },
  { label: "Chúc xuân", slug: "chuc-xuan" },
  { label: "VOV.VN", slug: "vovvn" },
];

// =========== FEATURED / HERO ===========
export const heroArticles: Article[] = [
  {
    id: "h1",
    slug: "bo-doi-ten-lua-phong-khong-sang-tao-chien-phap",
    title: "Bộ đội tên lửa phòng không sáng tạo chiến pháp cho người dân đón Tết, vui Xuân",
    thumbnail: "https://picsum.photos/seed/hero1/500/300",
    category: "Đất nước vào Xuân",
    categorySlug: "dat-nuoc-vao-xuan",
    publishedAt: "2026-01-25",
  },
  {
    id: "h2",
    slug: "nhung-nguoi-linh-mu-noi-xanh-don-tet",
    title: "Những người lính Mũ nồi xanh Việt Nam đón Tết ở nơi cách Tổ quốc vạn dặm",
    excerpt:
      "VOVVN - Không pháo hoa, không có sum vầy. Tất cả những người lính Mũ nồi xanh Việt Nam tại Cộng hòa Trung Phi là cả Tổ quốc, mầm cây quê nhà và những khoảnh khắc lắng nghe về nguồn gốc của mình trong hành trình giữ gìn hòa bình Liên hợp quốc.",
    thumbnail: "https://picsum.photos/seed/hero2/860/500",
    category: "Đất nước vào Xuân",
    categorySlug: "dat-nuoc-vao-xuan",
    publishedAt: "2026-01-25",
  },
  {
    id: "h3",
    slug: "tu-phien-giu-to-quoc-den-khat-vong-phat-trien",
    title: "Từ phiên giữ Tổ quốc đến khát vọng phát triển đất nước",
    thumbnail: "https://picsum.photos/seed/hero3/500/300",
    category: "Khát vọng Việt",
    categorySlug: "khat-vong-viet",
    publishedAt: "2026-01-24",
  },
  {
    id: "h4",
    slug: "mua-xuan-dau-tien-trong-nhung-ngoi-nha-moi",
    title: "Mùa xuân đầu tiên trong những ngôi nhà mới, thắp sáng niềm hy vọng",
    thumbnail: "https://picsum.photos/seed/hero4/500/300",
    category: "Tết muôn nơi",
    categorySlug: "tet-muon-noi",
    publishedAt: "2026-01-24",
  },
  {
    id: "h5",
    slug: "check-in-bat-mat-khong-lo-giua-hoa-ben-vinh-ha-long",
    title: "Check-in 'Bắt mắt' không lỡ giữa hoa bên vịnh Hạ Long",
    thumbnail: "https://picsum.photos/seed/hero5/500/300",
    category: "Tết Around Town",
    categorySlug: "tet-around-town",
    publishedAt: "2026-01-23",
  },
];

// =========== ĐẤT NƯỚC VÀO XUÂN ===========
// Layout: 1 large left + 2 stacked right (different from others)
export const datNuocVaoXuanArticles: Article[] = [
  {
    id: "dnvx1",
    slug: "gay-can-nhung-keo-vat-doi-nam-nu-ngay-khai-hoi-lang-trieu-khuc",
    title: "Gay cấn những keo vật đối nam nữ trong ngày khai hội làng Triệu Khúc",
    excerpt:
      "VOVVN - Trong khuôn khổ lễ hội truyền thống làng Triệu Khúc (phường Thanh Liệt, Hà Nội), những keo vật đối nam nữ hứa hẹn nóng bỏng khi ngày khai hội, trở thành tâm điểm thu hút đông đảo người dân và du khách thập phương.",
    thumbnail: "https://picsum.photos/seed/dnvx1/640/400",
    category: "Đất nước vào Xuân",
    categorySlug: "dat-nuoc-vao-xuan",
    publishedAt: "2026-01-25",
  },
  {
    id: "dnvx2",
    slug: "hue-to-chuc-le-hoi-den-huyen-tran-tuong-nho-nguoi-mo-coi",
    title: "Huế tổ chức lễ hội đến Huyền Trân, tưởng nhớ người mở cõi",
    excerpt:
      "VOVVN - Ngày 29/2, Sở Văn hóa và Thể thao tỉnh Huế tổ chức lễ hội đến Huyền Trân tại Trung tâm Văn hóa Huyền Trân ở núi Ngũ Phong, phường An Cựu với chủ đề 'Người vượng tiền nhân - Đầu thắng mở cõi'. Lễ hội đến ra trong không khí trang nghiêm, thành kính, thu hút đông đảo người dân và du khách.",
    thumbnail: "https://picsum.photos/seed/dnvx2/300/200",
    category: "Đất nước vào Xuân",
    categorySlug: "dat-nuoc-vao-xuan",
    publishedAt: "2026-01-24",
  },
  {
    id: "dnvx3",
    slug: "bun-tranh-vo-ngua-tai-le-hoi-truyen-thong-dua-ngua",
    title: "Bùn trắng võ ngựa tại Lễ hội truyền thống đua ngựa Gò Thì Thùng xuân Bình Ngọ",
    excerpt:
      "VOVVN - Đã từ ngàn xưa tới nay, ngày mồng 9 tháng Giêng hàng năm, là di tích lịch sử - văn hóa quốc gia đèo Gò Thì Thùng trung tâm là nơi đua ngựa truyền thống. Đây là lễ hội đông đảo người dân, đây đủ tính chất của khu vực miền Trung - Tây Nguyên, Hội đua ngựa càng ngày càng ý nghĩa hơn với người dân và đã diễn ra rồng nét Bình Ngọ.",
    thumbnail: "https://picsum.photos/seed/dnvx3/300/200",
    category: "Đất nước vào Xuân",
    categorySlug: "dat-nuoc-vao-xuan",
    publishedAt: "2026-01-23",
  },
  {
    id: "dnvx4",
    slug: "trai-nghiem-le-hoi-xuong-dong-cao-lan-sac-xuan-lang-ha-noi",
    title: "Trải nghiệm lễ hội Xuống Đồng của người Cao Lan trong sắc xuân giữa lòng Hà Nội",
    excerpt:
      "VOVVN - Không khổ sở khi 'Sắc Xuân trên mọi miền Tổ quốc 2026', đồng báo Cao Lan (Phú Thọ) đã tái hiện lễ hội Xuống Đồng tại Làng Văn hóa - Du lịch các dân tộc Việt Nam (Làng Văn hóa), xã Đoài Phương, TP Hà Nội.",
    thumbnail: "https://picsum.photos/seed/dnvx4/640/400",
    category: "Đất nước vào Xuân",
    categorySlug: "dat-nuoc-vao-xuan",
    publishedAt: "2026-01-22",
  },
];

// =========== BÊN CHÉN TRÀ XUÂN ===========
// Layout: row1 = 2 articles (left large + right with text), row2 = 2 articles (image + text only)
export const benChenTraXuanArticles: Article[] = [
  {
    id: "bctx1",
    slug: "dong-dao-nguoi-dan-doi-mua-du-le-khai-hoi-co-loa",
    title: "Đông đảo người dân đổi mua dự lễ khai hội Cổ Loa đầu năm",
    excerpt:
      "VOVVN - Lễ hội Cổ Loa không chỉ là hoạt động văn hóa – tín ngưỡng đầu xuân mà còn là dịp khai dậy niềm tự hào và truyền thống đứng nước và tinh thần, cùng cổ tinh thần đoàn kết cộng đồng.",
    thumbnail: "https://picsum.photos/seed/bctx1/560/320",
    category: "Bên chén trà Xuân",
    categorySlug: "ben-chen-tra-xuan",
    publishedAt: "2026-01-25",
  },
  {
    id: "bctx2",
    slug: "xuan-van-qua-day",
    title: "Xuân vẫn qua đây",
    excerpt:
      "VOVVN - Mùa xuân đi qua những cửa thư của Trần Thẳng mang những cảm xúc, đồi đắng, phố, của đất và làng in, của khoảnh khắc và sự sinh sôi và chín màn, của nhân duyên và cổ vị thương. 'Xuân vẫn qua đây' mang đến cho người đọc cảm xúc xuân sâu lắng và nhiều suy ngẫm.",
    thumbnail: "https://picsum.photos/seed/bctx2/560/320",
    category: "Bên chén trà Xuân",
    categorySlug: "ben-chen-tra-xuan",
    publishedAt: "2026-01-24",
  },
  {
    id: "bctx3",
    slug: "nu-hon-nhung-con-dau-khien-nguoi-ta-bung-linh",
    title: '"Nụ hôn" - Như những con đau khiến người ta bùng linh',
    thumbnail: "https://picsum.photos/seed/bctx3/200/180",
    category: "Bên chén trà Xuân",
    categorySlug: "ben-chen-tra-xuan",
    publishedAt: "2026-01-23",
  },
  {
    id: "bctx4",
    slug: "bai-tho-mai-nhu-dom-lua-nho-khuat-tu-dem-den",
    title: 'Bài thơ "Mai" - Như đốm lửa nhỏ khuất từ đêm đen',
    thumbnail: "https://picsum.photos/seed/bctx4/200/180",
    category: "Bên chén trà Xuân",
    categorySlug: "ben-chen-tra-xuan",
    publishedAt: "2026-01-22",
  },
];

// =========== SẮC MÀU GIẢI TRÍ ===========
// Layout: row1 = 1 large left (portrait) + 2 on right stacked, row2 = 4 equal cards
export const sacMauGiaiTriArticles: Article[] = [
  {
    id: "smgt1",
    slug: "anh-tu-atus-va-dau-an-trong-loat-phim-dien-anh-an-khach",
    title: "Anh Tú Atus và dấu ấn trong loạt phim điện ảnh ăn khách",
    thumbnail: "https://picsum.photos/seed/smgt1/400/500",
    category: "Sắc màu giải trí",
    categorySlug: "sac-mau-giai-tri",
    publishedAt: "2026-01-25",
  },
  {
    id: "smgt2",
    slug: "nguoi-dan-thu-do-no-luc-du-le-hoi-go-dong-da-xuan-binh-ngo",
    title: "Người dân Thủ đô nỗ lực dự Lễ hội Gò Đống Đa xuân Bình Ngọ 2026",
    thumbnail: "https://picsum.photos/seed/smgt2/300/200",
    category: "Sắc màu giải trí",
    categorySlug: "sac-mau-giai-tri",
    publishedAt: "2026-01-24",
  },
  {
    id: "smgt3",
    slug: "ve-dien-trai-cua-hai-nam-chinh-trong-phim-tet-tho-oi",
    title: 'Vẻ điển trai của hai nam chính trong phim Tết "Thố ơi!!"',
    thumbnail: "https://picsum.photos/seed/smgt3/300/200",
    category: "Sắc màu giải trí",
    categorySlug: "sac-mau-giai-tri",
    publishedAt: "2026-01-24",
  },
  {
    id: "smgt4",
    slug: "giu-hon-van-hoa-dao-do-tu-nghe-thieu-le-phuc-cap-sac",
    title: "Giữ hồn văn hóa Dao đỏ từ nghề thiêu lễ phục cấp sắc",
    thumbnail: "https://picsum.photos/seed/smgt4/300/200",
    category: "Sắc màu giải trí",
    categorySlug: "sac-mau-giai-tri",
    publishedAt: "2026-01-23",
  },
  {
    id: "smgt5",
    slug: "nhan-sac-nu-dien-vien-dong-cung-voi-nghe-si-xuan-hinh-trong-mui-pho",
    title: 'Nhan sắc nữ diễn viên đóng cùng với nghệ sĩ Xuân Hinh trong "Mùi phố"',
    thumbnail: "https://picsum.photos/seed/smgt5/300/200",
    category: "Sắc màu giải trí",
    categorySlug: "sac-mau-giai-tri",
    publishedAt: "2026-01-23",
  },
  {
    id: "smgt6",
    slug: "le-hoi-tam-blang-mprang-bon-niem-tu-hao-cua-nguoi-m-nong",
    title: "Lễ hội Tâm Blang M'prang bon – Niềm tự hào của người M'nông",
    thumbnail: "https://picsum.photos/seed/smgt6/300/200",
    category: "Sắc màu giải trí",
    categorySlug: "sac-mau-giai-tri",
    publishedAt: "2026-01-22",
  },
];

// =========== TẾT MUÔN NƠI ===========
export const tetMuonNoiArticles: Article[] = [
  {
    id: "tmn1",
    slug: "don-xuan-que-huong-2026-tai-bangladesh",
    title: "Đón Xuân Quê hương 2026 tại Bangladesh",
    excerpt:
      "VOVVN - Ngày 6/3 tại thủ đô Dhaka, Đại sứ quán Việt Nam tại Bangladesh và Ban Liên lạc cộng đồng người Việt Nam đã tổ chức chương trình Xuân Quê hương 2026 với sự tham dự đông đảo bà con kiều bào và bạn bè Bangladesh.",
    thumbnail: "https://picsum.photos/seed/tmn1/560/350",
    category: "Tết muôn nơi",
    categorySlug: "tet-muon-noi",
    publishedAt: "2026-01-25",
  },
  {
    id: "tmn2",
    slug: "tet-lang-net-van-hoa-rieng-co-cua-nguoi-dao-quan-chet",
    title: "Tết làng – Nét văn hóa riêng có của người Dao Quần Chẹt",
    thumbnail: "",
    category: "Tết muôn nơi",
    categorySlug: "tet-muon-noi",
    publishedAt: "2026-01-24",
  },
  {
    id: "tmn3",
    slug: "co-yet-thanh-hoang-le-thua-gui-mua-xuan-can-vang-trong-khoi-tet-pho-co",
    title: "Cổ Yết Thành Hoàng – Lễ thưa gửi mùa xuân còn vang trong khói Tết phố cổ",
    thumbnail: "",
    category: "Tết muôn nơi",
    categorySlug: "tet-muon-noi",
    publishedAt: "2026-01-23",
  },
];

// =========== KHÁT VỌNG VIỆT ===========
export const khatVongVietArticles: Article[] = [
  {
    id: "kvv1",
    slug: "tan-thanh-group-hanh-trinh-17-nam-dung-xay-uy-tin-kien-tao-gia-tri-ben-vung",
    title: "Tân Thành Group: Hành trình 17 năm dựng xây uy tín, kiến tạo giá trị bền vững",
    excerpt:
      "VOVVN - 17 năm chưa phải là chặng đường quá dài, nhưng Tân Thành Group đã chứng minh năng lực, bản lĩnh bằng sự kiến tạo những công trình trong điểm đóng không gian sống mới, đầy tinh nhân văn.",
    thumbnail: "https://picsum.photos/seed/kvv1/560/350",
    category: "Khát vọng Việt",
    categorySlug: "khat-vong-viet",
    publishedAt: "2026-01-25",
  },
  {
    id: "kvv2",
    slug: "evgenco2-phat-trien-xanh-ben-vung-dam-an-ninh-nang-luong-quoc-gia",
    title: "EVNGENCO2 phát triển xanh, bền vững đảm an ninh năng lượng quốc gia",
    thumbnail: "",
    category: "Khát vọng Việt",
    categorySlug: "khat-vong-viet",
    publishedAt: "2026-01-24",
  },
  {
    id: "kvv3",
    slug: "ford-viet-nam-dat-doanh-so-ky-luc-hon-50000-xe-nam-2025",
    title: "Ford Việt Nam đạt doanh số kỷ lục – hơn 50.000 xe năm 2025",
    thumbnail: "",
    category: "Khát vọng Việt",
    categorySlug: "khat-vong-viet",
    publishedAt: "2026-01-23",
  },
];

// =========== CẨM NANG TẾT ===========
export const camNangTetArticles: Article[] = [
  {
    id: "cnt1",
    slug: "ban-van-hoa-du-lich-phieng-loi-don-xuan-sang",
    title: "Bản văn hóa du lịch Phiềng Lơi đón xuân sang",
    excerpt:
      "VOVVN - Cách trung tâm thành phố Điện Biên Phủ chưa đầy là phường Điện Biên Phủ, tỉnh Điện Biên chừng 7km, bản văn hóa du lịch Phiềng Lơi được biết đến là điểm đến lý tưởng với du khách khi có cập đến với Điện Biên và vùng Tây Bắc.",
    thumbnail: "https://picsum.photos/seed/cnt1/560/350",
    category: "Cẩm nang Tết",
    categorySlug: "cam-nang-tet",
    publishedAt: "2026-01-25",
  },
  {
    id: "cnt2",
    slug: "vi-sao-khong-nen-an-qua-nhieu-thit-bo",
    title: "Vì sao không nên ăn quá nhiều thịt bò",
    thumbnail: "",
    category: "Cẩm nang Tết",
    categorySlug: "cam-nang-tet",
    publishedAt: "2026-01-24",
  },
  {
    id: "cnt3",
    slug: "viet-nam-co-the-mau-tim-gia-re-beo-bo-duong-du-dung-lai-ngua-ca-ung-thu",
    title: "Việt Nam có thể mẫu tím giá rẻ, béo bở, đứng đủ đứng lại ngựa cả ung thư",
    thumbnail: "",
    category: "Cẩm nang Tết",
    categorySlug: "cam-nang-tet",
    publishedAt: "2026-01-23",
  },
];

// =========== TẾT AROUND TOWN ===========
// Layout: row1 = 3 small cards, row2 = 1 large + text articles
export const tetAroundTownArticles: Article[] = [
  {
    id: "tat1",
    slug: "crowds-gather-at-hanoi-temples-for-first-full-moon-festival",
    title: "Crowds gather at Hanoi temples, pagodas for First Full Moon Festival prayers",
    thumbnail: "https://picsum.photos/seed/tat1/200/160",
    category: "Tết Around Town",
    categorySlug: "tet-around-town",
    publishedAt: "2026-01-25",
  },
  {
    id: "tat2",
    slug: "why-the-full-moon-of-the-first-lunar-month-matters-so-much-in-vietnam",
    title: "Why the Full Moon of the First Lunar Month matters so much in Vietnam",
    thumbnail: "https://picsum.photos/seed/tat2/200/160",
    category: "Tết Around Town",
    categorySlug: "tet-around-town",
    publishedAt: "2026-01-25",
  },
  {
    id: "tat3",
    slug: "thousands-flock-to-once-a-year-vieng-market-for-overnight-spring-fair",
    title: "Thousands flock to once-a-year Vieng Market for overnight spring fair",
    thumbnail: "https://picsum.photos/seed/tat3/200/160",
    category: "Tết Around Town",
    categorySlug: "tet-around-town",
    publishedAt: "2026-01-24",
  },
  {
    id: "tat4",
    slug: "ho-chi-minh-city-attractions-see-20-percent-surge-in-visitors-during-tet",
    title: "Ho Chi Minh City attractions see 20% surge in visitors during Tết",
    excerpt:
      "VOVVN – Major entertainment venues in Ho Chi Minh City were filled with families and tourists enjoying the festive atmosphere on February 21, the fifth day of the Lunar New Year (Tết), with some destinations reporting a significant rise in visitor numbers compared to last year.",
    thumbnail: "https://picsum.photos/seed/tat4/500/340",
    category: "Tết Around Town",
    categorySlug: "tet-around-town",
    publishedAt: "2026-01-24",
  },
  {
    id: "tat5",
    slug: "traditional-attire-finds-new-life-in-modern-cultural-landscape",
    title: "Traditional attire finds new life in modern cultural landscape",
    excerpt: "VOVVN – In recent years, traditional Vietnamese attire, once largely confined to museums, academic texts, and ceremonial occasions, has re-emerged vibrantly in urban cultural life.",
    thumbnail: "https://picsum.photos/seed/tat5/300/220",
    category: "Tết Around Town",
    categorySlug: "tet-around-town",
    publishedAt: "2026-01-23",
  },
];

// =========== CHÚC XUÂN ===========
// Layout: completely different - mosaic/collage style with varied card sizes
export const chucXuanArticles: Article[] = [
  {
    id: "cx1",
    slug: "nghe-si-xuan-hinh-hoa-minsy-chuc-tet-doc-gia-vov-xuan-binh-ngo-2026",
    title: "Nghệ sĩ Xuân Hinh, Hòa Minzy... chúc Tết độc giả VOV xuân Bình Ngọ 2026",
    thumbnail: "https://picsum.photos/seed/cx1/300/200",
    category: "Chúc Xuân",
    categorySlug: "chuc-xuan",
    publishedAt: "2026-01-25",
  },
  {
    id: "cx2",
    slug: "khuat-van-khang-va-cac-vdv-chuc-tet-vov",
    title: "Khuất Văn Khang và các VĐV chúc tết thao Việt Nam chúc Tết độc giả VOV.VN",
    thumbnail: "https://picsum.photos/seed/cx2/300/200",
    category: "Chúc Xuân",
    categorySlug: "chuc-xuan",
    publishedAt: "2026-01-25",
  },
  {
    id: "cx3",
    slug: "dan-nghe-si-viet-gui-loi-chuc-tet-gia-bao-dien-tu-vov-xuan-at-ty-2025",
    title: "Dàn nghệ sĩ Việt gửi lời chúc Tết đến gia báo Điện tử VOV Xuân Ất Tỵ 2025",
    thumbnail: "https://picsum.photos/seed/cx3/640/360",
    category: "Chúc Xuân",
    categorySlug: "chuc-xuan",
    publishedAt: "2026-01-24",
  },
  {
    id: "cx4",
    slug: "nhung-loi-chuc-tet-binh-ngo-2026-hay-doc-dao-va-9-nghia-nhat",
    title: "Những lời chúc Tết Bình Ngọ 2026 hay, độc đáo và ý nghĩa nhất",
    thumbnail: "https://picsum.photos/seed/cx4/300/200",
    category: "Chúc Xuân",
    categorySlug: "chuc-xuan",
    publishedAt: "2026-01-24",
  },
  {
    id: "cx5",
    slug: "video-chu-tich-nuoc-luong-cuong-chuc-tet-giao-thoi-xuan-at-ty-2025",
    title: "Video Chủ tịch nước Lương Cường chúc Tết giao thời Xuân Ất Tỵ 2025",
    thumbnail: "https://picsum.photos/seed/cx5/300/200",
    category: "Chúc Xuân",
    categorySlug: "chuc-xuan",
    publishedAt: "2026-01-23",
  },
];
