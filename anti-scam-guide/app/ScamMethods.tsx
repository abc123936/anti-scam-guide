import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Linking,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 🌟 終極大數據庫：包含 40 題完全體 (20 題 ⭕ 正確、20 題 ❌ 錯誤)
const RAW_QUIZ_POOL: {
  category: string;
  title: string;
  hint: string;
  isTrue: boolean;
  details: string;
  link: string;
}[] = [
  // === 新聞素材 1：抖音假贈獎 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假贈獎騙取簡訊驗證碼】",
    hint: "國小學童在抖音看到『免費送遊戲幣』的影片，在不法分子引導下，拿家長的手機輸入電話號碼並將收到的簡訊驗證碼告知對方。不料該驗證碼為電信公司的『One Number』服務綁定碼，導致家長門號遭詐騙集團暗中綁定，並被當作人頭電話對外發送大量詐騙簡訊。",
    isTrue: true,
    details:
      "沒錯，這確實是【假贈獎騙取簡訊驗證碼】的手法。利用免費遊戲幣誘騙孩童交出關鍵驗證碼以盜用家長電信帳戶發送大量詐騙簡訊。",
    link: "https://www.mirrormedia.mg/story/20260408edi011",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【網路假冒名人飆股詐騙】",
    hint: "國小學童在抖音看到『免費送遊戲幣』的影片，在不法分子引導下，拿家長的手機輸入電話號碼並將收到的簡訊驗證碼告知對方。不料該驗證碼為電信公司的『One Number』服務綁定碼，導致家長門號遭詐騙集團暗中綁定，並被當作人頭電話對外發送大量詐騙簡訊。",
    isTrue: false,
    details:
      "這其實是【假贈獎騙取簡訊驗證碼】的手法！嫌犯並非透過網路社群假冒財經名人引導加入飆股 LINE 群組，而是利用免費遊戲幣誘騙孩童交出關鍵驗證碼以盜用電信帳戶。",
    link: "https://www.mirrormedia.mg/story/20260408edi011",
  },
  // === 新聞素材 2：肉粽店大宗批發案 ===
  {
    category: "網路社會與通訊軟體",
    title: "【投資與虛擬貨幣】",
    hint: "端午節前夕接到自稱肉粽店主管來電，謊稱系統錯誤將訂單設為大宗批發商，今晚不解除將每月自動扣款，隨後引導陳先生操作網路銀行，導致慘賠百萬。",
    isTrue: false,
    details:
      "這其實是【網購設定錯誤/解除分期】的手法！詐騙集團利用節慶網購熱潮，編造系統設定錯誤的藉口來誘騙民眾操作網銀，並非投資或虛擬貨幣詐騙。",
    link: "https://www.mirrormedia.mg/story/20260607-174soc-145147",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【網購設定錯誤/解除分期詐騙】",
    hint: "端午節前夕接到自稱肉粽店主管來電，謊稱系統錯誤將訂單設為大宗批發商，今晚不解除將每月自動扣款，隨後引導陳先生操作網路銀行，導致慘賠百萬。",
    isTrue: true,
    details:
      "沒錯，這確實是【網購設定錯誤/解除分期】的手法。詐騙集團利用端午網購時機，假冒店家與銀行客服雙重施壓，利用民眾擔心被連續扣款的恐慌心理誘導轉帳。",
    link: "https://www.mirrormedia.mg/story/20260607-174soc-145147",
  },
  // === 新聞素材 3：哥哥酒駕交保丟包案 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假交友戀愛詐騙】",
    hint: "在交友軟體結識異性出遊，行程結束後對方佯稱『哥哥酒駕被捕急需交保金』借走 15 萬元，隨後將人丟包在超商，連手機包包也一併載走，且車輛掛的是假車牌。",
    isTrue: true,
    details:
      "沒錯，這確實是【假交友戀愛詐騙】的手法。利用交友軟體建立信任與好感，再編造家人出事等緊急理由實體詐財並丟包被害人。",
    link: "https://www.mirrormedia.mg/story/20260603edi037",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假冒公務機關監管帳戶詐騙】",
    hint: "在交友軟體結識異性出遊，行程結束後對方佯稱『哥哥酒駕被捕急需交保金』借走 15 萬元，隨後將人丟包在超商，連手機包包也一併載走，且車輛掛的是假車牌。",
    isTrue: false,
    details:
      "這其實是【假交友戀愛詐騙】的手法！雖然涉及交保金，本質是利用網絡交友感情基礎進行實體詐欺與竊盜，並非歹徒假冒檢察官監管財產。",
    link: "https://www.mirrormedia.mg/story/20260603edi037",
  },
  // === 新聞素材 4 ===
  {
    category: "網路社會與通訊軟體",
    title: "【網購客服金流詐騙】",
    hint: "高中男同學盜用正妹照片與個資在 IG 開假帳號，自導自演兩人熱戀並散播不實性愛片，甚至冒用女方名義向其親友演出『沒錢繳學費』的苦情戲碼誘騙匯款。",
    isTrue: false,
    details:
      "這其實是【盜用身分/假冒熟人型詐欺】！雖然涉及金流，但核心手法是利用熟人個資在社群開假帳號，並鎖定被害人的親友圈進行精準欺詐。",
    link: "https://www.mirrormedia.mg/story/20260530web006",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【盜用身分/假冒熟人型詐欺】",
    hint: "高中男同學盜用正妹照片與個資在 IG 開假帳號，自導自演兩人熱戀並散播不實性愛片，甚至冒用女方名義向其親友演出『沒錢繳學費』的苦情戲碼誘騙匯款。",
    isTrue: true,
    details:
      "沒錯，這確實是【盜用身分/假冒熟人型詐欺】。嫌犯利用身邊熟人的個資建立虛假人設，透過散播謠言製造控制權並精準欺騙親友圈。",
    link: "https://www.mirrormedia.mg/story/20260530web006",
  },
  // === 新聞素材 5 ===
  {
    category: "電信與簡訊詐騙",
    title: "【惡意釣魚連結詐騙】",
    hint: "收到偽裝成『財政部』的電子郵件宣稱可領 2 萬多元退稅款，要求點擊信中連結進行個資驗證，並誘導填寫信用卡卡號、效期與安全碼以利領取退款。",
    isTrue: true,
    details:
      "沒錯，這確實是【惡意釣魚連結詐騙】。官方絕不會透過郵件要求輸入信用卡資訊退稅，假網站通常由亂碼組成，目的是盜刷你的信用卡。",
    link: "https://www.mirrormedia.mg/story/20260521edi068",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假冒國稅局補繳稅款詐騙】",
    hint: "民眾收到一封自稱是 Facebook 官方的電子郵件，警告帳號出現異常登入，並附帶一個『這不是我本人』的按鈕。當事人因慌張按下按鈕後，被引導至一個要求輸入臉書帳號與網銀密碼的網頁，完成後導致個人社群帳號當場被盜走。",
    isTrue: false,
    details:
      "這其實是【惡意釣魚連結詐騙】的手法！本案為利用假社群官方系統信件進行釣魚盜帳號，並非在報稅季假冒稅務機關公務員要求補繳稅款。",
    link: "https://www.mirrormedia.mg/story/20260515edi021",
  },
  // === 新聞素材 6 ===
  {
    category: "投資與虛擬貨幣",
    title: "【海外交易所殺豬盤】",
    hint: "臉書看到免費領取白沙屯媽祖手鍊廣告，私訊後收到假交易平台連結，對方以『實名制認證失敗、帳戶遭鎖定』為由，恐嚇被害人將實體金融卡寄出並提供密碼。",
    isTrue: false,
    details:
      "這其實是【假宮廟名義/騙取人頭帳戶】的手法！詐騙集團編造藉口來誘騙民眾交付實體金融卡，並非投資或虛擬貨幣詐騙。",
    link: "https://www.mirrormedia.mg/story/20260503soc001",
  },
  {
    category: "投資與虛擬貨幣",
    title: "【假宮廟名義/騙取人頭帳戶詐騙】",
    hint: "臉書看到免費領取白沙屯媽祖手鍊廣告，私訊後收到假交易平台連結，對方以『實名制認證失敗、帳戶遭鎖定』為由，恐嚇被害人將實體金融卡寄出並提供密碼。",
    isTrue: true,
    details:
      "沒錯，這確實 es【假宮廟名義/騙取人頭帳戶詐騙】。不法分子利用信徒對神明的虔誠心理以結緣品為幌子，再透過假話術恐嚇騙取實體卡作洗錢帳戶。",
    link: "https://www.mirrormedia.mg/story/20260503soc001",
  },
  // === 新聞素材 7 ===
  {
    category: "網路社會與通訊軟體",
    title: "【LINE 派對模式側錄詐騙】",
    hint: "網購蒜頭雞蛋時，假客服誆稱須完成實名制才能交易，誘導民眾加入 LINE 官方帳號並開啟『派對模式（分享螢幕）』，藉機側錄民眾的手機轉帳與付款 QR Code。",
    isTrue: true,
    details:
      "沒錯，這確實是【LINE 派對模式側錄詐騙】。官方客服絕不會要求你分享螢幕畫面，任何視訊教學、螢幕分享都可能讓你的帳戶與密碼當場外洩。",
    link: "https://www.mirrormedia.mg/story/20260430edi034",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【網購一頁式廣告詐騙】",
    hint: "網購蒜頭雞蛋時，假客服誆稱須完成實名制才能交易，誘導民眾加入 LINE 官方帳號並開啟『派對模式（分享螢幕）』，藉機側錄民眾的手機轉帳與付款 QR Code。",
    isTrue: false,
    details:
      "這其實是【LINE 派對模式側錄詐騙】！歹徒核心手法是利用通訊軟體的內建螢幕分享功能，即時側錄被害人操作手機畫面進而盜取金融資料。",
    link: "https://www.mirrormedia.mg/story/20260430edi034",
  },
  // === 新聞素材 8 ===
  {
    category: "網路社會與通訊軟體",
    title: "【非法租用存摺求職詐騙】",
    hint: "社群宣稱『免費贈送 iPhone 手機』，加 LINE 後假客服以實名認證失敗為由，引導民眾到 ATM 操作『無卡提款』功能以提供『財力證明』，進而騙走無卡提款序號。",
    isTrue: false,
    details:
      "這其實是【假贈獎/騙取無卡提款序號】的手法！詐騙集團用免費手機當誘餌，利用民眾對金融功能的不熟悉，隔空騙走提款序號並直接提領現金。",
    link: "https://www.mirrormedia.mg/story/20260503soc004",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假贈獎/騙取無卡提款序號詐騙】",
    hint: "社群宣稱『免費贈送 iPhone 手機』，加 LINE 後假客服以實名認證失敗為由，引導民眾到 ATM 操作『無卡提款』功能以提供『財力證明』，進而騙走無卡提款序號。",
    isTrue: true,
    details:
      "沒錯，這確實 es【假贈獎/騙取無卡提款序號】的手法。在社群利用高價產品吸引好康群眾，並將 ATM「無卡提款」包裝成驗證流程藉此隔空取款。",
    link: "https://www.mirrormedia.mg/story/20260503soc004",
  },
  // === 新聞素材 9 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒官方釣魚網頁】",
    hint: "假冒悠遊卡會員中心發郵件稱發票中獎 1,000 元，點進網頁後發現，隨意輸入一串手機亂碼竟然也能『驗證成功』，並馬上跳轉要求輸入完整的信用卡號與安全碼。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒官方釣魚網頁】。真實網頁會有後端驗證機制，釣魚網站因為沒有後端，不管輸入什麼亂碼都會成功，純粹是為了蒐集你的卡號。",
    link: "https://www.mirrormedia.mg/story/20260302edi042",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【點數卡儲值核對身分詐騙】",
    hint: "假冒悠遊卡會員中心發郵件稱發票中獎 1,000 元，點進網頁後發現，隨意輸入一串手機亂碼竟然也能『驗證成功』，並馬上跳轉要求輸入完整的信用卡號與安全碼。",
    isTrue: false,
    details:
      "這其實是【假冒官方釣魚網頁】。歹徒是架設高仿的官網介面來騙取信用卡的完整機密欄位以實施線上盜刷，並非要求購買實體遊戲點數。",
    link: "https://www.mirrormedia.mg/story/20260302edi042",
  },
  // === 新聞素材 10 ===
  {
    category: "金融機構與帳戶",
    title: "【銀行帳戶凍結警示】",
    hint: "Threads 上出現大量自稱 7-11 店員的新帳號，稱為了完成經理交付的『漲粉絲』任務，只要網友按下追蹤並私訊，就能免費領取布丁、泡麵與不鏽鋼杯等福利。",
    isTrue: false,
    details:
      "這其實是【社群假帳號增粉/個資詐騙】！詐騙集團冒充超商員工利用貪小便宜心理吸引大批網友追蹤私訊，隨後會引導點擊不明連結來竊取個資。",
    link: "https://www.mirrormedia.mg/story/20260404edi008",
  },
  {
    category: "金融機構與帳戶",
    title: "【社群假帳號增粉/個資詐騙】",
    hint: "Threads 上出現大量自稱 7-11 店員的新帳號，稱為了完成經理交付的『漲粉絲』任務，只要網友按下追蹤並私訊，就能免費領取布丁、泡麵與不鏽鋼杯等福利。",
    isTrue: true,
    details:
      "沒錯，這確實 es【社群假帳號增粉/個資詐騙】。不法分子集體註冊山寨知名企業員工帳號，利用免費贈送物資噱頭快速獲取追蹤，實則長線收集個資。",
    link: "https://www.mirrormedia.mg/story/20260404edi008",
  },
  // === 新聞素材 11 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒公務機關或檢警詐騙】",
    hint: "高齡長者接獲自稱刑事局警官與地檢署檢察官來電，宣稱其涉嫌洗錢防制法重罪，其名下財產將被凍結。為配合『監管帳戶』以證明清白，長者依指示前往銀行將定存解約，並臨櫃匯款新臺幣數百萬元至對方指定的安全帳戶，事後與家人提及才知受騙。",
    isTrue: true,
    details:
      "沒錯，這確實 es【假冒公務機關或檢警詐騙】的經典手法。不法分子利用民眾對司法的畏懼，以監管帳戶為由施壓。警檢絕不會在電話中辦案或監管財產。",
    link: "https://www.mirrormedia.mg/story/20260320edi002",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【惡意釣魚連結詐騙】",
    hint: "高齡長者接獲自稱刑事局警官與地檢署檢察官來電，宣稱其涉嫌洗錢防制法重罪，其名下財產將被凍結。為配合『監管帳戶』以證明清白，長者依指示前往銀行將定存解約，並臨櫃匯款新臺幣數百萬元至對方指定的安全帳戶，事後與家人提及才知受騙。",
    isTrue: false,
    details:
      "這其實是【假冒公務機關或檢警詐騙】的手法！本案完全是由不法分子透過電話語音威脅、要求臨櫃匯款，而非發送含有木馬程式的線上釣魚連結。",
    link: "https://www.mirrormedia.mg/story/20260320edi002",
  },
  // === 新聞素材 12 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假冒國稅局補繳稅款詐騙】",
    hint: "民眾收到一封自稱是 Facebook 官方的電子郵件，警告帳號出現異常登入，並附帶一個『這不是我本人』的按鈕。當事人因慌張按下按鈕後，被引導至一個要求輸入臉書帳號與網銀密碼的網頁，完成後導致個人社群帳號當場被盜走。",
    isTrue: false,
    details:
      "這其實是【惡意釣魚連結詐騙】的手法！本案為利用假社群官方信件進行釣魚盜帳號，並非在報稅季假冒稅務機關公務員要求補繳稅款。",
    link: "https://www.mirrormedia.mg/story/20260515edi021",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【惡意釣魚連結詐騙】",
    hint: "民眾收到一封自稱是 Facebook 官方的電子郵件，警告帳號出現異常登入，並附帶一個『這不是我本人』的按鈕。當事人因慌張按下按鈕後，被引導至一個要求輸入臉書帳號與網銀密碼的網頁，完成後導致個人社群帳號當場被盜走。",
    isTrue: true,
    details:
      "沒錯，這確實 es【惡意釣魚連結詐騙】。不法分子利用假系統警告製造恐慌，引導至假網頁輸入帳密與登入憑證來竊取個人社群帳號控制權。",
    link: "https://www.mirrormedia.mg/story/20260515edi021",
  },
  // === 新聞素材 13 ===
  {
    category: "網路社會與通訊軟體",
    title: "【理財假投資飆股詐騙】",
    hint: "保險公司通訊處前經理利用保戶與親友的信任，長達 20 年自行印製假契約，推銷宣稱年報酬率 5% 至 14% 的假保險與信託憑證商品，將吸金近五千萬元挪作個人周轉，最後因周轉失靈被檢方起訴並建請從重量刑。",
    isTrue: false,
    details:
      "這其實是【利用職務偽造保單非法吸金】的手法！嫌犯並非透過網路、簡訊引導加入飆股群組，而是身為保險公司高階主管，直接利用實體熟人關係與偽造公司商標文書來誘騙親友。",
    link: "https://www.mirrormedia.mg/story/20260630edi045",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【利用職務偽造保單非法吸金】",
    hint: "保險公司通訊處前經理利用保戶與親友的信任，長達 20 年自行印製假契約，推銷宣稱年報酬率 5% 至 14% 的假保險與信託憑證商品，將吸金近五千萬元挪作個人周轉，最後因周轉失靈被檢方起訴並建請從重量刑。",
    isTrue: true,
    details:
      "沒錯，這確實 es【利用職務偽造保單非法吸金】的手法。高階主管自製假契約與高回報率商品，直接進行長達20年的龐氏吸金騙局。",
    link: "https://www.mirrormedia.mg/story/20260630edi045",
  },
  // === 新聞素材 14 ===
  {
    category: "網路社會與通訊軟體",
    title: "【網路假冒名人飆股詐騙】",
    hint: "地方教會牧師利用宗教信仰對信眾進行心靈控制，貶低被害人父母並宣稱財產應留給教會，甚至鼓勵信徒將保險受益人及財產規劃與教會連結、大力募款，涉嫌財產詐騙金額超過千萬元，遭台中地檢署分案偵辦。",
    isTrue: false,
    details:
      "這其實是【利用宗教信仰心靈控制與斂財】的手法！嫌犯並非利用社群投顧老師帶盤，而是假藉實體教會神職威權對信眾進行精神壓力洗腦榨取財產。",
    link: "https://www.mirrormedia.mg/story/20260630-167inv-123147",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【利用宗教信仰心靈控制與斂財】",
    hint: "地方教會牧師利用宗教信仰對信眾進行心靈控制，貶低被害人父母並宣稱財產應留給教會，甚至鼓勵信徒將保險受益人及財產規劃與教會連結、大力募款，涉嫌財產詐騙金額超過千萬元，遭台中地檢署分案偵辦。",
    isTrue: true,
    details:
      "沒錯，這確實 es【利用宗教信仰心靈控制與斂財】。不法分子假借神職人員威權孤立個體，進而使其在特定精神控制與壓力下主動奉獻大筆財產。",
    link: "https://www.mirrormedia.mg/story/20260630-167inv-123147",
  },
  // === 新聞素材 15 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假贈獎騙取無卡提款序號】",
    hint: "民眾網購媽祖壓轎金，點擊假賣貨便網站卻跳出『需實名制認證』，隨後假賣家利用訊息瘋狂轟炸，甚至傳送『有家暴傾向的老公正在破門踹打』的偽造影片進行情緒勒索，使民眾心急之下聽從假客服指示，交出無卡提款序號（QR Code），導致存款立刻遭隔空提領 3 萬元。",
    isTrue: true,
    details:
      "沒錯，這確實 es【假贈獎騙取無卡提款序號】的手法。歹徒同時扮演假賣家與假客服，配合假家暴影片施加心理壓力，隔空騙取無卡提款 QR Code 序號。",
    link: "https://www.mirrormedia.mg/story/20260517-174soc-144102",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【海外虛擬貨幣交易所殺豬盤】",
    hint: "民眾網購媽祖壓轎金，點擊假賣貨便網站卻跳出『需實名制認證』，隨後假賣家利用訊息瘋狂轟炸，甚至傳送『有家暴傾向的老公正在破門踹打』的偽造影片進行情緒勒索，使民眾心急之下聽從假客服指示，交出無卡提款序號（QR Code），導致存款立刻遭隔空提領 3 萬元。",
    isTrue: false,
    details:
      "這其實是【假贈獎騙取無卡提款序號】的手法！嫌犯並非引導被害人投資泰達幣，而是利用山寨網頁與苦情情緒勒索施壓，直接在 ATM 騙取無卡提款序號。",
    link: "https://www.mirrormedia.mg/story/20260517-174soc-144102",
  },
  // === 新聞素材 16 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒官方簡訊惡意下載 APP】",
    hint: "郭姓主嫌為首的洗錢集團，利用『Fppay』、『鑫豪支付』等新興支付平台，結合多間人頭公司的金融帳戶進行虛假交易，幫博弈與詐騙集團進行代收代付，在短期內暗中洗錢高達 4 億 4,761 萬多元，遭檢警大規模搜索並聲押禁見獲准。",
    isTrue: false,
    details:
      "這其實是【人頭公司與支付平台跨境洗錢水房】的手法！本案屬於後端虛假金流代收代付犯罪，並非利用簡訊大肆發送惡意下載 APP 的連結。",
    link: "https://www.mirrormedia.mg/story/20260629-169soc-160655",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【人頭公司與支付平台跨境洗錢水房】",
    hint: "郭姓主嫌為首的洗錢集團，利用『Fppay』、『鑫豪支付』等新興支付平台，結合多間人頭公司的金融帳戶進行虛假交易，幫博弈與詐騙集團進行代收代付，在短期內暗中洗錢高達 4 億 4,761 萬多元，遭檢警大規模搜索並聲押禁見獲准。",
    isTrue: true,
    details:
      "沒錯，這確實 es【人頭公司與支付平台跨境洗錢水房】。利用合法的第三方支付系統或新興支付平台，透過大量人頭公司帳戶做假交易將不法髒錢代收洗白。",
    link: "https://www.mirrormedia.mg/story/20260629-169soc-160655",
  },
  // === 新聞素材 17 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假交友戀愛詐騙】",
    hint: "女網網紅在網路交往期間，拿兩條線驗孕棒並傳送從中國社群平台『小紅書』下載、帶有浮水印的胎兒超音波照片佯稱懷孕，拒絕男方陪同產檢，事後甚至自行修圖竄改法院裁定書來證明虛假身分，遭檢方依詐欺與偽造公文書罪起訴。",
    isTrue: true,
    details:
      "沒錯，這確實 es【假交友戀愛詐騙】的手法！利用情感與信任編造網戀懷孕等藉口索取財物，並透過網路下載圖片與偽造公文書來使騙局逼真。",
    link: "https://www.mirrormedia.mg/story/20260628inv005",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假贈獎騙取簡訊驗證碼】",
    hint: "女網網紅在網路交往期間，拿兩條線驗孕棒並傳送從中國社群平台『小紅書』下載、帶有浮水印的胎兒超音波照片佯稱懷孕，拒絕男方陪同產檢，事後甚至自行修圖竄改法院裁定書來證明虛假身分，遭檢方依詐欺與偽造公文書罪起訴。",
    isTrue: false,
    details:
      "這其實是【假交友戀愛詐騙】的手法！嫌犯是利用情感寄託進行長期的身分虛設與吸金，並非利用社群平台上的免費中獎送禮活動來騙取門號驗證碼。",
    link: "https://www.mirrormedia.mg/story/20260628inv005",
  },
  // === 新聞素材 18 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒國稅局補繳稅款詐騙】",
    hint: "報稅季期間，民眾接獲自稱國稅局公務員的電話，聲稱其稅款異常需要立刻補繳，並引導民眾前往 ATM 操作或開啟網路銀行進行匯款。內政部對此提醒，政府機關絕不會透過電話要求民眾操作 ATM，且秒辨真偽的最簡單方法就是檢查網址結尾是否為『.gov.tw』。",
    isTrue: true,
    details:
      "沒錯，這確實 es【假冒國稅局補繳稅款詐騙】的手法。不法分子假冒稅務公務員電話催繳施壓，記住政府機關絕對不會電話指示操作實體 ATM 或網銀功能。",
    link: "https://www.mirrormedia.mg/story/20260508edi041",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【理財假投資飆股詐騙】",
    hint: "報稅季期間，民眾接獲自稱國稅局公務員的電話，聲稱其稅款異常需要立刻補繳，並引導民眾前往 ATM 操作 or 開啟網路銀行進行匯款。內政部對此提醒，政府機關絕不會透過電話要求民眾操作 ATM，且秒辨真偽的最簡單方法就是檢查網址結尾是否為『.gov.tw』。",
    isTrue: false,
    details:
      "這其實是【假冒國稅局補繳稅款詐騙】的手法！此手法是假冒公權力機關進行強制性催繳恐嚇，與引誘民眾加入 LINE 投資群組的假飆股完全不同。",
    link: "https://www.mirrormedia.mg/story/20260508edi041",
  },
  // === 新聞素材 19 ===
  {
    category: "投資與虛擬貨幣",
    title: "【海外虛擬貨幣交易所殺豬盤】",
    hint: "北市婦人誤信認識一年的朋友介紹，稱只要投入 500 萬元本金投資某金融科技公司，就能『月領 15 萬』收益，保證年投報率高達 36%。婦人因此賣掉長期持有的 0050 ETF 欲臨櫃匯款，所幸被派出所所長與行員及時攔阻，成功保住 500 萬積蓄。",
    isTrue: false,
    details:
      "這其實是【實體熟人/假金融科技公司保證獲利】的投資詐騙手法！嫌犯並非透過網路交友引導下載山寨交易所 APP，而是以實體高利率誘騙臨櫃匯款。",
    link: "https://www.mirrormedia.mg/story/20260410edi013",
  },
  {
    category: "投資與虛擬貨幣",
    title: "【實體熟人/假金融科技公司保證獲利投資詐騙】",
    hint: "北市婦人誤信認識一年的朋友介紹，稱只要投入 500 萬元本金投資某金融科技公司，就能『月領 15 萬』收益，保證年投報率高達 36%。婦人因此賣掉長期持有的 0050 ETF 欲臨櫃匯款，所幸被派出所所長與行員及時攔阻，成功保住 500 萬積蓄。",
    isTrue: true,
    details:
      "沒錯，這確實 es【實體熟人/假金融科技公司保證獲利投資詐騙】。利用定期超常高配息話術引導解約穩健的 0050 進行匯款，面對暴利應保持高度警覺。",
    link: "https://www.mirrormedia.mg/story/20260410edi013",
  },
  // === 新聞素材 20 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假冒官方中獎通知釣魚詐騙】",
    hint: "民眾收到偽裝成『悠遊卡官方會員中心』的電子郵件通知發票中獎，點擊信中連結進入與官網一模一樣的假網頁，並依指示輸入信用卡號、有效期限與背面驗證碼。隨後手機收到簡訊，民眾未注意是『刷卡驗證通知』便將驗證碼填入，導致信用卡當場遭盜刷 7 萬 7,270 元。",
    isTrue: true,
    details:
      "沒錯，這確實 es【假冒官方中獎通知釣魚詐騙】的手法。利用高仿山寨中獎網頁竊取信用卡個資與 OTP 刷卡驗證簡訊以完成線上大量盜刷。",
    link: "https://www.mirrormedia.mg/story/20260305edi033",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假冒官方簡訊惡意下載 APP】",
    hint: "民眾收到偽裝成『悠遊卡官方會員中心』的電子郵件通知發票中獎，點擊信中連結進入與官網一模一樣的假網頁，並依指示輸入信用卡號、有效期限與背面驗證碼。隨後手機收到簡訊，民眾未注意是『刷卡驗證通知』便將驗證碼填入，導致信用卡當場遭盜刷 7 萬 7,270 元。",
    isTrue: false,
    details:
      "這其實是【假冒官方中獎通知釣魚詐騙】的手法！嫌犯是利用假網頁騙取信用卡號與轉帳 OTP 碼，並非發送簡訊大肆發送惡意下載 APP 的連結。",
    link: "https://www.mirrormedia.mg/story/20260305edi033",
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default function ScamMethods() {
  const router = useRouter();

  const [deck, setDeck] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // 🌟 核心得分與挑戰結束控制狀態
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const stateRef = useRef({ deck: [] as any[], currentIndex: 0 });

  useEffect(() => {
    stateRef.current = { deck, currentIndex };
  }, [deck, currentIndex]);

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const forceSwipe = (direction: "left" | "right") => {
    const x = direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: "left" | "right") => {
    const currentDeck = stateRef.current.deck;
    const currIdx = stateRef.current.currentIndex;
    const currentCard = currentDeck[currIdx];

    if (!currentCard) return;

    const isGuessingTrue = direction === "right";
    const correct = currentCard.isTrue === isGuessingTrue;

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setIsAnswerCorrect(correct);
    setShowResult(true);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-25deg", "0deg", "25deg"],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const generateDeck = () => {
    // 隨機打亂並從 40 題終極庫抽 10 題
    const shuffled = [...RAW_QUIZ_POOL]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setIsQuizFinished(false);
    position.setValue({ x: 0, y: 0 });
  };

  useEffect(() => {
    generateDeck();
  }, []);

  const nextCard = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
      position.setValue({ x: 0, y: 0 });
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleOpenLink = async (url: string) => {
    if (!url) return;
    if (Platform.OS === "web") {
      window.open(url, "_blank");
    } else {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          await Linking.openURL(url);
        }
      } catch (error) {
        console.log("無法開啟超連結:", error);
      }
    }
  };

  if (deck.length === 0) return null;
  const currentCard = deck[currentIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. 基本手法挑戰</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.container}>
        <Text style={styles.progressText}>
          進度：{isQuizFinished ? 10 : currentIndex + 1} / {deck.length}
        </Text>

        {/* 🏆 情況 A：答完 10 題後的終極成績單結算 */}
        {isQuizFinished ? (
          <View style={styles.resultCard}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreEmoji}>🏆</Text>
              <Text style={styles.scoreTitle}>挑戰完成！</Text>
              <Text style={styles.scoreText}>
                您的得分：
                <Text style={styles.scoreHighlight}>{score * 10}</Text> 分
              </Text>
              <Text style={styles.scoreSub}>
                成功答對了 {score} / 10 題時事防詐題！
              </Text>

              <TouchableOpacity
                style={styles.refreshLargeBtn}
                onPress={generateDeck}
              >
                <Text style={styles.refreshBtnText}>🔄 重新刷新考題挑戰</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : showResult ? (
          /* 📝 情況 B：單題手勢結束後的精簡解答卡片 */
          <View style={styles.resultCard}>
            <ScrollView
              contentContainerStyle={styles.resultScroll}
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={
                  isAnswerCorrect ? styles.resultCorrect : styles.resultWrong
                }
              >
                {isAnswerCorrect ? "🎉 判斷正確！" : "💥 判斷錯誤！"}
              </Text>

              <Text style={styles.detailsTitle}>{currentCard.details}</Text>

              <TouchableOpacity
                style={styles.linkBox}
                onPress={() => handleOpenLink(currentCard.link)}
                activeOpacity={0.7}
              >
                <Text style={styles.linkLabel}>
                  📰 原始時事新聞查核直達連結（點擊前往）：
                </Text>
                <Text style={styles.linkText} numberOfLines={1}>
                  {currentCard.link}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextBtn} onPress={nextCard}>
                <Text style={styles.nextBtnText}>
                  {currentIndex === deck.length - 1
                    ? "查看最終成果 📊"
                    : "下一題 ⏭️"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.refreshSmallBtn}
                onPress={generateDeck}
              >
                <Text style={styles.refreshSmallText}>🔄 刷新題目重新開始</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ) : (
          /* 🎴 情況 C：經典 Tinder 左右滑動卡片模式 */
          <Animated.View
            key={currentIndex}
            style={[styles.card, getCardStyle()]}
            {...panResponder.panHandlers}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.categoryTag}>{currentCard.category}</Text>
              </View>

              <Text style={styles.cardTitle}>{currentCard.title}</Text>
              <Text style={styles.vsText}>搭配以下情境，正確嗎？</Text>

              <View style={styles.hintBox}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.hintText}>"{currentCard.hint}"</Text>
                </ScrollView>
              </View>
            </View>

            <View style={styles.cardBottomBar}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.btnCross]}
                onPress={() => forceSwipe("left")}
              >
                <Text style={[styles.actionIcon, { color: "#ef4444" }]}>
                  ❌
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.btnCheck]}
                onPress={() => forceSwipe("right")}
              >
                <Text style={[styles.actionIcon, { color: "#22c55e" }]}>
                  🟢
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  backButton: { paddingVertical: 4 },
  backText: { fontSize: 14, color: "#ef4444", fontWeight: "700" },
  headerTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },
  placeholder: { width: 50 },
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "800",
    marginBottom: 8,
  },
  card: {
    width: "100%",
    height: 480,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    justifyContent: "space-between",
    ...Platform.select({
      web: { boxShadow: "0px 8px 24px rgba(0,0,0,0.06)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  cardContent: { padding: 16, flex: 1, justifyContent: "center" },
  cardHeader: { alignItems: "center", marginBottom: 12 },
  categoryTag: {
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 11,
    fontWeight: "800",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },
  vsText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 12,
  },
  hintBox: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    flex: 1,
    maxHeight: 220,
  },
  hintText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    lineHeight: 22,
    textAlign: "justify",
  },
  cardBottomBar: {
    height: 80,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
  },
  actionBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCross: { borderWidth: 2, borderColor: "#ef4444" },
  btnCheck: { borderWidth: 2, borderColor: "#22c55e" },
  actionIcon: { fontSize: 18, fontWeight: "bold" },

  resultCard: {
    width: "100%",
    height: 480,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    ...Platform.select({
      web: { boxShadow: "0px 8px 24px rgba(0,0,0,0.06)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  resultScroll: { padding: 20, flexGrow: 1, justifyContent: "center" },
  resultCorrect: {
    fontSize: 22,
    fontWeight: "900",
    color: "#166534",
    textAlign: "center",
    marginBottom: 10,
  },
  resultWrong: {
    fontSize: 22,
    fontWeight: "900",
    color: "#b91c1c",
    textAlign: "center",
    marginBottom: 10,
  },
  detailsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 14,
    textAlign: "justify",
    lineHeight: 20,
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  linkBox: {
    backgroundColor: "#fff5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  linkLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#ef4444",
    marginBottom: 2,
  },
  linkText: {
    fontSize: 10,
    color: "#1d4ed8",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  nextBtn: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  nextBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },

  // 🏆 成績單專屬完美閉合樣式
  scoreContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  scoreEmoji: { fontSize: 50, marginBottom: 10 },
  scoreTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 6,
  },
  scoreHighlight: { fontSize: 32, fontWeight: "900", color: "#ef4444" },
  scoreSub: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "700",
    marginBottom: 36,
    textAlign: "center",
  },
  refreshLargeBtn: {
    backgroundColor: "#ef4444",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  refreshBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  refreshSmallBtn: { marginTop: 14, paddingVertical: 6, alignItems: "center" },
  refreshSmallText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
