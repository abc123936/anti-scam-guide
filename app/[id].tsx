import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// 🌟 連結 100% 修正直達內文、無任何系統標籤的乾淨資料庫
const ALL_NEWS_DETAILS: { [key: string]: { title: string; date: string; type: string; img: string; content: string; url: string; source_name: string } } = {
  "1": {
    type: "重大判決",
    title: "1條命才判2年多？豐原5口命案一審判11年 老鄰居怒批：太輕了",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600",
    url: "https://tw.news.yahoo.com/%E8%B1%90%E5%8E%9F5%E5%8F%A3%E6%A1%88-%E5%AF%A9%E9%87%8D%E5%88%A411%E5%B9%B4-%E5%AA%B2%E5%A9%BF%E7%97%9B%E8%A8%B4-%E5%A4%AA%E8%BC%95%E4%BA%86-%E7%8E%8B%E5%AE%B6%E5%BE%8B%E5%B8%AB-%E6%9C%83%E4%B8%8A%E8%A8%B4-024120490.html",
    source_name: "Yahoo 新聞",
    content: "台中「豐原5口命案」一家人因詐騙投資輕生，震驚全國。主嫌「李團長」李惠雯涉嫌利用「黃金代購」等虛假投資方案對王家進行「養套殺」。\n\n地院審理認定，李女以龐氏騙局非法吸金逾1568萬元。當王家察覺被騙欲退出時，李女竟傳送恐嚇言語與割腕流血的照片進行長期心理虐待，強索530萬元違約金，逼得王家押屋償債，最終五口在密室內不堪精神與金錢雙重高壓，集體走上絕路。\n\n台中地院一審依非經營收受存款業務、詐欺得利、恐嚇取財等5罪判李女 11 年徒刑。痛失5名至親的王家二女婿朱男與老鄰居怒批判決實在太輕，1條命才判2年多，明顯不符合社會期待，難怪台灣詐騙如此猖獗。"
  },
  "2": {
    type: "假投資",
    title: "台股狂熱！ 基隆1民眾誤信臉書名師代操作炒股 被騙近2000萬元",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
    url: "https://tw.news.yahoo.com/%E5%8F%B0%E8%82%A1%E7%8B%82%E7%86%B1-%E5%9F%BA%E9%9A%861%E6%B0%A1%E8%AA%A4%E4%BF%A1%E8%87%89%E6%9B%B8%E5%90%8D%E5%B8%AB%E4%BB%A3%E6%93%8D%E4%BD%9C%E7%82%92%E8%82%A1-%E8%A2%AB%E9%A8%99%E8%BF%912000%E8%90%AC%E5%85%83-071514801.html",
    source_name: "Yahoo 新聞",
    content: "台股發燒，不少股民湧入投資，讓詐騙集團藉由股市熱潮大肆「假投資」詐騙。基隆市警察局局長林信雄於「打詐儀錶板」記者會特別提到這起慘痛個案。\n\n個案被害人是在臉書一頁式廣告看到「名師代操作」投資股票，進而加入詐團設置的LINE投資群組，隨後便有專人聯絡.被害人深信不疑，先後投入了400、500萬元存款，甚至變賣30多兩黃金。\n\n隨後聽信詐團話術，又將房子、車子拿去辦理信用貸款與抵押貸款，還向親友借了500多萬元，共計投入約1900萬元，最終血本無歸。原定提領獲利，才驚覺這是一場騙局。"
  },
  "3": {
    type: "官方通報",
    title: "Meta平臺占今年1至4月詐騙案件高達8成以上，政府要求強化演算法從源頭攔截",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600",
    url: "https://www.ithome.com.tw/news/175998",
    source_name: "iThome 科技週刊",
    content: "行政院打擊詐欺指揮中心公布最新統計指出，Meta旗下Facebook、Instagram與Threads已成臺灣詐騙主要來源管道。2026年1月至4月期間，臺灣詐騙案件中涉及Meta所屬社群平臺的案件高達1.4萬件，占比高達84.31%。\n\n這類平台造成的財損占比更達到總金額的86.2%，民眾受騙損失超過新台幣13.6億元。政府已正式向Meta提出強烈要求，平臺必須從演算法與偵測機制著手，改採「源頭阻斷」策略，否則未來不排除透過修法加重平臺責任與罰則。"
  },
  "4": {
    type: "假檢警",
    title: "假檢警面交詐180萬元 要再騙150萬元警逮2車手",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=600",
    url: "https://tw.news.yahoo.com/%E5%81%99%E6%AA%A2%E8%AD%A6%E9%9D%A2%E4%BA%A4%E8%A9%90180%E8%90%AC%E5%85%83-%E8%A6%81%E5%86%8D%E9%A8%99150%E8%90%AC%E5%85%83%E8%AD%A6%E5%B5%902%E8%BB%8A%E6%89%8B-062128148.html",
    source_name: "Yahoo 新聞",
    content: "新北市板橋警分局員警，在板橋區漢生東路一帶破獲起惡劣的假檢警面交詐騙案，當場逮獲60歲張姓女面交車手及接應的57歲陳姓男收水手。\n\n警方調查，55歲蘇姓被害人在5月12日接獲自稱檢警人員的詐騙集團來電，誆稱她涉嫌刑事洗錢案件，必須將身上資金與銀行帳戶交由司法機關進行監管查扣。\n\n被害人因心生恐懼不疑有他，依照指示在3天內與車手見面面交了180萬元。詐團食髓知味，今日企圖再約面交150萬元，被害人報警配合，埋伏員警當場將前來取款的兩名車手現行犯逮捕法辦。"
  },
  "5": {
    type: "愛情詐騙",
    title: "孫安佐表姊再捲愛情詐騙！誘宅男買寫真集+現金抖內 北檢追加起訴",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    url: "https://tw.news.yahoo.com/%E5%AD%AB%E5%AE%89%E4%BD%90%E8%A1%A8%E5%A7%8A%E6%B6%89%E6%84%9B%E6%83%85%E8%A9%90%E9%A8%99-%E5%8F%88%E6%9C%89%E7%94%B7%E5%AD%90%E5%A0%B1%E6%A1%88-%E6%AA%A2%E8%BF%BD%E5%8A%A0%E8%B5%B7%E8%A8%B4-090900508.html",
    source_name: "Yahoo 新聞",
    content: "藝人孫鵬與狄鶯的獨子孫安佐涉槍械案引發關注，其網紅表姊林沐希（Ariel）也涉嫌跨入愛情詐騙集團。林女去年9月才因涉嫌誘騙多名男子購買大量寫真集、詐騙財物遭北檢起訴求刑5年。\n\n新聞曝光後，又有4名被害男子出面報案，指控林女編織愛情陷阱，在網路上謊稱自己在外欠債、「爸爸死了、媽媽跑了且要照顧失智阿嬤」，裝可憐誘騙被害人掏錢。\n\n被害人基於憐憫與愛慕，瘋狂抖內現金或購買寫真集，有人被騙高達50多萬元。台北地檢署偵辦後，認定林女等人涉犯《刑法》加重詐欺罪，今日對林沐希等6名成員追加起訴。"
  },
  "6": {
    type: "跨境犯罪",
    title: "假投資假戀愛狂削6000萬！四海幫宿霧機房17人全起訴 主嫌恐關25年",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600",
    url: "https://tw.news.yahoo.com/%E5%81%99%E6%8A%95%E8%B3%87%E5%81%99%E6%88%80%E6%84%9B%E7%8B%82%E5%89%8A6000%E8%90%AC-%E5%9f%9B%E6%B5%A8%E5%B9%AB%E5%AE%BF%E9%9C%A7%E6%A9%9F%E6%BF%BB17%E4%BA%BA%E5%85%A8%E8%B5%B7%E8%A8%B4-%E4%B8%BB%E5%AB%8C%E6%81%90%E9%17%9C25%E5%B9%B4-134748256.html",
    source_name: "Yahoo 新聞",
    content: "台中地檢署偵破一起重大黑幫跨境詐騙案。四海幫成員陳麒元等人，於菲律賓宿霧設立遠端電信詐欺機房，招募並囚禁台灣人出境從事非法詐騙，利用假投資、泰國虛擬貨幣及假戀愛交友等連環套話術，在兩年內瘋狂坑殺兩岸民眾高達6000萬元。\n\n檢警兵分多路與海外執法單位配合，成功將機房瓦解並押解嫌犯回台。檢方指出，陳麒元等15名核心主嫌在犯後始終狡辯、矢口否認犯行，教唆串供滅證，毫無悔意。\n\n因犯罪次數眾多、金額巨大、手段惡劣，檢察官依法起訴集團共17人，並具體向法院對主嫌陳麒元求處25年有期徒刑。"
  },
  "7": {
    type: "食安詐欺",
    title: "殭屍肉！鵝肉過期14年還在賣 高雄黑心食品商脫產遭起訴求處重刑",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    url: "https://tw.news.yahoo.com/%E8%95%AD%E5%B1%8D%E8%82%89-%E9%B5%9D%E8%82%89%E9%81%8E%E6%9C%9F14%E5%B9%B4%E9%82%84%E5%9C%A8%E8%B3%A3-%E9%BB%91%E5%BF%83%E5%A4%AB%E5%A6%BB%E8%A2%AB%E8%A8%B4-121000570.html",
    source_name: "Yahoo 新聞",
    content: "橋頭地檢署日前偵結一起震驚全國的黑心肉品加工案。高雄市仁武區食品商柏昇冷凍食品公司，其負責人謝勝全、林桂菊夫妻，涉嫌長期將囤積在冷凍庫、長達14年的過期精緻肉品與「殭屍鵝肉、過期老雞肉」，透過藥水浸泡洗滌消臭、塗改保鮮標籤日期等手法，當作新鮮優質肉品混充販售給中南部多家五星級飯店、高級婚宴餐廳。\n\n檢調搜索時驚見大量早已變色發黑的腐肉。檢察官痛批這對黑心夫妻為謀暴利不顧國民健康，且在案發後態度極其不佳，更早已偷偷將名下財產全數轉移脫產。檢方今日依違反《食品安全衛生管理法》、三人以上加重詐欺取財等罪嫌對夫妻提起公訴，對公司求處500萬元罰金，並建請法院從重量刑。"
  },
  "8": {
    type: "防詐宣導",
    title: "苗郵與移民署苗栗服務站辦理金融保險及防詐宣導講座-新住民專場",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1577416416116-44490ae2576d?w=600",
    url: "https://tw.news.yahoo.com/%E8%8B%97%E9%83%B5%E8%88%87%E7%A7%BB%E6%B0%91%E7%BD%B2%E8%8B%97%E6%A0%97%E6%9C%8D%E5%8B%99%E7%AB%99%E8%BE%A6%E7%90%86%E9%87%91%E8%9E%8D%E4%BF%9D%E9%9A%AA%E5%8F%8A%E9%98%B2%E8%A9%90%E5%A6%A3%E5%B0%8E%E8%AC%9B%E5%BA%A7-%E6%96%B0%E4%BD%8F%E6%B0%91%E5%B0%88%E5%A0%B4-071645151.html",
    source_name: "Yahoo 新聞",
    content: "隨著數位金融與智慧網路交易日益普及，詐騙案件型態與話術也持續翻新。為提升新住民朋友的金融安全觀念與防詐騙意識，苗栗郵局與內政部移民署苗栗縣服務站進行跨部門合作。\n\n雙方在「苗南區新住民家庭服務中心」共同辦理一場金融保險知識暨防詐騙宣導講座，協助剛來到台灣的新住民融入在地生活，並補足基礎金融安全知識。\n\n郵局專員在現場指出，新住民朋友常因語言溝通障礙、文化隔閡以及法律資訊取得的落差，往往成為詐騙集團精準鎖定的高風險對象。若接獲涉及網購解除分期、帳戶凍結等可疑電話與訊息，應撥打165專線，切勿輕易匯款。"
  },
  "9": {
    type: "社區警政",
    title: "打詐、護交安、強化婦幼保護 南投警分局深入社區傾聽民意",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
    url: "https://tw.news.yahoo.com/%E6%89%93%E8%A9%90-%E8%AD%B7%E4%BA%A4%E5%AE%89-%E5%BC%B7%E5%8C%96%E5%A9%A6%E5%B9%BC%E4%BF%9D%E8%AD%B7-%E5%8D%97%E6%8A%95%E8%AD%A6%E5%88%86%E5%B1%80%E6%B7%B1%E5%85%A5%E7%A4%BE%E5%8D%85%E5%82%BE%E8%81%BD%E6%B0%91%E6%84%8F-063311890.html",
    source_name: "Yahoo 新聞",
    content: "南投警分局為廣納各區基層民意、蒐集第一線社會治安資訊並落實「警政社區化」的理念，日前特別假名間鄉新街村活動中心辦理115年度社區治安座談會議。\n\n現場由新街派出所所長張裕奇主持，邀請多位鄉民代表、村長、朝盛宮主委、地方志工與鄉親共50多人共襄盛舉，警民面對面交流。\n\n座談會中，警方透過精心剪輯的防詐宣導短片及詳細統計簡報，向長輩與民眾重點拆解了時下最猖獗的「假投資廣告」，期盼藉由鄰里間的聯防力量，建構社區犯罪預防網。"
  },
  "10": {
    type: "政策防詐",
    title: "汽燃費更名「公路養管費」 認明「111」政府專屬簡訊嚴防詐騙",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=600",
    url: "https://tw.news.yahoo.com/%E6%B1%BD%E7%83%AD%E8%B2%BB%E6%9B%B4%E5%90%8D-%E5%85%AC%E8%B7%AF%E9%A4%8A%E7%AE%A1%E8%B2%BB-%E8%AA%8D%E6%98%8E-111-%E7%B0%A1%E8%A8%8A%E5%9A%B4%E9%98%B2%E8%A9%90%E1%A8%99-054513689.html",
    source_name: "Yahoo 新聞",
    content: "陪伴廣大車主多年的「汽車燃料使用費」在《公路法》完成修法後，已正式走入歷史。自去年12月起正式更名為「公路使用養護安全管理費」（公路養管費）。\n\n豐原監理站特別發出通報，雖然開徵名稱改變，計費標準與管道維持不變。近期全台出現大量冒用監理站名義的電信催繳簡訊詐騙。\n\n監理站呼籲所有車主，政府官方發送的簡訊已全面改採「111」專屬特碼號碼。若收到非111發送、夾帶不明短網址（如要求輸入信用卡驗證、收取補繳費用）的簡訊，百分之百是詐騙。"
  },
  "11": {
    type: "名人遭詐",
    title: "韓團演唱會投資騙局！康康、小刀等多名藝人遭詐騙超億元案開庭",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
    url: "https://tw.news.yahoo.com/%E5%BA%B7%E5%BA%B7%E7%8F%BE%E8%BA%AB%E5%8C%97%E6%AA%A2%E5%BC%95%E7%B2%89%E7%B5%B2%E9%97%9C%E5%BF%83-%E5%87%BA%E5%BA%AD%E7%84%A1%E5%A5%88%E5%91%9F-%E5%8F%8D%E7%9C%81%E8%87%AA%E5%B7%B1-052838421.html",
    source_name: "Yahoo 新聞",
    content: "台北地檢署審理一起演藝圈巨額投資詐騙案。一名顏姓文創公司負責人夥同同夥，在過去6年內，涉嫌向多名流行演藝圈知名人士謊稱「成功取得韓國超人氣天團TWICE和BTS防彈少年團來台舉辦演唱會的獨家代理權」，誘騙眾人簽署投資合約。\n\n事後該項目被證實是一場徹頭徹尾的跨年吸金騙局。受害者包括知名藝人康康、5566成員小刀（彭康育）等共計15名影視名流，總詐騙金額超過1億2千萬台幣。\n\n知名藝人康康今日現身北檢出庭時無奈長嘆，表示自己也是一時不察投資受騙，只能無奈勸自己「要好好反省、當作買個慘痛教訓」。"
  },
  "12": {
    type: "反指標趣聞",
    title: "反指標女神巴逆逆被詐團盯上！網友笑稱：跟著她反向操作還賺錢",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400",
    url: "https://tw.stock.yahoo.com/news/%E5%B7%B4%E9%80%86%E9%80%86%E8%A2%AB%E8%A9%90%E5%9C%98%E7%9B%AF%E4%B8%8A-%E7%B6%B2%E7%AC%91%E4%BA%86-%E8%B7%9F%E8%A9%90%E5%9C%98%E6%93%8D%E4%BD%9C%E5%8F%8D%E8%80%8C%E8%B3%BA%E9%8C%A2-125428195.html",
    source_name: "Yahoo 股市",
    content: "在台灣財經網路社群中被廣大股民尊稱為「反指標女神」的知名網紅巴逆逆，因其買什麼股票就跌什麼、賣什麼就噴什麼的「超狂燈體質」，成為無數股民茶餘飯後的趣味話題。\n\n沒項目這股超強的反指標威力，竟然也被詐騙集團給鎖定。近期臉書湧現大量冒用巴逆逆頭像與名義的假投資股票LINE群組廣告，氣得她親自發文澄清，表示股市大跌心情已經很差，還要天天處理檢舉，感到萬分心累。\n\n文章曝光後，數萬網友竟集體歪樓幽默回應：「之前有人不小心誤入假的巴逆逆詐騙投資群，決定跟著群組的操作進行『反向放空』，結果竟然在股市大賺一筆！這下直接確認這個群組一定是仿冒的冥燈了！」"
  },
  "13": {
    type: "跨境合作",
    title: "深化國際跨境司法合作研討會登場 邀請FBI、美國土安全署專家",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1521791136366-3eb296a6056f?w=400",
    url: "https://tw.news.yahoo.com/%E6%B7%B1%E5%8C%96%E5%9C%8B%E9%9A%9B%E8%B7%A8%E5%A2%83%E5%8F%B8%E6%B3%95%E5%90%88%E4%BD%9C%E7%A0%94%E8%A8%8E%E6%9C%83%E7%99%BB%E5%A0%B4-%E9%82%80%E8%AB%8Bfbi-%E7%BE%8E%E5%9C%8B%E5%9C%9F%E5%AE%89%E5%85%A8%E7%BD%B2%E5%B0%88%E5%AE%B6-043000329.html",
    source_name: "Yahoo 新聞",
    content: "法務部、行政院洗錢防制辦公室以及台灣高等檢察署，自20日起一連兩天，在台北盛大舉辦「無國界犯罪下之跨境合作—以打擊詐欺為核心，從偵查手段到司法互助」國際法律研討會，宣示深化跨境聯手打擊犯罪的決心。\n\n本次會議特別邀請到了在防制洗錢與跨國資控領域扮演重要核心角色的「艾格盟聯盟」（Egmont Group）副主席親自來台交流。\n\n同時，法務部也邀請了美國聯邦調查局（FBI）、美國國土安全署等跨越多國的頂尖科技偵查專家，同台灣檢警調人員進行深度研討與經驗分享。"
  },
  "14": {
    type: "阻詐實錄",
    title: "松山警耐心拆穿詐團「房屋修繕裝潢款」騙局 成功守住老翁200萬養老金",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400",
    url: "https://tw.news.yahoo.com/%E6%9D%BE%E5%B1%B1%E8%AD%A2%E8%80%90%E5%BF%83%E6%8B%86%E7%A9%BF%E8%A9%90%E5%9C%98-%E8%A3%9D%E6%潢%AC%E6%AC%BE-%E9%A8%99%E5%B1%80-%E5%AE%88%E4%BD%8F%E7%BF%81200%E8%90%AC%E9%A4%8A%E8%80%81%E9%87%91-035438879.html",
    source_name: "Yahoo 新聞",
    content: "臺北市政府警察局松山分局中崙派出所接獲轄內大型銀行通報，懷疑民眾遭到詐騙。警員迅速趕赴現場，一名老翁提領高達200萬元的現金，起初堅稱這筆大款是用於自家房子的老舊修繕與室內裝潢款。\n\n兩名員警憑藉豐富經驗，深知這是詐團教導的傳統規避提問話術。在警方耐心關懷下，老翁才掏出手機展示LINE對話，原來是他加入了假冒親友的「猜猜我是誰」借貸投資陷阱。警方現場戳破詐騙集團面目，成功攔截200萬養老金。"
  },
  "15": {
    type: "冒名詐騙",
    title: "太歲爺上動土！台南市教育局遭冒名投放臉書廣告騙取民眾個資",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    url: "https://tw.news.yahoo.com/%E8%A2%AB%E5%86%92%E5%90%8D-%E8%87%AB%E6%9B%B8%E9%80%A3%E7%B5%90%E9%A8%99%E5%80%8B%E8%B3%87-113854580.html",
    source_name: "Yahoo 新聞",
    content: "台南網路上出現無孔不入的冒名公家機關詐騙案。有不肖人士大膽以「臺南市政府教育局」的官方名義與局徽，在臉書粉專投放廣告，假意推銷政府補助課程並提供不明LINE社群短連結，意圖詐取家長個資。\n\n台南市教育局發現後，第一時間聲明澄清，向臉書總部檢舉冒名侵權，並通報165全民防騙網追查。教育局嚴正呼籲民眾認清官方專頁，切勿輕信不明社群連結。"
  },
  "16": {
    type: "旅遊警訊",
    title: "防堵跨國詐騙與外國人非法打工 泰國全面收緊入境免簽政策",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?w=400",
    url: "https://tw.news.yahoo.com/%E5%85%A7%E9%A3%A3%E6%AD%A3%E5%BC%8F%E6%89%B9%E5%85%82-%E6%B3%B0%E5%9C%8B60%E5%A4%A9%E5%85%8D%E7%B0%BD-%E7%A2%BA%E5%AE%9A%E6%B2%92%E4%BA%86-%E8%83%8C%E5%BE%8C%E5%8E%9F%E5%9B%A0%E6%9B%9D%E5%85%85-101400612.html",
    source_name: "Yahoo 新聞",
    content: "為了強力防堵跨國電信詐騙集團在泰國設立機房、人頭洗錢，以及外國人利用旅遊名義進行非法地下打工，泰國政府決定祭出鐵腕收緊入境政策。\n\n泰國觀光與體育部長素拉薩透露，計畫全面取消現行提供給多國的「60天免簽」寬鬆措施。免簽停留天數將直接砍半縮減至30天，同時將嚴格限制每人每年利用免簽入境的累計最高次數。常去泰國經商或長期度假的民眾需多加注意。"
  },
  "17": {
    type: "金融阻詐",
    title: "蒜頭網購竟變提款陷阱 斗六警火速阻詐保住婦人血汗錢",
    date: "2026-05-20",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600",
    url: "https://tw.news.yahoo.com/%E8%92%9C%E8%A0%AD%E7%B6%BC%E8%B3%BC%E7%AB%9F%E8%AE%8A%E6%8F%90%E6%AC%A2%E9%99%BD-%E6%96%97%E5%85%AD%E8%AD%A6%E7%81%AB%E9%80%9F%E9%98%BB%E8%A9%90%E4%BF%9D%E4%BD%A2%E5%A9%A6%E4%BA%BA%E8%A1%80%E6%B1%97%E9%86%A2-012322169.html",
    source_name: "Yahoo 新聞",
    content: "雲林縣斗六市日前發生一起因為網購民生物資險些遭到ATM詐騙的典型個案。一名張姓全職婦人，先前透過臉書一頁式社團低價購買批產地直送蒜頭。\n\n不料隨後卻落入詐騙集團設下的「假賣場、假銀行客服」圈套中。詐團成員假冒銀行專員打來，誆稱扣款設定錯誤，要求婦人立刻前往鄰近ATM提款機進行「解除分期付款設定」操作。\n\n婦人慌張前往提款機並一邊講電話，神色有異引起巡邏員警注意。警方火速趕往現場奪下婦人手中的提款卡，拆解假客服話術，順利保住辛苦血汗錢。"
  },
  "18": {
    type: "大額詐騙",
    title: "假冒「網戀國外軍醫」誆手術費 太平警民聯手保住婦人5000美金",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600",
    url: "https://tw.news.yahoo.com/%E8%A5%A8%E5%80%8B%E6%A1%88-%E8%9B%87%E8%A0%8D%E5%A5%B3%E8%A9%90%E9%A8%99-%E4%BB%A3%E8%B3%BC%E9%BB%83%E9%87%91-%E9%80%BC%E6%AD%BB5%E5%91%BD5%E7%BD%AA%E5%88%A411%E5%B9%B4-%E6%B3%95%E9%99%A2%E7%97%9B%E6%96%A5-%E6%A0%B9%E6%9C%AC%E9%15%B7%E6%9C%9F%E5%BF%83%E7%90%86%E8%99%90%E5%BE%85-040200677.html",
    source_name: "Yahoo 新聞",
    content: "跨國假網戀詐騙案件再度在台中太平區上演。一名年約50歲女子，在通訊軟體上結識了一名自稱長期於戰區擔任聯合國無國界高階軍醫的男子，陷入甜蜜攻勢。近日，該男網友誆稱自己在國外的老父親突發急性心臟病必須立刻開刀，急需一筆美金5,000元的救命醫藥費。\n\n女子不疑有他，辦理海外外幣匯款時因神色有異，行員機警報案。派出所警員迅速趕到現場，向其展示多起一模一樣的網戀詐騙案例，歷經勸阻成功攔截5000美金。"
  },
  "19": {
    type: "民生糾紛",
    title: "上班時間向病患推銷直銷營養品 兩醫護挨告涉詐領獎勵金獲不起訴",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600",
    url: "https://tw.news.yahoo.com/%E4%B8%8A%E7%8F%AD%E6%8E%A8%E9%8A%B7%E7%9B%B4%E9%8A%B7%E7%7B%9F%E9%A4%8A%E5%93%81-%E5%8C%97%E5%B8%82%E8%81%AF%E9%86%AB%E5%11%A0%E5%85%A9%E8%A6%BA%E8%AD%B7-%E6%B6%89%E8%A9%90%E7%8D%8E%E5%8B%B5%E9%87%91-%E9%15%94%E5%8E%9F%E5%9B%A0%E4%B8%8D%E8%B5%B7%E8%A8%B4-041232562.html",
    source_name: "Yahoo 新聞",
    content: "台北市立聯醫控訴任職院內的郭姓醫師及洪姓護理師，涉嫌利用職務之便在上班時間病患推銷直銷保健食品。院方認為兩人隱匿兼職違反規定領取兼職醫療績效獎勵金，因而提出刑事詐欺告訴。\n\n台北地檢署檢察官偵訊後，審酌這筆醫療獎勵金是醫院主動依表現系統發給，並非兩名醫護施用詐術填單請領。檢方認定此案純屬違反內部聘僱契約的民事履約糾葛，予以不起訴處分。"
  },
  "20": {
    type: "黑道潛逃",
    title: "百億賭王林秉文涉洗錢案 棄保潛逃魂斷柬埔寨 法院裁定公訴不受理",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
    url: "https://tw.news.yahoo.com/%E7%99%BE%E5%A4%A4%E8%B3%AD%E7%8E%8B-%E6%9E%97%E4%B8%83%E6%96%87%E6%BD%9B%E9%80%83%E6%9F%AC%E5%AF%A8%E9%11%AD%E6%A7%8D%E6%AE%BA-%E7%94%9F%E5%81%91%E9%11%AD%E6%8E%A7%E8%A9%90%E6%AC%BA-%E6%B4%97%E9%8C%A2-%E6%B3%95%E9%1A%A2%E5%88%A4%E5%85%AC%E8%A8%B4%E4%B8%8D%E5%8F%97%E7%90%86-103300916.html",
    source_name: "Yahoo 新聞",
    content: "綽號「鱸鰻」的人稱「百億賭王」的林秉文，先前因涉嫌捲入郭哲敏地下匯兌與洗錢案遭檢方起訴，於2024年底棄保潛逃遭全面通緝。今年3月，海外確認林秉文在柬埔寨西港街頭慘遭殺手狙擊29槍身亡。\n\n台灣檢警單位確認死者身分無誤後，新北地方法院合議庭在透過內政部戶役政資訊系統查詢、確認死亡登記屬實。依據刑事訴訟法規定，近日正式裁定「公訴不受理」。"
  },
  "21": {
    type: "移工犯罪",
    title: "遣返移工成破口！議員揭逃逸外勞失聯留下人頭帳戶、車輛淪詐團工具",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600",
    url: "https://tw.news.yahoo.com/%E8%A9%90%E5%9C%98%E5%A5%BD%E9%11%A6%E5%AE%9A-%E9%11%99%E6%97%AF%E7%BE%A4-%E9%9B%B2%E6%9E%97%E6%AA%A2%E6%9B%9D%E6%15%A2%E7%97%9B%E6%95%B8%E6%93%9A-%E8%BE%9B%E8%8B%A6%E9%12%90%E5%99%B4%E6%8E%89-%E5%8D%8A-001300758.html",
    source_name: "Yahoo 新聞",
    content: "隨著國內金融機構對申辦人頭帳戶、綁定網銀的審查與管制愈發嚴格，人頭帳戶黑市價格水漲船高，詐騙集團竟將歪歪腦筋動到了「外籍移工」身上。\n\n台中市議員謝志忠在市議會聯合質詢時揭露一項重大治安破口。大量逃逸外勞或失聯移工在強制遣返回國前，因自知未來無法再入境台灣，竟將名下的台灣手機門號、銀行金融卡（含密碼）以及名下代步普通機車高價轉賣給詐騙集團。這些人頭工具隨即淪為黑市機房的洗錢與車手規避追查的工具。議員要求警察局與勞工局建立跨部會機制，在移工強制離境前全面清查註銷其名下門號帳戶。"
  },
  "22": {
    type: "政策爭議",
    title: "繳一輩子國保剛滿65歲過世給付全充公 民代痛批荒謬：國家級詐騙",
    date: "2026-05-19",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
    url: "https://tw.news.yahoo.com/%E7%B9%B0-%E8%BC%A9%E5%AD%90%E5%9C%8B%E4%BF%9D%E5%89%9B%E6%BB%BF65%E6%AD%B2%E9%11%AD%E4%B8%96-%E5%85%A8%E5%85%AC%E5%85%AC-%E6%B0%91%E4%BB%A3%E8%BD%94%E8%8D%92%E8%AC%90-%E5%9C%8B%E5%AE%B6%E7%B4%9A%E8%A9%90%E9%A8%99-074715707.html",
    source_name: "Yahoo 新聞",
    content: "網友爆料有長輩按時繳納國民年金保費數十年，未料就在長輩剛滿65歲準備依法請領老年年金時突然意外離世。家屬申辦後續給付時，被勞保局告知因法規資格不符，多筆核心給付皆無法請領，形同保費全數沒收充公。市議員在社群痛批，政府制度設計玩弄文字遊戲不把保費還給民眾，簡真是荒謬的國家級詐騙！強烈要求主管機關應正視這項法規漏洞並即刻發動修法。"
  }
};

export default function NewsDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const news = id ? ALL_NEWS_DETAILS[id] : null;

  // 🚀 精準修復：跨平台安全開啟外部網頁連結
  const openNewsSource = async (url: string) => {
    try {
      if (Platform.OS === "web") {
        window.open(url, "_blank");
      } else {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log("無法成功導向此網址: " + url);
        }
      }
    } catch (error) {
      console.log("導向網址發生錯誤: ", error);
    }
  };

  if (!news) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>找不到該篇新聞內容</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>返回列表</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* 導覽列 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{news.type}詳情</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* 新聞大圖 */}
        <Image source={{ uri: news.img }} style={styles.mainImage} />

        {/* 分類與日期 */}
        <View style={styles.metaRow}>
          <Text style={styles.typeTag}>{news.type}</Text>
          <Text style={styles.dateText}>發布時間：{news.date}</Text>
        </View>

        {/* 新聞標題 */}
        <Text style={styles.titleText}>{news.title}</Text>

        {/* 警語區塊 */}
        <View style={styles.aiWarningBox}>
          <Text style={styles.aiWarningText}>
            ⚠️ 提示：以上摘要內容由 AI 根據原始新聞資訊生成。欲瞭解更詳實的案件報導，請參考下方隨附之新聞官方連結。
          </Text>
        </View>

        <View style={styles.divider} />
        {/* 新聞內文 */}
        <Text style={styles.contentText}>{news.content}</Text>
        <View style={styles.divider} />

        {/* 底部真實有效連結按鈕 */}
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceLabel}>新聞原始來源：</Text>
          <TouchableOpacity 
            style={styles.sourceButton}
            onPress={() => openNewsSource(news.url)}
          >
            <Text style={styles.sourceButtonText} numberOfLines={1}>
              🌐 點此前往 {news.source_name} 閱讀官方全文
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { 
    height: 56, 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    borderBottomWidth: 1, 
    borderBottomColor: "#f3f4f6",
    paddingHorizontal: 16,
    backgroundColor: "#fff"
  },
  backButton: { paddingVertical: 8 },
  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#111827", maxWidth: 200 },
  placeholder: { width: 50 },

  container: { padding: 20, paddingBottom: 60 },
  mainImage: { width: "100%", height: 220, borderRadius: 16, backgroundColor: "#f3f4f6", marginBottom: 16 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  typeTag: { 
    backgroundColor: "#fee2e2", 
    color: "#ef4444", 
    fontSize: 12, 
    fontWeight: "800", 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 6 
  },
  dateText: { fontSize: 12, color: "#9ca3af", fontWeight: "600" },
  titleText: { fontSize: 22, fontWeight: "900", color: "#111827", lineHeight: 30 },
  
  aiWarningBox: {
    backgroundColor: "#fffbeb",
    borderColor: "#fef3c7",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 14
  },
  aiWarningText: {
    fontSize: 13,
    color: "#b45309",
    fontWeight: "600",
    lineHeight: 18
  },

  divider: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 20 },
  contentText: { fontSize: 16, color: "#374151", lineHeight: 28, fontWeight: "500", textAlign: "justify" },

  sourceContainer: {
    marginTop: 10,
    alignItems: "stretch"
  },
  sourceLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "700",
    marginBottom: 8
  },
  sourceButton: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  sourceButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800"
  },

  errorBox: { flex: 1, justifyContent: "center", alignItems: "center", gap: 16 },
  errorText: { fontSize: 16, fontWeight: "700", color: "#6b7280" },
  backBtn: { backgroundColor: "#111827", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  backBtnText: { color: "#fff", fontWeight: "700" }
});