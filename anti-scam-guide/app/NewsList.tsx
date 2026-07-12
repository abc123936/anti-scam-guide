import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// 🌟 引入 Expo Router 的跳轉工具
import { useRouter } from "expo-router";

// 🌟 完整資料庫：100% 取自你上傳的 news_data2.json 所有效案件
const ALL_NEWS_DATA = [
  {
    id: "1",
    type: "重大判決",
    title: "1條命才判2年多？豐原5口命案一審判11年 老鄰居怒批：太輕了",
    date: "2026-05-20",
    summary:
      "台中「豐原5口命案」一家人因詐騙投資輕生，震驚全國。團購「李團長」李惠雯遭地院一審宣判11年徒刑。消息傳回鄰里，老鄰居感嘆一條命才判2年多，實在太輕，難怪台灣詐騙猖獗。",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
  },
  {
    id: "2",
    type: "假投資",
    title: "台股狂熱！ 基隆1民眾誤信臉書名師代操作炒股 被騙近2000萬元",
    date: "2026-05-20",
    summary:
      "基隆1名被害人誤信臉書一頁式廣告「名師代操作」投資股票，加入LINE投資群組。先後投入400、500萬元存款並變賣30多兩黃金，後續更將房子、車子拿去貸款並向親友借錢，共計被騙走約1900萬元。",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
  {
    id: "3",
    type: "官方通報",
    title:
      "Meta平臺占今年1至4月詐騙案件高達8成以上，政府要求強化演算法從源頭攔截",
    date: "2026-05-20",
    summary:
      "行政院打擊詐欺指揮中心指出，Meta旗下Facebook、Instagram與Threads已成臺灣詐騙主要來源管道，占比高達84.31%，財損占比更達86.2%，財損超過13億元。政府要求平臺改採「源源阻斷」策略。",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400",
  },
  {
    id: "4",
    type: "假檢警",
    title: "假檢警面交詐180萬元 要再騙150萬元警逮2車手",
    date: "2026-05-20",
    summary:
      "新北市板橋警分局員警在漢生東路一帶破獲假檢警詐騙案。55手蘇姓被害人遭詐團以涉及刑事案件、須監管帳戶為由，3天內面交180萬。詐團欲再索取150萬元時，遭埋伏警方逮獲面交車手與收水手。",
    img: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=400",
  },
  {
    id: "5",
    type: "愛情詐騙",
    title: "孫安佐表姊再捲愛情詐騙！誘宅男買寫真集+現金抖內 北檢追加起訴",
    date: "2026-05-19",
    summary:
      "網網紅林沐希（Ariel）涉及愛情詐騙案。近日再有4名被害人報案，指控林女等人以在外欠債、「爸爸死了、媽媽跑了且要照顧失智阿嬤」等謊言，誘騙被害人購買大量寫真集及抖內現金，北檢依法追加起訴。",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
  },
  {
    id: "6",
    type: "跨境犯罪",
    title: "假投資假戀愛狂削6000萬！四海幫宿霧機房17人全起訴 主嫌恐關25年",
    date: "2026-05-19",
    summary:
      "四海幫於菲律賓宿霧設立跨境詐欺機房，利用假投資與假戀愛手法瘋狂詐騙高達6000萬元。檢方偵結起訴17名成員，因主嫌犯罪次數眾多且毫無悔意，具體向法院求處有期徒刑25年。",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
  },
  {
    id: "7",
    type: "食安詐欺",
    title: "殭屍肉！鵝肉過期14年還在賣 高雄黑心食品商脫產遭起訴求處重刑",
    date: "2026-05-19",
    summary:
      "高雄柏昇冷凍食品公司負責人涉嫌長期將囤積長達14年的過期精緻肉品與「殭屍鵝肉」，改標、混充新鮮肉品販售給五星級飯店及餐廳。檢方依食品安全衛生管理法與加重詐欺等罪提起公訴，並建請從重量刑。",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
  },
  {
    id: "8",
    type: "防詐宣導",
    title: "苗郵與移民署苗栗服務站辦理金融保險及防詐宣導講座-新住民專場",
    date: "2026-05-20",
    summary:
      "為提升新住民防詐意識，苗栗郵局與移民署苗栗服務站合作辦理金融知識防詐宣導活動。透過實際案例分析常見詐騙手法，提醒新住民朋友可能因語言與文化差異容易成為鎖定對象，接獲 suspicious 訊息應多方查證。",
    img: "https://images.unsplash.com/photo-1577416416116-44490ae2576d?w=400",
  },
  {
    id: "9",
    type: "社區警政",
    title: "打詐、護交安、強化婦幼保護 南投警分局深入社區傾聽民意",
    date: "2026-05-20",
    summary:
      "南投警分局假名間鄉新街村活動中心辦理社區治安會議。會議中各業務單位透過影片及簡報方式，現場向民眾進行防詐騙宣導，深入了解基層居民需求，共同推動犯罪預防。",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
  },
  {
    id: "10",
    type: "政策防詐",
    title: "汽燃費更名「公路養管費」 認明「111」政府專屬簡訊嚴防詐騙",
    date: "2026-05-20",
    summary:
      "原汽車燃料使用費已正式更名為「公路使用養護安全管理費」（公路養管費）。由於近期電信詐騙頻傳，監理站特別提醒車主，認明政府專屬的「111」發送號碼簡訊，切勿點擊來源不明的繳費連結。",
    img: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=400",
  },
  {
    id: "11",
    type: "名人遭詐",
    title: "韓團演唱會投資騙局！康康、小刀等多名藝人遭詐騙超億元案開庭",
    date: "2026-05-20",
    summary:
      "一文創公司負責人聲稱邀請韓團TWICE和BTS來台舉辦演唱會，吸引多名投資人加入。事後被發現是一場精心設計的巨額騙局，共有15人受害，包括藝人康康、5566小刀等人，詐騙總金額超過1億2千萬元。",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
  },
  {
    id: "12",
    type: "反指標趣聞",
    title: "反指標女神巴逆逆被詐團盯上！網友笑稱：跟著她反向操作還賺錢",
    date: "2026-05-20",
    summary:
      "股民尊稱為「反指標女神」的網網紅巴逆逆，因其買什麼就跌什麼的體質成為焦點，沒想到近期也出現多起冒用她名字的假投資群組。網友歪樓喊：之前進去跟著詐團相反操作的人竟然賺錢了，確認群組是假的！",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400",
  },
  {
    id: "13",
    type: "跨境合作",
    title: "深化國際跨境司法合作研討會登場 邀請FBI、美國土安全署專家",
    date: "2026-05-20",
    summary:
      "法務部與台灣高等檢察署舉辦國際研討會，以「打擊詐欺為核心，從偵查手段到司法互助」為主題，邀請艾格蒙聯盟副主席以及美、歐、亞、非的國際專家來台，與國內檢警調共同分享與交流跨境科技偵查經驗。",
    img: "https://images.unsplash.com/photo-1521791136366-3eb296a6056f?w=400",
  },
  {
    id: "14",
    type: "阻詐實錄",
    title: "松山警耐心拆穿詐團「房屋修繕裝潢款」騙局 成功守住老翁200萬養老金",
    date: "2026-05-20",
    summary:
      "臺北市警察局松山分局中崙派出所接獲銀行通報。一名老翁欲提領200萬大額現金，聲稱是要支付房屋修繕裝潢費用。員警到場耐心關懷詢問並戳破詐騙話術，成功攔截詐騙，幫老翁守住辛苦一輩子的養老金。",
    img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400",
  },
  {
    id: "15",
    type: "冒名詐騙",
    title: "太歲爺上動土！台南市教育局遭冒名投放臉書廣告騙取民眾個資",
    date: "2026-05-19",
    summary:
      "不肖分子假冒「臺南市政府教育局」的名義在臉書投放廣告推銷課程，並提供LINE社群連結吸引民眾加入以意圖詐取個資。教育局第一時間通報165並報案，呼籲市民唯一認清「教育花路米」官方專頁。",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
  },
  {
    id: "16",
    type: "旅遊警訊",
    title: "防堵跨國詐騙與外國人非法打工 泰國全面收緊入境免簽政策",
    date: "2026-05-19",
    summary:
      "為防止跨國犯罪、詐騙集團機房設立及外國人非法打工，泰國內閣已批准外交部提案。計畫將現行60天免簽措施收緊，免簽天數砍半縮減至30天，同時將嚴格限制每人每年入境次數，前往旅遊的民眾需多加注意。",
    img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?w=400",
  },
  {
    id: "17",
    type: "金融阻詐",
    title: "蒜頭網購竟變提款陷阱 斗六警火速阻詐保住婦人血汗錢",
    date: "2026-05-20",
    summary:
      "雲林縣斗六市一名婦人在臉書購買蒜頭，因不慎誤入詐騙集團設下的「假賣場、假客服」連環套圈套。詐團企圖引導其操作ATM提款機轉帳，所幸斗六警方接獲通報及時趕往現場進行勸阻，順利保住血汗錢。",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400",
  },
  {
    id: "18",
    type: "大額詐騙",
    title: "假冒「網戀國外軍醫」誆手術費 太平警民聯手保住婦人5000美金",
    date: "2026-05-19",
    summary:
      "台中市太平區50歲婦人透過通訊軟體結識自稱旅居國外男子，陷入甜蜜攻勢後，對方佯稱長輩手術開刀急需美金5,000元醫藥費。婦人前往郵局匯款時因神色有異，行員隨即報警，在員警與行員勸阻下戳破網戀騙局。",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
  },
  {
    id: "19",
    type: "民生糾紛",
    title: "上班時間向病患推銷直銷營養品 兩醫護挨告涉詐領獎勵金獲不起訴",
    date: "2026-05-19",
    summary:
      "台北市立聯合醫院醫師及護理師遭院方控訴利用職務之便，在上班時間向病患推銷直銷保健食品，並隱匿兼職領取醫院獎勵金。北檢偵辦後認為獎金是醫院依照表現主動發給而非施用詐術，屬民事履約糾葛，予以不起訴處分。",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400",
  },
  {
    id: "20",
    type: "黑道潛逃",
    title: "百億賭王林秉文涉洗錢案 棄保潛逃魂斷柬埔寨 法院裁定公訴不受理",
    date: "2026-05-19",
    summary:
      "捲入「88會館」洗錢案的百億賭王林秉文，2024年底棄保潛逃。日前確認其在柬埔寨街頭遭槍手當街伏擊身亡。台灣新北地方法院在透過戶役政資訊確認其死亡事實後，依法速決裁定洗錢與詐欺案公訴不受理。",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
  },
  {
    id: "21",
    type: "移工犯罪",
    title: "遣返移工成破口！議員揭逃逸外勞失聯留下人頭帳戶、車輛淪詐團工具",
    date: "2026-05-19",
    summary:
      "台中市議員在議會質詢指出，因目前人頭帳戶價格暴漲，詐騙集團開始大量收購逃逸外勞遭遣返前所留下的手機門號、金融帳戶及機車等交通工具，將其轉化為犯罪工具。要求警方全面阻斷該新型黑市流通管道。",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
  },
  {
    id: "22",
    type: "政策爭議",
    title: "繳一輩子國保剛滿65歲過世給付全充公 民代痛批荒謬：國家級詐騙",
    date: "2026-05-19",
    summary:
      "有民眾抱怨長輩繳了一輩子國民年金保險，未料在剛滿65歲時不幸離世，導致多筆年金相關給付因法規限制皆無法請領。市議員質疑制度設計想方設法不把錢還給國民，怒批是國家級詐騙，強烈要求勞動部立即修法。",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
  },
];

export default function NewsList() {
  const router = useRouter(); // 🌟 宣告跳轉工具

  return (
    <SafeAreaView style={styles.safe}>
      {/* 頂部標題列 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1. 詐騙新聞相關</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 新聞捲動列表 */}
      <ScrollView contentContainerStyle={styles.container}>
        {ALL_NEWS_DATA.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.newsCard}
            activeOpacity={0.75}
            onPress={() => router.push(`/${item.id}`)} // 🚀 點擊帶着 ID 動態路由跳轉到詳情頁
          >
            {/* 左側：精美對應縮圖 */}
            <Image source={{ uri: item.img }} style={styles.newsImage} />

            {/* 右側：新聞排版欄位 */}
            <View style={styles.newsContent}>
              <View style={styles.tagRow}>
                <Text style={styles.typeTag}>{item.type}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.newsSummary} numberOfLines={3}>
                {item.summary}
              </Text>
              <Text style={styles.moreText}>閱讀全文 ›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 🌟 1. 維持白底，確保最上方的狀態列是乾淨的白色
  safe: { flex: 1, backgroundColor: "#ffffff" },

  // 🌟 2. 統一 Header 樣式（稍微加深一點底線 #e5e7eb，讓立體感更好）
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingHorizontal: 16,
  },

  // 🌟 3. 完美絕對置中關鍵：左右兩側寬度統一設定為 60
  backButton: {
    paddingVertical: 8,
    width: 60,
    justifyContent: "center",
  },
  placeholder: { width: 60 },

  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },

  // 🌟 4. 完美絕對置中關鍵：標題加上 flex: 1 與 textAlign: "center"
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },

  // --- 以下為你原本寫好的 NewsList 專屬樣式，完全維持不動 ---
  container: { padding: 16 },
  newsCard: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f9fafb",
    paddingBottom: 16,
  },
  newsImage: {
    width: 105,
    height: 105,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  newsContent: { flex: 1, marginLeft: 14, justifyContent: "space-between" },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  typeTag: {
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    fontSize: 11,
    fontWeight: "800",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newsDate: { fontSize: 11, color: "#9ca3af", fontWeight: "500" },
  newsTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 20,
    marginBottom: 4,
  },
  newsSummary: {
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 18,
    fontWeight: "500",
  },
  moreText: {
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
    textAlign: "right",
  },
});
