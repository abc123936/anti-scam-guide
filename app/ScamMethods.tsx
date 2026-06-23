import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// 🌟 10大分類、整整100種真實詐騙話術資料庫
const RAW_QUIZ_POOL: { [key: string]: { title: string; hint: string; details: string; keywords: string[] }[] } = {
  "電信與簡訊詐騙": [
    { title: "催繳過路費/停車費", hint: "eTag 帳單欠費 45 元，今日未繳將罰 3,000 元。", keywords: ["過路費", "停車費", "etag", "遠通", "欠費"], details: "利用民眾害怕逾期被罰款的心理，附帶假冒遠通電通的網頁，在後台直接盜刷數萬元。" },
    { title: "包裹網址詐騙", hint: "您的包裹因地址不全無法投遞，請在 24 小時內變更。", keywords: ["包裹", "地址不全", "無法投遞", "海關", "郵局", "快遞"], details: "引導受害者點擊惡意檔案或輸入個資，藉此竊取手機通訊錄、簡訊驗證碼或盜刷信用卡。" },
    { title: "積分/點數過期", hint: "會員點數即將到期，請立即兌換 iPhone 15 Pro 或知名家電。", keywords: ["點數", "積分", "過期", "兌換", "哩程"], details: "假冒電信公司或百貨誘騙登入假網頁填寫刷卡手續費，導致信用卡被綁定在詐騙集團的 Apple Pay 中。" },
    { title: "水電瓦斯欠費", hint: "用戶您好，您 5 月份電費未繳，我們將於明日下午 4 點進行斷電處理。", keywords: ["水電", "電費", "瓦斯", "欠費", "斷電"], details: "假冒台電或自來水公司發送簡訊恐嚇，迫使害怕斷水斷電的受害者點擊假支付連結繳費。" },
    { title: "交通罰單未繳", hint: "您有一筆違反交通管理事件罰鍰未繳，請於限期內處理。", keywords: ["罰單", "交通罰單", "監理", "違規", "監理所"], details: "網頁做得與官方「監理服務網」極度相似，誘導民眾輸入身分證字號與信用卡資料進行盜刷。" },
    { title: "假冒電商客服", hint: "因為系統升級操作錯誤，不小心將您設為高級批發商，每個月會自動從銀行扣款。", keywords: ["客服", "電商", "批發商", "扣款", "蝦皮", "momo"], details: "能精準說出購買紀錄以取得信任，聲稱要幫你轉接銀行客服解除，實則引導操作網銀轉帳。" },
    { title: "銀行帳戶凍結", hint: "您的網路銀行安全機制已過期，請立即登入更新個資，否則將永久凍結帳戶。", keywords: ["網銀", "凍結", "帳戶凍結", "安全機制", "銀行"], details: "簡訊假冒知名銀行，受害者點進假網銀頁面輸入密碼，詐騙集團立刻在真網銀將存款轉光。" },
    { title: "中獎通知", hint: "恭喜您中了星宇航空機票或百萬賓士，但領獎需要先扣繳 10% 射幸所得稅。", keywords: ["中獎", "抽獎", "所得稅", "稅金", "領獎", "賓士"], details: "透過簡訊或社群標記，宣稱中獎需要扣繳稅金或跨境運輸費，要求受害者先匯款。" },
    { title: "假冒檢警辦案", hint: "您的個資被販毒洗錢集團冒用，涉嫌刑事案件，必須將存款交給法院監管。", keywords: ["檢警", "檢察官", "法院", "監管", "法官", "公文"], details: "佯稱健保局或中華電信轉接，以偵查不公開恐嚇，下達假公文變現財產，交給假公證人。" },
    { title: "健保卡遭冒用", hint: "您的健保卡在某特定醫院被領取了大量管制藥品（如嗎啡），涉嫌販賣毒品。", keywords: ["健保", "健保卡", "冒用", "管制藥", "藥品"], details: "利用長輩對犯法的恐懼，誘騙說出銀行存款，再派車手假冒公職人員上門拿取現金。" }
  ],
  "網路社群與通訊軟體": [
    { title: "LINE 輔助認證", hint: "我的 LINE 帳號被鎖住了，需要 3 個好友幫忙認證，請幫我輸入你的手機和驗證碼。", keywords: ["輔助認證", "line", "驗證碼", "鎖住", "好友認證"], details: "盜用親友帳號後傳訊，一旦受害者提供簡訊驗證碼，自己的 LINE 帳號也會瞬間被盜。" },
    { title: "親友急需借錢", hint: "我現在人在醫院動手術現金不夠，或我支票快到期了差 3 萬周轉。", keywords: ["借錢", "週轉", "急用", "醫院", "周轉"], details: "盜取親友的 LINE 或 Facebook 帳號，傳訊給周遭朋友，利用人際間的信任與同情心行騙。" },
    { title: "換臉（Deepfake）借錢", hint: "利用 AI 技術合成出你兒女、主管的面貌與聲音，直接撥打視訊電話要求緊急匯款。", keywords: ["換臉", "deepfake", "ai", "視訊", "合成", "變臉"], details: "高科技型詐騙。在視訊中假裝人在國外或遇到緊急狀況，真假難辨，誘導跨國匯款。" },
    { title: "投票/點讚活動", hint: "這是我家狗狗參加萌寵選拔，只差 5 票就第一名了，求幫忙點擊連結投票。", keywords: ["投票", "點讚", "選拔", "萌寵", "連結投票"], details: "網頁要求用 LINE 或 Facebook 帳號登入授權，實則是直接把帳號密碼與權限雙手奉上。" },
    { title: "假粉專抽獎", hint: "建立與知名品牌極相似假粉專，留言「想出國」就抽雙人機票，再私訊稱中獎需付稅金。", keywords: ["粉專", "假粉專", "抽獎", "留言", "機票"], details: "吸引大量網友留言，隨後假借中獎名義，要求填寫詳細個資、信用卡或付刷卡稅金。" },
    { title: "IG/FB 誠徵小幫手", hint: "誠徵在家兼職小幫手，打字、聽寫、按讚，一天 1500-3000 元，手機即可做。", keywords: ["小幫手", "兼職", "打字", "按讚"], details: "吸引學生與家庭主婦。加入後，對方會說為了分派任務，要先繳納開通費或儲值到特定平台。" },
    { title: "社團低價出清", hint: "因為跟男友分手售全新未拆 iPhone 只要 5000 元，可先郵寄，匯款後封鎖。", keywords: ["出清", "低價", "二手", "機車", "iphone"], details: "在 Facebook 二手或地方社團發文，以各種悲情藉口低價賤賣 3C。等受害者匯了訂金立刻封鎖。" },
    { title: "假官方客服", hint: "粉專留言抱怨後，出現極相似頭像與名稱主動私訊（如：蝦皮客服支線 03）引導退款轉帳。", keywords: ["官方客服", "山寨客服", "私訊", "退款"], details: "假借協助退款的名義，引導消費者提供銀行帳密，或操作網路銀行轉帳。" },
    { title: "名人投資廣告", hint: "盜用謝金河、陳重銘等財經名人的照片，聲稱「這是我唯一公開的免費飆股社團」。", keywords: ["名人", "財經名人", "飆股", "投資廣告", "投顧"], details: "在各大社交媒體購買精準廣告，引導受害者點進不公開的詐騙 LINE 飆股群組。" },
    { title: "點擊連結加群組", hint: "透過簡訊或社群群組發放「點擊連結加入主力拉抬群，保證明天開盤漲停」。", keywords: ["群組", "拉抬群", "漲停", "投顧群", "暗樁"], details: "進群後，裡面會有數十人每天演戲互道恭喜賺大錢，其實除了受害者，其餘全是詐團的分身暗樁。" }
  ],
  "投資與虛擬貨幣": [
    { title: "保證獲利、穩賺不賠", hint: "設計精美投資網站，主打高報酬、穩賺不賠，初期投入小錢可提現，大筆資金投入後就關閉。", keywords: ["穩賺不賠", "保證獲利", "高報酬", "代操", "本金"], details: "利用人們對財富的貪婪。受害者深信不疑把積蓄都投進去，想大額提現時，網站就無預警關閉。" },
    { title: "虛擬交易所釣魚", hint: "簡訊稱「您的帳戶因涉嫌洗錢，請於 1 小時內點此認證，否則資產將被清零」。", keywords: ["交易所", "虛擬貨幣", "助記詞", "私鑰", "加密貨幣", "錢包"], details: "仿冒國際知名的 Binance 或 OKX 交易所。受害者在假網頁輸入「助記詞」或「私鑰」，資產瞬間被轉光。" },
    { title: "內幕消息/殺豬盤", hint: "培養感情數月，假裝投顧內線人員透露聯手拉抬外匯或黃金，是不公開的秘密。", keywords: ["內幕", "內線", "殺豬盤", "投顧", "操盤"], details: "詐騙分子在通訊軟體上與你培養感情建立信任，透露虛假內線消息引導你至假平台儲值操盤。" },
    { title: "新創虛擬幣募資（ICO）", hint: "結合 AI 算力、綠能環保的區塊鏈新幣，上市後會翻 1000 倍，買完後項目方捲款蒸發。", keywords: ["新幣", "ico", "區塊鏈", "代幣", "募資"], details: "包裝新穎的高科技概念並舉辦盛大線下說明會，投資人買了一堆不能流通的垃圾代幣，最後直接捲款。" },
    { title: "海外置產投資", hint: "鼓吹投資東南亞未開發土地或度假村，宣稱保證回租、年報酬率 15% 以上，隨後開發商倒閉。", keywords: ["海外置產", "東南亞", "度假村", "報酬率", "回租"], details: "受害者付了幾百萬頭期款，幾年後飛過去看，發現那邊還是一片荒地，連開發商都倒閉蒸發。" },
    { title: "黃金/白銀地下期貨", hint: "安裝特定的期貨操盤軟體（如假 MT4），後台數字可任意操控，故意一瞬間爆倉要求補倉。", keywords: ["期貨", "操盤軟體", "爆倉", "入金", "補倉", "地下期貨"], details: "軟體看似與國際盤連動但實則後台可任意修改，故意讓你的單子爆倉，再告訴你是市場正常波動。" },
    { title: "量化交易機器人", hint: "主打「AI 智能高頻套利，機器人 24 小時幫你自動低買高賣，躺著就有被動收入」。", keywords: ["機器人", "量化", "套利", "高頻交易", "智能"], details: "受害者看著後台資產穩定上漲，殊不知那只是網頁前端寫死的一段跑數字程式碼，錢早已被轉走。" },
    { title: "NFT 盲盒詐騙", hint: "炒作宣稱有強大賦能的 NFT 藝術品，等吸引大筆以太幣搶購後，團隊突然解散 Discord 關閉官網。", keywords: ["nft", "盲盒", "以太幣", "賦能", "數位圖片"], details: "找網紅瘋狂代言。等盲盒開賣、資金到手後，官方團隊直接 Rug Pull 捲走資金，留下毫無價值的圖片。" },
    { title: "虛擬貨幣線下交易", hint: "約在實體便利商店見面交易 USDT，轉帳後對方藉口上廁所坐上接應機車逃逸，或給大疊假鈔。", keywords: ["usdt", "泰達幣", "線下交易", "假鈔", "面交"], details: "在網路上尋找想買賣虛擬貨幣的人面交。轉移虛寶或貨幣後，對方直接開溜或使用假鈔坑殺。" },
    { title: "假冒券商經理", hint: "自稱券商經理，表示現在有「內部預留的優質認購新股」，中籤率 100%，引導匯入私人信託戶。", keywords: ["券商", "經理", "認購新股", "中籤", "代持帳戶"], details: "假冒知名券商的資深理財經理，有關心名義引導你把資金匯入私人代持帳戶，其實就是人頭帳戶。" }
  ],
  "感情與社交詐騙": [
    { title: "網戀戰地醫生/軍官", hint: "外國軍官或戰地醫生天天甜言蜜語，突然稱戰區受重傷，或行李卡海關需要代墊高額關稅。", keywords: ["戰地醫生", "軍官", "海關", "關稅", "代墊", "行李"], details: "專騙寂寞的中年男女。建立虛擬戀情後，以各種人在國外的緊急狀況為由，要求受害者匯款。" },
    { title: "高富帥/白富美引誘", hint: "交友軟體分享開跑車、奢華生活，交往後稱「我都用這個平台在理財，你也開戶做結婚基金」。", keywords: ["高富帥", "白富美", "理財", "結婚基金", "奢華"], details: "盜用正妹帥哥照片。交往後溫柔誘騙受害者至假投資平台開戶，將其積蓄洗劫一空。" },
    { title: "博弈網站漏洞", hint: "對象透露自己是澳門線上娛樂城工程師，發現金流漏洞，特定時間下注勝率 100%，邀你儲值結婚。", keywords: ["博弈", "漏洞", "娛樂城", "工程師", "下注"], details: "聊天時不經意透露維護系統時發現的漏洞。受害者儲值小額能贏，大額後便無法提現或關閉網站。" },
    { title: "見面先買點數", hint: "網戀正妹或帥哥約見面，快到時稱公司怕你是警察，要先去超商買 3000 元點數拍序號認證。", keywords: ["買點數", "序號", "核實身分", "超商點數", "黑道大哥"], details: "通常在男同志或男女交友軟體發生。如果拒絕，會有假黑道大哥打電話恐嚇要對你家人不利。" },
    { title: "裸聊勒索", hint: "邀請下載特定視訊 APP 進行刺激裸聊，側錄畫面並利用惡意 APP 複製手機通訊錄進行恐嚇。", keywords: ["裸聊", "側錄", "視訊", "通訊錄", "不雅片", "勒索"], details: "受害者一脫衣服就被側錄。隨後威脅不匯款就把影片傳給通訊錄裡所有的主管、同事和家人。" },
    { title: "同情心詐騙", hint: "天天聊天頃訴「爸爸洗腎、媽媽出車禍、兼三份工快撐不住」，利用善良與保護慾借錢後失聯。", keywords: ["同情心", "洗腎", "車禍", "借錢", "命運多舛"], details: "在網路上營造出非常孝順但命運多舛的悲慘形象。一次次要求借幾千、幾萬元，最後人間蒸發。" },
    { title: "跨國包裹卡關", hint: "宣稱買了昂季包包手錶寄給你，假物流公司來電稱包裹有違禁品現金被海關查扣，需付免責罰金。", keywords: ["包裹", "卡關", "物流", "罰金", "手續費", "免責"], details: "網戀對象宣稱寄送貴重禮物。隨後配合假冒的國際物流公司要求支付高額「洗錢免責罰金」才放行。" },
    { title: "假相親/婚姻仲介", hint: "收取數十萬相親費聘金後，安排高顏值的臨演婚託，見面幾次後以個性不合拒聯並拒絕退費。", keywords: ["相親", "仲介", "婚託", "聘金", "臨演"], details: "針對急婚、大齡或外籍配偶需求的男女。安排的相親對象全是職業婚託，最後集體找藉口斷聯。" },
    { title: "酒店公關情人", hint: "表現得極度清純、被逼無奈才下海，引導去酒店消費衝業績，或拿出幾十萬解約金幫她贖身。", keywords: ["酒店", "公關", "贖身", "衝業績", "解約金"], details: "在網路上認識公關，稱你是唯一帶給她溫暖的人，想離開這裡。誘騙受害者拿出大筆贖身費幫她還債。" },
    { title: "明星假帳號", hint: "冒充知名藝人私人生活號私訊粉絲，稱要舉辦私密見面會要先買門票，或經紀公司凍結資產需借錢。", keywords: ["明星", "假帳號", "藝人", "粉絲", "見面會"], details: "冒充韓團、周杰倫或歐美明星。假稱很看重你這個粉絲，聊一陣子後開始巧立名目要錢。" }
  ],
  "求職與貸款詐騙": [
    { title: "出租銀行帳戶", hint: "誠徵博弈公司對帳員/租借閒置網銀帳戶，一個月補助 3~5 萬元，寄出提款卡變人頭戶。", keywords: ["出租帳戶", "人頭帳戶", "簿冊", "對帳員", "提款卡"], details: "寄出卡片並告知密碼。幾天後帳戶被當作贓款帳戶，受害者直接變成詐騙共犯且名下帳戶全數凍結。" },
    { title: "家庭代工材料費", hint: "提供香水包裝、手鍊串珠代工，入職前稱怕你拿了材料跑掉，要先匯一筆材料押金或模具費。", keywords: ["家庭代工", "材料費", "押金", "代工", "手工"], details: "鎖定無法外出工作的家庭主婦。等受害者匯了數千元材料押金後，對方就直接封鎖失聯。" },
    { title: "海外高薪求職陷阱", hint: "免經驗免學歷月薪 10 萬起海外遊戲客服，出國到柬埔寨或 KK 園區後護照被沒收限制自由。", keywords: ["柬埔寨", "kk園區", "海外高薪", "出國求職", "東南亞", "園區"], details: "護照立刻被沒收，強迫在園區裡每天進行網路詐騙。如果不從或業績不達標，會遭到毆打、電擊或轉賣。" },
    { title: "保證核貸先交手續費", hint: "代辦貸款公司稱「保證過件、免照會、當天撥款」，隨後要求交律師公證費或開辦費。", keywords: ["貸款", "核貸", "過件", "代辦", "公證費", "手續費"], details: "針對信用瑕疵者。開口要求先交開辦費、或要求寄出提款卡以製造資金流水，實則侵占或變人頭戶。" },
    { title: "刷卡換現金陷阱", hint: "手續費最低、刷卡換現金，誘騙購買高額 3C 或點數卡再以 7 折低價向受害者收購。", keywords: ["刷卡換現金", "預借現金", "循環利息", "收購"], details: "受害者雖然拿到了幾萬塊現金應急，但下個月卻要向銀行支付 100% 的信用卡全額帳單與循環利息。" },
    { title: "美化信用紀錄", hint: "代辦稱信用評分太低，必須把 20 萬元現金先匯到指定信託帳戶以反覆存提做出漂亮薪資流水。", keywords: ["信用紀錄", "流水", "信託帳戶", "信用評分", "薪資流水"], details: "聲稱有內部管道幫忙做反覆存提，在銀行端做出漂亮的資金流水。結果受害者的本金一去不回。" },
    { title: "試用期購買產品", hint: "不良模特兒經紀或直銷，面試錄取後要求自費購買 5 萬元公司形象產品或拍藝術照宣傳費。", keywords: ["試用期", "直銷", "形象產品", "宣傳照", "簽字刷卡"], details: "稱是職前投資會從薪水扣。等受害者簽字刷卡後，公司會用各種藉口百般刁難，讓你待不下去自動離職。" },
    { title: "假徵才集體面試", hint: "約到飯店會議廳集體培訓，講師洗腦成功學，隨後主管一對一圍攻強迫簽下微型貸款合約。", keywords: ["集體面試", "培訓", "成功學", "貸款合約", "課程"], details: "採取包圍戰術，由好幾個資深主管圍著求職者，強迫、恐嚇、或誘騙其當場簽下高額貸款購買無用課程。" },
    { title: "外包接案騙取作品", hint: "聲稱有數十萬大案，要求設計或翻譯先進行「免費試做核心部分」，交出成品後被拒合作卻被盜用。", keywords: ["外包", "接案", "免費試做", "試譯", "盜用作品"], details: "發案方以風格不符拒絕合作，轉頭卻直接把接案者的成品拿去商業使用，白嫖勞動成果。" },
    { title: "神秘客/刷單專員", hint: "自己出錢去網購指定商家商品幫刷銷量，前幾次金額小準時退本金+佣金，大單 10 萬後稱卡單拒退。", keywords: ["神秘客", "刷單", "佣金", "卡單", "網購"], details: "前幾次小額都有準時退款；當求職者刷了大單後，客服就會以系統卡單、需要再刷一筆才能解鎖為由拒退。" }
  ],
  "民生消費詐騙": [
    { title: "一頁式廣告", hint: "網路精美單一長網頁廣告，打著「倒閉出清、海關拍賣，原價 8000 現在只要 899」並支援貨到付款。", keywords: ["一頁式", "廣告", "貨到付款", "倒閉出清", "海關拍賣"], details: "在 FB 或 IG 上外觀只有單一長網頁的廣告，盜用名人推薦影片。取貨拆開才發現裡面是一堆淘寶劣質垃圾。" },
    { title: "假買家誆稱賣場無法下單", hint: "二手賣家被買家私訊稱金流保障未完成無法下單，點假客服連結操作 ATM 進行身分認證。", keywords: ["無法下單", "金流保障", "簽署", "賣場", "認證"], details: "點進假網頁後，假客服會來電引導賣家去操作 ATM 進行賣場解除鎖定，實則盜刷存款。" },
    { title: "惡意貨到付款幽靈包裹", hint: "根本沒網購卻收到包裹抵達簡訊，憑 999 元取貨，常誤認是自己忘記或家人幫忙買的。", keywords: ["幽靈包裹", "貨到付款", "沒買東西", "超商取貨"], details: "利用民眾健忘或以為是家人網購的心理，付錢領回拆開後，發現是完全沒用的塑膠玩具或粗劣衣物。" },
    { title: "假演唱會門票", hint: "熱門巨星門票秒殺，社團發文「跟女友分手含淚不加價讓票」，要求先匯款全額或訂金後封鎖。", keywords: ["演唱會", "讓票", "門票", "黃牛", "匯款"], details: "以很多人在搶為由，要求受害者先匯款。一旦款項入帳，賣家帳號立刻註銷，再也聯絡不上。" },
    { title: "虛擬遊戲虛寶交易", hint: "網拍二手物品，假買家要求去特定的假冒第三方平台交易，要提現時稱銀行帳號錯了需匯解凍金。", keywords: ["虛寶", "交易平台", "解凍金", "凍結", "遊戲帳號"], details: "指示至虛假的遊戲交易平台交易。當提現時，網站客服會以帳戶凍結為理由，要求儲值等額現金才能退款。" },
    { title: "點數儲值卡回充", hint: "買家稱無銀行帳戶要用點數卡交易，密碼故意遮住一半，稱收到貨後再給另一半密碼，寄出後封鎖。", keywords: ["點數卡", "序號", "密碼遮住", "一半密碼", "寄出"], details: "在網路上販售二手物品時遇到。等賣家把貨物寄出後，就再也拿不到剩餘的點數卡密碼。" },
    { title: "飯店退款/重複扣款", hint: "自稱訂房網站客服來電能說出入住日期，聲稱系統出錯「重複刷了 5 次卡」要求配合銀行取消。", keywords: ["訂房", "重複扣款", "刷了5次", "取消刷退", "booking", "agoda"], details: "因為電商資料外洩，他能完整說出你預訂的房型與金額，後續配合假銀行客服將你的錢轉走。" },
    { title: "愛心義賣/強推銷", hint: "商圈被年輕人突攔，把環保杯袋直接塞進手裡，稱大學生創業或孤兒院籌款要求 300 元支持。", keywords: ["愛心義賣", "強推銷", "手鍊", "杯袋", "商圈"], details: "受害者往往因為不好意思拒絕、或被對方幾個人糾纏不放，最後只好掏錢脫身。" },
    { title: "假旅遊行程/機票", hint: "社團打出奢華澎湖三日遊包吃包住包機票只要 2999 元超低價，出發當天到機場發現沒訂位紀錄。", keywords: ["旅遊行程", "機票", "奢華", "超低價", "報名"], details: "受害者呼朋引伴集體報名並匯款。直到出發前一天，到機場才發現根本沒有訂位紀錄，小編早已蒸發。" },
    { title: "二手車調表車", hint: "將跑了 30 萬公里的車調低成僅跑 5 萬公里，包裝成優質女用一手車少跑少用高價販售。", keywords: ["二手車", "調表", "里程數", "計程車", "車商"], details: "無良二手車商的傳統騙術。受害者以高價買回後，開不到一、兩個月，引擎和變速箱就徹底報銷。" }
  ],
  "生活租屋與民生": [
    { title: "假房東預收保留訂金", hint: "裝潢精美且租金遠低於行情，假房東稱看房的人多，先匯 2 個月租金作為保留訂金優先看房。", keywords: ["房東", "租屋", "保留金", "看房", "訂金"], details: "等受害者匯款後，到了現場才發現根本沒有這個地址，假房東帳號也立刻封鎖失聯。" },
    { title: "二房東轉租", hint: "先向真房東短租，再假冒大房東便宜轉租，限定一次繳清一年份享 8 折，收取數名租客年租後逃逸。", keywords: ["二房東", "轉租", "年租金", "大房東", "繳清"], details: "吸引了好幾組租客同時簽約，收取了數十萬的年租金與押金後潛逃，留下租客與真房東面對法律糾紛。" },
    { title: "催還圖書/違規罰款", hint: "收到假冒市立圖書館信件，稱大前年借閱圖書至今未還累計罰款 2450 元，需限期線上刷卡結清。", keywords: ["圖書館", "圖書", "未還", "線上刷卡", "罰款"], details: "利用一般人對公共機關的行政疏忽。信中會擴大恐嚇若不刷卡結清將移送法辦並課以十倍罰鍰。" },
    { title: "搬家公司中途加價", hint: "估價開出破盤超低價，等搬家當天家具都搬上車開到半路，突然大變臉宣稱家具太重強索數萬元。", keywords: ["搬家", "加價", "搬家流氓", "樓梯", "車資"], details: "俗稱「搬家流氓」，利用家具都在車上、受害者搬家無助的處境，以言詞恐嚇強索高額費用。" },
    { title: "冷氣/家電維修敲詐", hint: "網搜XX牌冷氣維修，點進買廣告的山寨中心，師傅到府隨便量一下就稱壓縮機燒掉換新要 1 萬 5。", keywords: ["冷氣維修", "壓縮機", "家電維修", "敲詐", "維修"], details: "其實往往只是電容壞掉、或是冷媒漏了，本來只要幾百元。專門欺騙不懂機械結構的家庭主婦。" },
    { title: "裝修蟑螂", hint: "簽訂裝修合約並收取 50% 首期款，敲敲打打把牆壁拆得爛爛的，隨後以缺工為由無限期停工並蒸發。", keywords: ["裝修", "裝修蟑螂", "工班", "師傅", "停工"], details: "製造有在做事的假象。隨後就開始以各種理由推託無限期停工，最後甚至更換電話、人間蒸發。" },
    { title: "假瓦斯安全檢查", hint: "身穿瓦斯公司藍色工作服掛偽造識別證登門，稱防爆閥漏氣，現場收取 4900 元現金更換劣質零件。", keywords: ["瓦斯", "安全檢查", "防爆閥", "漏氣", "檢查"], details: "貼出定期安全檢查公告登門入戶。在廚房瓦斯爐扯兩下面色凝重恐嚇會氣爆，強推銷幾百元的劣質零件。" },
    { title: "假尋狗/尋人啟事", hint: "看到懸賞尋狗啟事，打給失主稱在橋下看到腳受傷的狗帶去醫院，但醫生要先收 5000 元手術費求先匯。", keywords: ["尋狗", "懸賞", "失主", "手術費", "醫藥費"], details: "利用失主焦急、想趕快找回愛犬的心理。等失主驚慌之下匯款醫藥費後，對方隨即失聯。" },
    { title: "補習班課程退費難", hint: "街頭業務拉做問卷送體驗課，顧問推銷 10 萬課程月付 3000 很輕鬆，簽字後才知是向民間融資貸款。", keywords: ["補習班", "退費", "接案", "體驗課", "融資貸款", "貸款"], details: "受害者以為自己簽的是補習班的月繳月付單，實際上是高額信用貸款。想退課時會被合約百般推託卡死。" },
    { title: "強索開鎖費", hint: "深夜忘帶鑰匙找 24 小時開鎖，鎖匠到場捅兩下稱是進口防盜鎖極難開，強索 8000 元破壞費才肯做。", keywords: ["開鎖", "鎖匠", "車馬費", "防盜鎖", "破壞費"], details: "如果不開，甚至威脅要收取數千元的高額車馬費。利用受害者深夜無助、想趕快回家的心理進行勒索。" }
  ],
  "醫療健康與宗教": [
    { title: "神醫偏方神藥", hint: "地下電台宣稱某祖傳老神醫特效藥能一週內降血糖、一個月讓癌症腫瘤徹底消失，開價數萬元。", keywords: ["神醫", "偏方", "特效藥", "降血糖", "地下電台", "老神醫"], details: "老人家背著子女偷偷購買，裡面往往只是添加了大量地下西藥成分（如類固醇、止痛藥）的違法偏方。" },
    { title: "改運/祭改消災", hint: "神棍恐嚇「你印堂發黑身上跟了厲鬼，這星期內家人必有血光之災」，需奉獻 10 萬元供養金功德祭改。", keywords: ["改運", "祭改", "消災", "神棍", "血光之災", "供養金"], details: "利用受害者面臨失業、失戀、或生重病時的心理脆弱期，以宗教恐嚇手段榨取高額費用。" },
    { title: "假冒慈善機構募款", hint: "建立與創世基金會、流浪動物之家極相似假官網並投廣告，誘使民眾線上刷卡綁定定期定額捐款。", keywords: ["慈善機構", "募款", "捐款", "流浪動物", "基金會", "定期定額"], details: "富有愛心的民眾不察，在網頁上輸入信用卡號，所有的愛心捐款最後全部流進詐團境外人頭戶。" },
    { title: "靈骨塔 investment", hint: "業務稱大老闆要百萬集體收購你手上的老舊塔位，但要求搭配 5 個頂級骨灰罈，誘騙先花 30 萬加購。", keywords: ["靈骨塔", "塔位", "骨灰罈", "生前契約", "收購"], details: "專門鎖定手上有大筆退休金的長輩。長輩掏錢買了一堆塑膠骨灰罈等待轉手獲利後，業務就徹底失聯。" },
    { title: "量子/高科技健康器材", hint: "免費體驗說明會，宣稱器材利用諾貝爾量子科技，能震碎毒素，一台成本幾百元塑膠墊賣 15 萬。", keywords: ["量子", "健康器材", "能量水", "高科技", "體驗會", "治療椅"], details: "在地方邀請老人家去體驗神奇電位治療椅。業務員在台上用各種偽科學名詞包裝，暴利販售。" },
    { title: "邪教/身心靈高價課程", hint: "集訓營集體催眠、精神洗腦，打擊學員自尊促與家庭斷絕，宣稱要把名下房產奉獻給教會救贖靈魂。", keywords: ["邪教", "身心靈", "奉獻", "心靈成長", "洗腦"], details: "主打心靈排毒課程。等學員加入後進行封閉式精神控制，聲稱金錢是萬惡之源，強迫奉獻名下所有財產。" },
    { title: "假減肥藥一對一導師", hint: "買了便宜減肥茶，有一對一導師天天關心，隨後嚴肅恐嚇「脂肪硬化堵塞，不買 3 萬溶脂排毒內臟會腐爛」。", keywords: ["減肥藥", "減脂", "體重管理", "導師", "溶脂", "排毒"], details: "受害者在內臟衰竭的恐懼下，往往被牽著鼻子不斷購買更貴的無效藥物，越陷越深。" },
    { title: "海外代購處方藥", hint: "自稱跨國醫藥代購專家，宣稱有特殊管道能從國外買到便宜 10 倍的學名藥或癌症特效標靶藥。", keywords: ["處方藥", "代購", "標靶藥", "特效藥", "學名藥"], details: "患者家屬視為救命稻草，急忙匯款數十萬，最後寄來的往往只是毫無療效的壓縮劑安慰劑，甚至直接失聯。" },
    { title: "假愛心捐棺", hint: "網路貼出無名屍或孤老老人慘死照片，宣稱無錢下葬，募集一副棺材 5500 元，同一張照片在數百群組募款。", keywords: ["捐棺", "積陰德", "棺材", "下葬", "孤老"], details: "利用台灣民間傳統「捐棺能積大陰德、改運」的習俗。重複募集了幾千副棺材的錢，全數中飽私囊。" },
    { title: "認養流浪動物詐騙", hint: "臉書社團貼出品種幼貓幼犬免費愛心領換，等接洽時要求先匯 8000 元醫藥補助費與運輸保證金。", keywords: ["領養", "流浪動物", "品種犬", "品種貓", "保證金", "運輸費"], details: "等錢匯過去，送養人連同粉專一併消失。利用愛心人士對動物的喜愛與憐憫進行詐騙。" }
  ],
  "商業與企業金融": [
    { title: "商務電子郵件詐騙 (BEC)", hint: "潛伏觀看公司與客戶交易，註冊極相似的域名 Email，通知買家「因年度審計，貨款請改匯至新海外帳戶」。", keywords: ["bec", "電子郵件", "會計", "貨款", "改匯", "商務"], details: "高階科技型商業詐騙。企業會計如果沒用電話再次核對，大筆貨款就會直接發送流進贓款戶。" },
    { title: "冒牌 CEO 應急", hint: "趁總經理在飛機上，偽造其頭像名字傳 LINE 給財務主管「正秘密洽談併購案，立刻緊急電匯 30 萬美金」。", keywords: ["ceo", "老闆", "董事長", "總經理", "會計", "電匯"], details: "詳細研究公司組織架構與高層出國行程。會計迫於主管威權與時間緊急，往往在驚慌中把錢匯出。" },
    { title: "假商標註冊通知", hint: "新創公司成立收到信稱「有第三方正惡意申請同名商標，必須 48 小時內匯款 8500 元商標防禦規費」。", keywords: ["商標", "註冊", "商商標註冊", "規費", "防禦"], details: "信件外觀極正式、蓋有類似官方圖章，宣稱不繳規費將失去商標所有權。實則與商標局無關。" },
    { title: "幽靈廣告年刊", hint: "寄送長得跟普通政府公文或電費單極像單據，要求繳納全台工商企業黃頁年刊登記費 3800 元。", keywords: ["年刊", "黃頁", "工商普查", "登記費", "總務"], details: "由於金額不大且外觀極像公家行政規費，公司總務常不經思考直接請款。付款後才知是私人垃圾網頁。" },
    { title: "假增資股票吸金", hint: "宣稱公司獲台積電授權研發最新 AI 晶片，明年掛牌上市翻 10 倍，發放印製精美的實體假股票紙。", keywords: ["增資", "股票", "吸金", "未上市", "晶片", "掛牌"], details: "等到吸金幾億元後，公司無預警宣告破產倒閉，投資人手上的實體假股票紙瞬間變成壁紙。" },
    { title: "專利勒索/版權流氓", hint: "不良公司網搜官網海報，發現不小心使用含有版權的背景字體或插圖，寄發律師函恐嚇索取 5 萬和解金。", keywords: ["專利勒索", "版權", "流氓", "律師函", "存證信函", "和解金"], details: "利用程式搜圖，將情節擴大恐嚇違反著作權法屬刑事犯罪可判刑，店家往往害怕影響商譽花錢消災。" },
    { title: "假採購大單陷阱", hint: "自稱中東大財團要採購 1000 萬 LED 路燈，正式簽約前夕稱依當地法律，台廠必須先付 1% 高官回扣規費。", keywords: ["採購", "大單", "回扣", "規費", "註冊費"], details: "台灣廠商欣喜若狂積極洽談，匯出數十萬所謂的當地政府註冊費或公證費後，對方直接斷絕聯絡。" },
    { title: "企業資安勒索", hint: "駭客植入木馬將伺服器研發機密全數軍事級加密，螢幕彈出「限 72 小時內匯入 5 顆比特幣否則銷毀」。", keywords: ["資安", "勒索", "木馬", "加密", "比特幣", "駭客", "伺服器"], details: "俗稱勒索病毒（Ransomware）。將報表個資全面鎖定，並威脅不付贖金就在暗網公開客戶隱私資料。" },
    { title: "假冒工商普查", hint: "自稱經濟部主計處，口氣嚴肅稱進行五年一度全台普查，要求透露開戶行、流動資金規模與股東個資。", keywords: ["工商普查", "普查", "主計處", "個資", "開戶銀行"], details: "利用公家機關主計普查名義公事公辦。得到的精準企業個資與大股東私人電話隨後會被轉賣給詐團。" },
    { title: "加盟總部吸金", hint: "加盟展打出一顧店顧店、3個月回本，誘騙簽約繳納百萬加盟金，隨後寄來二手爛設備並宣告倒閉。", keywords: ["加盟", "加盟金", "加盟總部", "連鎖", "設備費"], details: "包裝出排隊網紅飲料店品牌的假象。原物料售價比外面批發還貴，沒過幾個月總部就捲款宣告倒閉。" }
  ],
  "新興科技與複合式": [
    { title: "AI 變聲猜猜我是誰", hint: "搜集你親人 10 秒說話聲音，利用 AI 複製聲線語調打電話：「爸，我出急事被卡在警察局，快匯 20 萬」。", keywords: ["ai", "變聲", "聲音複製", "聲線", "猜猜我是誰", "兒子"], details: "傳統換電話借錢的科技終極進化版。AI 模擬出的聲線、語調甚至習慣口頭禪一模一樣，極易上當。" },
    { title: "ChatGPT 假投資軟體", hint: "打著「最新 OpenAI 授權，ChatGPT-5 核心架構開發的量子預知未來股市軟體」，販售 10 萬正序號。", keywords: ["chatgpt", "投資軟體", "量子", "股市軟體", "序號", "openai"], details: "利用民眾對新興 AI 科技的盲目崇拜，宣稱勝率 99.8%。實際上那只是一個隨機跳數字的抽籤垃圾程式。" },
    { title: "QR Code 貼條覆蓋", hint: "在公共路邊停車單、YouBike 車身或夜市收款處，偷偷黏貼假 QR Code 貼紙覆蓋在正統收款碼上方。", keywords: ["qr code", "二維碼", "貼紙", "覆蓋", "收款碼", "條碼"], details: "民眾在牽車或買小吃準備掃碼支付時，手機一掃，其實是直接把錢轉進了詐騙集團的電子支付帳戶中。" },
    { title: "假免費 Wi-Fi 攔截", hint: "在機場或星巴克設定完全免密碼、名稱極相似假無線網路（如 TPE-Free_Guest），連上後攔截所有網銀密碼。", keywords: ["wifi", "無線網路", "密碼", "攔截", "網銀密碼", "連線"], details: "民眾連上假 Wi-Fi 訊號。你在手機上輸入的任何網路銀行密碼、信用卡號，全會在後台被駭客截獲。" },
    { title: "二次詐騙", hint: "網搜「被騙的錢怎麼拿回來」，廣告宣稱有知名律師或網軍駭客團隊能成功追回，但要先付國際法庭規費。", keywords: ["二次詐騙", "追回", "渠道費", "駭客", "律師", "拿回來"], details: "專挑被害者傷口灑鹽。利用受害者急於把錢拿回來、挽回損失的心理，巧立名目進行第二層皮的壓榨。" },
    { title: "空頭支票買名錶", hint: "精品面交時拿公司支票給賣家，金額完全正確，網銀顯示交換票據入帳中，隔日銀行通知存款不足跳票。", keywords: ["空頭支票", "支票", "跳票", "名錶", "面交", "精品"], details: "由皮包公司開立本票。利用網銀「交換票據處理中」的網銀時間差騙走高價手錶，隔天直接存款不足跳票。" },
    { title: "手機簡訊截獲（SIM 盜卡）", hint: "偽造你雙證件去門市申辦補辦 SIM 卡，原本手機瞬間斷訊，詐團用新卡重設你網銀並接收 OTP 驗證碼。", keywords: ["sim", "簡訊截獲", "盜卡", "驗證碼", "otp", "電信"], details: "高階個資盜用詐騙（SIM Swapping）。順利接收銀行發送的簡訊 OTP 驗證碼，在幾分鐘內把存款轉光。" },
    { title: "惡意手機充電站", hint: "公共捷運站免費 USB 充電孔內部植入微型惡意晶片，點擊信任此裝置後，對話紀錄刷卡密碼被後台複製。", keywords: ["充電", "usb", "惡意晶片", "信任裝置", "充電站"], details: "俗稱充電陷阱（Juice Jacking）。不小心點了「信任此裝置」，手機內部照片、對話紀錄與刷卡密碼即遭自動複製。" },
    { title: "假車禍碰瓷勒索", hint: "狹窄巷弄故意擦撞汽車倒地，拿出早就摔碎的祖傳翡翠玉鐲或相機大喊：不當場拿 5 萬和解就告過失傷害。", keywords: ["碰瓷", "假車禍", "和解金", "玉鐲", "過失傷害"], details: "利用行車紀錄器死角或落單新手駕駛。恐嚇受害者會留下前科、工作不保，逼迫其當場交付現金。" },
    { title: "高利貸利滾利", hint: "身分證小額借款 3 萬，扣規費只給 2 萬 1，利息每 7 天為一期高達 30%，繳不出本金利滾利暴增成數百萬。", keywords: ["高利貸", "地下錢莊", "利滾利", "借款", "利息"], details: "打著免信用小額借貸口號吸引缺錢者。利息非按年按月計算，複利在惡性循環下迅速暴增成無底洞巨債。" }
  ]
};

export default function ScamMethods() {
  const router = useRouter();
  
  // 核心狀態
  const [quizList, setQuizList] = useState<any[]>([]); 
  const [answers, setAnswers] = useState<{ [key: number]: string }>({}); 
  const [wrongCounts, setWrongCounts] = useState<{ [key: number]: number }>({}); 
  const [status, setStatus] = useState<{ [key: number]: "typing" | "success" | "revealed" }>({}); 

  // 🔄 隨機抽題邏輯
  const generateQuiz = () => {
    const selectedQuiz: any[] = [];
    Object.keys(RAW_QUIZ_POOL).forEach((cat) => {
      const pool = RAW_QUIZ_POOL[cat];
      const randomIndex = Math.floor(Math.random() * pool.length);
      selectedQuiz.push({
        category: cat,
        ...pool[randomIndex]
      });
    });
    setQuizList(selectedQuiz);
    setAnswers({});
    setWrongCounts({});
    setStatus({});
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  // 📝 檢查答案
  const handleCheckAnswer = (index: number) => {
    const userAns = (answers[index] || "").trim().toLowerCase();
    const item = quizList[index];

    if (!userAns) {
      if (Platform.OS === "web") window.alert("請先輸入答案喔！");
      return;
    }

    const isCorrect = item.keywords.some((kw: string) => userAns.includes(kw.toLowerCase())) || 
                      item.title.toLowerCase().includes(userAns);

    if (isCorrect) {
      setStatus(prev => ({ ...prev, [index]: "success" }));
    } else {
      const currentWrong = (wrongCounts[index] || 0) + 1;
      setWrongCounts(prev => ({ ...prev, [index]: currentWrong }));

      if (currentWrong >= 2) {
        setStatus(prev => ({ ...prev, [index]: "revealed" }));
        if (Platform.OS === "web") {
          window.alert(`已連續答錯 2 次，系統自動公布官方正確解答：【${item.title}】`);
        }
      } else {
        if (Platform.OS === "web") {
          window.alert("答案不太對哦，再想想看！提示：可以填入核心手法簡稱（如：過路費、網銀）。");
        } else {
          Alert.alert("提示", "答案不太對哦，再想想看！");
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* 頂部導覽列 - 已拔除右側重複的換一卷按鈕 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. 基本手法填空挑戰</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* 已拔除黃色小燈泡圖案，排版更乾淨 */}
        <Text style={styles.pageDesc}>
          100種全功能大動態題庫：每次進入或刷新會從 10 大分類中各抽 1 題（共10題）。答案設定極其寬鬆，有相近字根即算過關；若連續答錯 2 次，系統將強制解鎖公布官方手法內文！
        </Text>

        {quizList.map((item, index) => {
          const currentStatus = status[index] || "typing";
          const isDone = currentStatus === "success" || currentStatus === "revealed";

          return (
            <View key={index} style={[styles.card, currentStatus === "success" && styles.cardSuccess, currentStatus === "revealed" && styles.cardRevealed]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardIndex}>第 {index + 1} 題 / 分類：{item.category}</Text>
                {!isDone && (
                  <Text style={styles.chanceText}>
                    剩餘機會：{2 - (wrongCounts[index] || 0)} 次
                  </Text>
                )}
              </View>
              
              <Text style={styles.hintText}>【 話術情境 】{item.hint}</Text>

              {!isDone ? (
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.input, Platform.OS === "web" && ({ outlineStyle: "none" } as any)]}
                    placeholder="輸入關鍵字（例如：過路費、網銀、換臉）..."
                    placeholderTextColor="#9ca3af"
                    value={answers[index] || ""}
                    onChangeText={(text) => setAnswers(prev => ({ ...prev, [index]: text }))}
                  />
                  <TouchableOpacity 
                    style={styles.checkBtn}
                    onPress={() => handleCheckAnswer(index)}
                  >
                    <Text style={styles.checkBtnText}>檢查</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.resultRow}>
                  <Text style={currentStatus === "success" ? styles.successText : styles.revealedText}>
                    {currentStatus === "success" ? `🎉 答對了！官方核心手法：【${item.title}】` : `系統解鎖官方答案：【${item.title}】`}
                  </Text>
                </View>
              )}

              {isDone && (
                <View style={styles.detailsBox}>
                  <Text style={styles.detailsTitle}>🔍 官方手法詳細拆解：</Text>
                  <Text style={styles.detailsContent}>{item.details}</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* 底部保留的唯一隨機重抽按鈕 */}
        <TouchableOpacity style={styles.bottomRefreshBtn} onPress={generateQuiz}>
          <Text style={styles.bottomRefreshBtnText}>🔄 重新隨機抽題 / 刷新全新考卷</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6" },
  header: { 
    height: 56, 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    borderBottomWidth: 1, 
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingHorizontal: 16
  },
  backButton: { paddingVertical: 8 },
  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
  headerTitle: { fontSize: 16, fontWeight: "900", color: "#111827", textAlign: "center", flex: 1 },
  placeholder: { width: 50 },

  container: { padding: 16 },
  pageDesc: { fontSize: 14, color: "#4b5563", fontWeight: "600", marginBottom: 16, textAlign: "justify", lineHeight: 20 },
  
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    ...Platform.select({
      web: { boxShadow: "0px 4px 12px rgba(0,0,0,0.03)" }
    })
  },
  cardSuccess: { borderColor: "#bbf7d0", backgroundColor: "#f0fdf4" },
  cardRevealed: { borderColor: "#fed7aa", backgroundColor: "#fffbb5" },
  
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  cardIndex: { fontSize: 12, fontWeight: "800", color: "#ef4444" },
  chanceText: { fontSize: 11, fontWeight: "700", color: "#9ca3af" },
  hintText: { fontSize: 15, fontWeight: "700", color: "#111827", lineHeight: 22, marginBottom: 12 },
  
  inputRow: { flexDirection: "row", gap: 10 },
  input: { 
    flex: 1, 
    height: 44, 
    borderRadius: 10, 
    backgroundColor: "#f3f4f6", 
    paddingHorizontal: 12, 
    fontSize: 14, 
    color: "#111827",
    fontWeight: "600"
  },
  checkBtn: { backgroundColor: "#111827", paddingHorizontal: 16, height: 44, borderRadius: 10, justifyContent: "center" },
  checkBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },

  resultRow: { padding: 6 },
  successText: { color: "#166534", fontSize: 14, fontWeight: "800" },
  revealedText: { color: "#c2410c", fontSize: 14, fontWeight: "800" },

  detailsBox: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
  detailsTitle: { fontSize: 13, fontWeight: "800", color: "#111827", marginBottom: 4 },
  detailsContent: { fontSize: 13, color: "#4b5563", lineHeight: 20, fontWeight: "500", textAlign: "justify" },

  bottomRefreshBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30
  },
  bottomRefreshBtnText: { color: "#fff", fontSize: 15, fontWeight: "800" }
});