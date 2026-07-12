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

// 🌟 終極防詐大數據庫：包含 80 題完全體 (40 題 ⭕ 正確、40 題 ❌ 錯誤)
const RAW_QUIZ_POOL: {
  category: string;
  title: string;
  hint: string;
  isTrue: boolean;
  details: string;
  link: string;
}[] = [
  // === 新聞素材 1 ===
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
  // === 新聞素材 2 ===
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
  // === 新聞素材 3 ===
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
    hint: "臉書看到免費領取白沙屯媽祖手鍊廣告，私訊後收到假交易平台連結，對方以『實名制認節失敗、帳戶遭鎖定』為由，恐嚇被害人將實體金融卡寄出並提供密碼。",
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
      "沒錯，這確實是【假宮廟名義/騙取人頭帳戶詐騙】。不法分子利用信徒對神明的虔誠心理以結緣品為幌子，再透過假話術恐嚇騙取實體卡作洗錢帳戶。",
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
      "這其實是【LINE 派對模式側錄詐騙】！歹徒核心手法是利用通訊軟體內建螢幕分享功能側錄畫面，進而盜取金融個資。",
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
      "沒錯，這確實是【假贈獎/騙取無卡提款序號】的手法。在社群利用高價產品吸引好康群眾，並將 ATM「無卡提款」包裝成驗證流程藉此隔空取款。",
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
      "沒錯，這確實是【社群假帳號增粉/個資詐騙】。不法分子集體註冊山寨知名企業員工帳號，利用免費贈送物資噱頭快速獲取追蹤，實則長線收集個資。",
    link: "https://www.mirrormedia.mg/story/20260404edi008",
  },
  // === 新聞素材 11 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒公務機關或檢警詐騙】",
    hint: "高齡長者接獲自稱刑事局警官與地檢署檢察官來電，宣稱其涉嫌洗錢防制法重罪，其名下財產將被凍結。為配合『監管帳戶』以證明清白，長者依指示前往銀行將定存解約，並臨櫃匯款新臺幣數百萬元至對方指定的安全帳戶，事後與家人提及才知受騙。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒公務機關或檢警詐騙】的經典手法。不法分子利用民眾對司法的畏懼，以監管帳戶為由施壓。警檢絕不會在電話中辦案或監管財產。",
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
      "這其實是個資釣魚的手法！本案為利用假社群官方信件進行釣魚盜帳號，並非在報稅季假冒稅務機關公務員要求補繳稅款。",
    link: "https://www.mirrormedia.mg/story/20260515edi021",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【惡意釣魚連結詐騙】",
    hint: "民眾收到一封自稱是 Facebook 官方的電子郵件，警告帳號出現異常登入，並附帶一個『這不是我本人』的按鈕。當事人因慌張按下按鈕後，被引導至一個要求輸入臉書帳號與網銀密碼的網頁，完成後導致個人社群帳號當場被盜走。",
    isTrue: true,
    details:
      "沒錯，這確實是【惡意釣魚連結詐騙】。不法分子利用假系統警告製造恐慌，引導至假網頁輸入帳密與登入憑證來竊取個人社群帳號控制權。",
    link: "https://www.mirrormedia.mg/story/20260515edi021",
  },
  // === 新聞素材 13 ===
  {
    category: "網路社會與通訊軟體",
    title: "【理財假投資飆股詐騙】",
    hint: "保險公司通訊處前經理利用保戶與親友的信任，長達 20 年自行印製假契約，推銷宣稱年報酬率 5% 至 14% 的假保險與信託憑證商品，將吸金近五千萬元挪作個人周轉，最後因周轉失靈被檢方起訴並建請從重量刑。",
    isTrue: false,
    details:
      "這其實是【利用職務偽造保單非法吸金】的手法！嫌犯並非透過網路、簡訊引導加入飆股群組，而是利用實體主管職位與偽造公文書來向熟人坑殺。",
    link: "https://www.mirrormedia.mg/story/20260630edi045",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【利用職務偽造保單非法吸金】",
    hint: "保險公司通訊處前經理利用保戶與親友的信任，長達 20 年自行印製假契約，推銷宣稱年報酬率 5% 至 14% 的假保險與信託憑證商品，將吸金近五千萬元挪作個人周轉，最後因周轉失靈被檢方起訴並建請從重量刑。",
    isTrue: true,
    details:
      "沒錯，這確實是【利用職務偽造保單非法吸金】的手法。高階主管自製假契約與高回報率商品，直接進行長達20年的龐氏吸金騙局。",
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
      "沒錯，這確實是【利用宗教信仰心靈控制與斂財】。不法分子假借神職人員威權孤立個體，進而使其在特定精神控制與壓力下主動奉獻大筆財產。",
    link: "https://www.mirrormedia.mg/story/20260630-167inv-123147",
  },
  // === 新聞素材 15 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假贈獎騙取無卡提款序號】",
    hint: "民眾網購媽祖壓轎金，點擊假賣貨便網站卻跳出『需實名制認證』，隨後假賣家利用訊息瘋狂轟炸，甚至傳送『有家暴傾向的老公正在破門踹打』的偽造影片進行情緒勒索，使民眾心急之下聽從假客服指示，交出無卡提款序號（QR Code），導致存款立刻遭隔空提領 3 萬元。",
    isTrue: true,
    details:
      "沒錯，這確實是【假贈獎騙取無卡提款序號】的手法。歹徒同時扮演假賣家與假客服，配合假家暴影片施加心理壓力，隔空騙取無卡提款 QR Code 序號。",
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
      "沒錯，這確實是【人頭公司與支付平台跨境洗錢水房】。利用合法的第三方支付系統或新興支付平台，透過大量假人頭公司做假金流將不法髒錢代收洗白。",
    link: "https://www.mirrormedia.mg/story/20260629-169soc-160655",
  },
  // === 新聞素材 17 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假交友戀愛詐騙】",
    hint: "女網網紅在網路交往期間，拿兩條線驗孕棒並傳送從中國社群平台『小紅書』下載、帶有浮水印的胎兒超音波照片佯稱懷孕，拒絕男方陪同產檢，事後甚至自行修圖竄改法院裁定書來證明虛假身分，遭檢方依詐欺與偽造公文書罪起訴。",
    isTrue: true,
    details:
      "沒錯，這確實是【假交友戀愛詐騙】的手法！利用情感與信任編造網戀懷孕等藉口索取財物，並透過網路下載圖片與偽造公文書來使騙局逼真。",
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
      "沒錯，這確實是【假冒國稅局補繳稅款詐騙】的手法。不法分子假冒稅務公務員電話催繳施壓，記住政府機關絕對不會電話指示操作實體 ATM 或網銀功能。",
    link: "https://www.mirrormedia.mg/story/20260508edi041",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【理財假投資飆股詐騙】",
    hint: "報稅季期間，民眾接獲自稱國稅局公務員的電話，聲稱其稅款異常需要立刻補繳，並引導民眾前往 ATM 操作 or 開啟網路銀行進行匯款。內政部對此提醒，政府機關絕不會透過電話要求民眾操作 ATM，且秒辨真偽的最簡單方法就是檢查網址結尾是否為『.gov.tw』。",
    isTrue: false,
    details:
      "這其實是【假冒國稅局補繳稅款詐騙】的手法！此手法是假冒公權力機關進行強制性催繳恐嚇，與引導民眾加入 LINE 投資群組的假飆股完全不同。",
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
    hint: "北市婦人誤信認識一年的朋友介紹，稱只要投入 500 萬元本金投資某金融科技公司，就能『月領 15 萬』收益，保證年投報率高達 36%。婦人因此賣掉長期持有的 0050 ETF 欲臨櫃匯款，所幸被派出所所長 Sus 員及時攔阻，成功保住 500 萬積蓄。",
    isTrue: true,
    details:
      "沒錯，這確實是【實體熟人/假金融科技公司保證獲利投資詐騙】。利用定期超常高配息話術引導解約穩健的 0050 進行匯款，面對暴利應保持高度警覺。",
    link: "https://www.mirrormedia.mg/story/20260410edi013",
  },
  // === 新聞素材 20 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假冒官方中獎通知釣魚詐騙】",
    hint: "民眾收到偽裝成『悠遊卡官方會員中心』的電子郵件通知發票中獎，點擊信中連結進入與官網一模一樣的假網頁，並依指示輸入信用卡號、有效期限與背面驗證碼。隨後手機收到簡訊，民眾未注意是『刷卡驗證通知』便將驗證碼填入，導致信用卡當場遭盜刷 7 萬 7,270 元。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒官方中獎通知釣魚詐騙】的手法。利用高仿山寨中獎網頁竊取信用卡個資與 OTP 刷卡驗證簡訊以完成線上大量盜刷。",
    link: "https://www.mirrormedia.mg/story/20260305edi033",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假冒官方簡訊惡意下載 APP】",
    hint: "民眾收到偽裝成『悠遊卡官方會員中心』的電子郵件通知發票中獎，點擊信中連結進入與官網一模一樣的假網頁，並依指示輸入信用卡號、有效期限與背面驗證碼。隨後手機收到簡訊，民眾未注意是『刷卡驗證通知』便將驗證碼填入，導致信用卡當場遭盜刷 7 萬 7,270 元。",
    isTrue: false,
    details:
      "這其實是【假冒官方中獎通知釣魚詐騙】的手法！嫌犯是利用假網頁騙取信用卡號與轉帳 OTP 碼，並非發送簡訊騙取外流 APK 惡意檔案。",
    link: "https://www.mirrormedia.mg/story/20260305edi033",
  },

  // 🔥 === 41 到 80 題大合體完全注入（100% 精準對齊） ===
  // === 新聞素材 21：便宜代購機票 ===
  {
    category: "網路社會與通訊軟體",
    title: "【網路假代購機票釣魚詐騙】",
    hint: "民眾在 Threads 上看到宣稱能便宜代購機票的服務，原價 1 萬 6,000 元的機票只要 1 萬 0,888 元且時段任選不用加價。結果購票後在機場登機口遭地勤攔下，被告知該不知名訂票網站是盜用他人的信用卡來購票，因持卡人發現止付導致機票當場失效。",
    isTrue: true,
    details:
      "沒錯，這確實是【網路假代購機票釣魚詐騙】的手法！利用低於市價優惠誘客，實則利用盜刷信用卡的時間差來欺騙消費者。",
    link: "https://www.mirrormedia.mg/story/20260206edi048",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【海外虛擬貨幣交易所殺豬盤】",
    hint: "民眾在 Threads 上看到宣稱能便宜代購機票的服務，原價 1 萬 6,000 元的機票只要 1 萬 0,888 元且時段任選不用加價。結果購票後在機場登機口遭地勤攔下，被告知該不知名訂票網站是盜用他人的信用卡來購票，因持卡人發現止付導致機票當場失效。",
    isTrue: false,
    details:
      "這其實是【網路假代購機票釣魚詐騙】的手法！嫌犯是利用山寨網頁與盜刷信用卡陷阱詐款，並非引導至假平台投資虛擬貨幣。",
    link: "https://www.mirrormedia.mg/story/20260206edi048",
  },
  // === 新聞素材 22：發票中獎釣魚 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假冒官方中獎通知釣魚詐騙】",
    hint: "知名主持人收到假冒『電子發票整合服務平台』的中獎通知信，點擊信中連結並依指示輸入密碼、綁定信用卡。隨後在交易與驗證服務頁面中，將收到的 OTP 密碼輸入，導致短短 3 分鐘內信用卡被連續盜刷數筆瑞典克朗，損失數萬元。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒官方中獎通知釣魚詐騙】的手法！利用發票中獎喜悅導向假網頁，竊取信用卡資料與關鍵 OTP 驗證碼進行線上盜刷。",
    link: "https://www.mirrormedia.mg/story/20260130edi006",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【解除分期付款詐騙】",
    hint: "知名主持人收到假冒『電子發票整合服務平台』的中獎通知信，點擊信中連結並依指示輸入密碼、綁定信用卡。隨後在交易與驗證服務頁面中，將收到的 OTP 密碼輸入，導致短短 3 分鐘內信用卡被連續盜刷數筆瑞典克朗，損失數萬元。",
    isTrue: false,
    details:
      "這其實是【假冒官方中獎通知釣魚詐騙】的手法！本案核心是利用山寨財政部發票網頁騙取信用卡個資盜刷，並非引導前往 ATM 解除重複扣款設定。",
    link: "https://www.mirrormedia.mg/story/20260130edi006",
  },
  // === 新聞素材 23：假交友結合假投資 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假交友結合假投資保證獲利詐騙】",
    hint: "50餘歲中年男子在臉書結識自稱『財務長』的網友，對方謊稱須交付款項始可與女生見面，更誘導加入虛假的投資平台、聲稱付款後可全額取回。被害人不疑有他，在半個月內陸續面交 16 次、轉帳 2 次給配戴偽造投資公司工作證的專員車手，共計被騙走近 5,000 萬元，卻始終見不到女網友一面。",
    isTrue: true,
    details:
      "沒錯，這確實是【假交友結合假投資保證獲利詐騙】的手法！利用美色包裝高獲利投資平台，更指派穿西裝的假理專車手出面面交巨額現金。",
    link: "https://www.mirrormedia.mg/story/20260116inv002",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假求職騙取人頭帳戶詐騙】",
    hint: "50餘歲中年男子在臉書結識自稱『財務長』的網友，對方謊稱須交付款項始可與女生見面，更誘導加入虛假的投資平台、聲稱付款後可全額取回。被害人不疑有他，在半個月內陸續面交 16 次、轉帳 2 次給配戴偽造投資公司工作證的專員車手，共計被騙走近 5,000 萬元，卻始終見不到女網友一面。",
    isTrue: false,
    details:
      "這其實是【假交友結合假投資保證獲利詐騙】的手法！嫌犯是利用網戀基礎誘騙大額投資面交，並非發送高薪輕鬆兼職來誘騙求職者寄出實體金融卡。",
    link: "https://www.mirrormedia.mg/story/20260116inv002",
  },
  // === 新聞素材 24：退貨機制漏洞 ===
  {
    category: "網路社會與通訊軟體",
    title: "【利用電商平台退款機制漏洞詐騙】",
    hint: "17歲少年發現知名化妝品購物平台的退貨流程中，只要填入虛假的物流單號，系統就會在未確認賣家是否收到實品的情況下自動核准退款。少年以此機制瘋狂提交上萬筆退款申請，不僅白拿高額貨物，更透過二手平台轉售牟利，總計非法牟利上千萬元，遭法院依詐騙罪判處有期徒刑 6 年。",
    isTrue: true,
    details:
      "沒錯，這確實是【利用電商平台退款機制漏洞詐騙】的手法！少年惡意鑽電商自動退款機制的漏洞進行虛假退貨、買空賣空，這已構成嚴重的詐騙罪。",
    link: "https://www.mirrormedia.mg/story/20260114edi058",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【網購一頁式廣告與幽靈包裹詐騙】",
    hint: "17歲少年發現知名化妝品購物平台的退貨流程中，只要填入虛假的物流單號，系統就會在未確認賣家是否收到實品的情況下自動核准退款。少年以此機制瘋狂提交上萬筆退款申請，不僅白拿高額貨物，更透過二手平台轉售牟利，總計非法牟利上千萬元，遭法院依詐騙罪判處有期徒刑 6 年。",
    isTrue: false,
    details:
      "這其實是【利用電商平台退款機制漏洞詐騙】的手法！本案是利用買家端平台政策缺陷進行虛假退款，與強迫收取根本沒購買商品的「幽靈包裹」完全不同。",
    link: "https://www.mirrormedia.mg/story/20260114edi058",
  },
  // === 新聞素材 25：假冒名醫問診 ===
  {
    category: "網路社會與通訊軟體",
    title: "【AI 科技假冒名醫醫療廣告詐騙】",
    hint: "70歲老翁在臉書看到假冒名醫的醫療廣告，宣稱可改善糖尿病及四肢水腫。老翁點擊加入 LINE 後，詐團假冒醫師進行線上問診，並引導老翁分 4 次以貨到付款方式購買外包裝精美、卻無標示任何成分的不明特效藥，共支付 20 萬元。老翁服藥後水腫情形惡化住院，回撥包裹寄件電話無法接通，才驚覺受騙。",
    isTrue: true,
    details:
      "沒錯，這確實是【AI 科技假冒名醫醫療廣告詐騙】的手法！不法分子濫用 AI 科技偽造中醫師形象，配合假線上問診，高價兜售未標示成分的不明藥物。",
    link: "https://www.mirrormedia.mg/story/20260111edi021",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【解除分期付款詐騙】",
    hint: "70歲老翁在臉書看到假冒名醫的醫療廣告，宣稱可改善糖尿病及四肢水腫。老翁點擊加入 LINE 後，詐團假冒醫師進行線上問診，並引導老翁分 4 次以貨到付款方式購買外包裝精美、卻無標示 any 成分的不明特效藥，共支付 20 萬元。老翁服藥後水腫情形惡化住院，回撥包裹寄件電話無法接通，才驚覺受騙。",
    isTrue: false,
    details:
      "這其實是【AI 科技假冒名醫醫療廣告詐騙】的手法！本案是利用 AI 變臉偽造白袍專業銷售實體假藥，並非冒充電商客服謊稱扣款出錯要求前往 ATM 轉帳。",
    link: "https://www.mirrormedia.mg/story/20260111edi021",
  },
  // === 新聞素材 26：LinkedIn假獵才 ===
  {
    category: "網路社會與通訊軟體",
    title: "【LinkedIn 假獵才結合 VS Code 漏洞科技型求職詐騙】",
    hint: "工程師在 LinkedIn 收到海外面試邀約，對方提供一個 GitHub 專案宣稱要測試實力。工程師警覺並未執行該專案程式，但僅因使用 VS Code 編輯器開啟該專案資料夾，便不慎觸發編輯器特性（如按下信任作者選項），導致電腦遭埋藏的木馬程式遠端操控（RCE），幾天後私鑰外流，名下價值 60 萬元的加密貨幣慘遭洗劫。",
    isTrue: true,
    details:
      "沒錯，這確實是【LinkedIn 假獵才結合 VS Code 漏洞科技型求職詐騙】。高度進化的黑客手法，利用工程師對知名工具的信任，光是開啟並點信任資料夾就會中招。",
    link: "https://www.mirrormedia.mg/story/20260109edi021",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【網路假代購機票釣魚詐騙】",
    hint: "工程師在 LinkedIn 收到海外面試邀約，對方提供一個 GitHub 專案宣稱要測試實力。工程師警覺並未執行該專案程式，但僅因使用 VS Code 編輯器開啟該專案資料夾，便不慎觸發編輯器特性（如按下信任作者選項），導致電腦遭埋藏的木馬程式遠端操控（RCE），幾天後私鑰外流，名下價值 60 萬元的加密貨幣慘遭洗劫。",
    isTrue: false,
    details:
      "這其實是【LinkedIn 假獵才結合 VS Code 漏洞科技型求職詐騙】的手法！此為鎖定科技業的假求職黑客遠端控制（RCE）木馬攻擊，並非低價機票代購釣魚。",
    link: "https://www.mirrormedia.mg/story/20260109edi021",
  },
  // === 新聞素材 27：假天災募款 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假天災募款名義與假官方管道詐騙】",
    hint: "在花蓮天災發生後，網路上出現模仿衛福部或官方『賑災基金會』的募款貼文，利用民眾的愛心誘導點擊不明網址、提供個人帳戶資料。事後還有假客服宣稱要『核對賑災款項』，進一步指示民眾操作網路銀行，導致善心民眾的存款當場被洗劫一空。",
    isTrue: true,
    details:
      "沒錯，這確實是【假天災募款名義與假官方管道詐騙】的手法！不法分子緊扣災難時事，假冒官方救災機構在網路募集愛心善款，實則誘導民眾進行網銀轉帳。",
    link: "https://www.mirrormedia.mg/story/20250927soc001",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【利用職務偽造保單非法吸金】",
    hint: "在花蓮天災發生後，網路上出現模仿衛福部或官方『賑災基金會』的募款貼文，利用民眾的愛心誘導點擊不明網址、提供個人帳戶資料。事後還有假客服宣稱要『核對賑災款項』，進一步指示民眾操作網路銀行，導致善心民眾的存款當場被洗劫一空。",
    isTrue: false,
    details:
      "這其實是【假天災募款名義與假官方管道詐騙】的手法！本案是利用大眾同情心進行網路假冒賑災基金會詐財，並非保險公司內部主管私印假契約吸金。",
    link: "https://www.mirrormedia.mg/story/20250927soc001",
  },
  // === 新聞素材 28：潮州分局反向心理戰 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒公務機關與檢警監管帳戶詐騙】",
    hint: "獨居高齡老翁接獲假冒屏東縣警局電話，誆稱其帳戶有不法資金進出。歹徒為博取信任，先反向宣導『用電話做筆錄是詐騙、必須親自來警局』，隨後利用老翁行動不便的弱點，佯稱『法外開恩為你破例在電話做筆錄』。老翁深信不疑，聽從假檢警指示，不僅轉帳 3,700 萬餘元存款，更將名下透天厝進行質押貸款千萬交由對方監管。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒公務機關與檢警監管帳戶詐騙】的手法！狡猾歹徒先假裝進行反詐宣導以騙取高度信任，再以監管帳戶重罪威脅解約定存並將豪宅質押貸款。",
    link: "https://www.mirrormedia.mg/story/20250928soc006",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【LINE 派對模式側錄詐騙】",
    hint: "獨居高齡老翁接獲假冒屏東縣警局電話，誆稱其帳戶有不法資金進出。歹徒為博取信任，先反向宣導『用電話做筆錄是詐騙、必須親自來警局』，隨後利用老翁行動不便的弱點，佯稱『法外開恩為你破例在電話做筆錄』。老翁深信不疑，聽從假檢警指示，不僅轉帳 3,700 萬餘元存款，更將名下透天厝進行質押貸款千萬交由對方監管。",
    isTrue: false,
    details:
      "這其實是【假冒公務機關與檢警監管帳戶詐騙】的手法！此為司法檢警假身分威權恐嚇，並非網購客服利用 LINE 內建螢幕分享（派對模式）來側錄網銀。",
    link: "https://www.mirrormedia.mg/story/20250928soc006",
  },
  // === 新聞素材 29：假冒監理服務網 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒監理服務網規費與罰單釣魚詐騙】",
    hint: "民眾收到冒名『監理服務網』的電子郵件，誆稱名下有交通違規罰單未結清，要求『24小時內繳清』否則將扣駕照並累計滯納金。信中附帶高仿的假網站連結，且無論輸入任何亂碼身分證號都會顯示相同的罰金金額，點擊繳費後會誘導輸入信用卡號與安全碼進行海外外幣扣款。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒監理服務網規費與罰單釣魚詐騙】的手法！用逾期、罰款、扣駕照等恐嚇字眼誘導至山寨網頁，騙取完整的信用卡資訊進行線上盜刷。",
    link: "https://www.mirrormedia.mg/story/20250918edi038",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【網購設定錯誤/解除分期詐騙】",
    hint: "民眾收到冒名『監理服務網』的電子郵件，誆稱名下有交通違規罰單未結清，要求『24小時內繳清』否則將扣駕照並累計滯納金。信中附帶高仿的假網站連結，且無論輸入任何亂碼身分證號都會顯示相同的罰金金額，點擊繳費後會誘導輸入信用卡號與安全碼進行海外外幣扣款。",
    isTrue: false,
    details:
      "這其實是【假冒監理服務網規費與罰單釣魚詐騙】的手法！核心是架設山寨監理網站進行信用卡海外扣款盜刷，並非客服佯稱後台訂單誤設成重複扣款。",
    link: "https://www.mirrormedia.mg/story/20250918edi038",
  },
  // === 新聞素材 30：到府交付金融卡 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒機構與檢警誘騙交付金融卡監管詐騙】",
    hint: "居家長輩接獲假保險員與假警察來電，誆稱其涉嫌詐領保險金與洗錢。歹徒以偵查不公開為由，要求長輩加 LINE 每天定時回報行蹤，並以『住家路途遙遠、免奔波臨櫃領現』為由，誘騙長輩線上解除 300 萬元定期存款，隨後指派假書記官至長輩家中當面收走 2 張實體金融卡與密碼以進行『資產監管』，導致長輩帳戶內存款被全數清空。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒機構與檢警誘騙交付金融卡監管詐騙】的手法！歹徒誆稱免去臨櫃領現奔波，誘騙長輩解除定存後直接派人到府收走實體提款卡與密碼。",
    link: "https://www.mirrormedia.mg/story/20250809soc001",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【虛假求職與兼職刷單詐騙】",
    hint: "居家長輩接獲假保險員與假警察來電，誆稱其涉嫌詐領保險金與洗錢。歹徒以偵查不公開為由，要求長輩加 LINE 每天定時回報行蹤，並以『住家路途遙遠、免奔波臨櫃領現』為由，誘騙長輩線上解除 300 萬元定期存款，隨後指派假書記官至長輩家中當面收走 2 張實體金融卡與密碼以進行『資產監管』，導致長輩帳戶內存款被全數清空。",
    isTrue: false,
    details:
      "這其實是【假冒機構與檢警誘騙交付金融卡監管詐騙】的手法！本案核心是利用司法恐嚇面交實體金融卡並洗劫定存，並非假兼職刷單、按讚預先墊資儲值。",
    link: "https://www.mirrormedia.mg/story/20250809soc001",
  },
  // === 新聞素材 31：假冒 LINE Pay ===
  {
    category: "網路社會與通訊軟體",
    title: "【假冒 LINE Pay 官方重複扣款釣魚郵件詐騙】",
    hint: "民眾收到冒充 LINE Pay 官方的電子郵件，宣稱其帳戶疑似重複扣款或付款方式異常，若未在 24 小時內點擊郵件連結完成驗證將遭封鎖。民眾不疑有他，點擊進入極度仿真的山寨驗證網頁，並依指示輸入 LINE ID、手機號碼、信用卡卡號以及手機收到的 OTP 簡訊密碼，導致名下銀行帳戶與信用卡隨即遭詐團綁定並大額盜刷。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒 LINE Pay 官方重複扣款釣魚郵件詐騙】的手法！利用仿冒形象散發封鎖警告，誘導至山寨驗證網頁，騙取完整卡號與極關鍵的 OTP 動態碼。",
    link: "https://www.mirrormedia.mg/story/20250606edi049",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【猜猜我是誰假冒親友借錢詐騙】",
    hint: "民眾收到冒充 LINE Pay 官方的電子郵件，宣稱其帳戶疑似重複扣款或付款方式異常，若未在 24 小時內點擊郵件連結完成驗證將遭封鎖。民眾不疑有他，點擊進入極度仿真的山寨驗證網頁，並依指示輸入 LINE ID、手機號碼、信用卡卡號以及手機收到的 OTP 簡訊密碼，導致名下銀行帳戶與信用卡隨即遭詐團綁定並大額盜刷。",
    isTrue: false,
    details:
      "這其實是【假冒 LINE Pay 官方重複扣款釣魚郵件詐騙】的手法！本案核心是高仿支付網頁個資釣魚，並非隨機打電話冒充親戚好友更換號碼借錢調頭寸。",
    link: "https://www.mirrormedia.mg/story/20250606edi049",
  },
  // === 新聞素材 32：當沖教授假新股 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假當沖明牌與虛假新股申購投資詐騙】",
    hint: "長輩加入通訊群組聽信『當沖教授』報明牌，並下載對方提供的專屬特製投資 App，期間曾順利出金 6 萬元。隨後，詐團以『不小心申購到 50 張新股，需限期補足數百萬交割款否則違約』為由，逼得長輩四處向親友借款。直到報警後才驚覺 App 內的資產全是虛假數字，且因中途領取的 6 萬元實為詐騙贓款，導致名下所有銀行帳戶皆面臨遭警示凍結的危機。",
    isTrue: true,
    details:
      "沒錯，這確實是【假當沖明牌與虛假新股申購投資詐騙】的手法！前期故意給予小額獲利甜頭，隨後編造新股中籤未繳款會違約的謊言逼迫被害人面交或大額轉帳。",
    link: "https://www.mirrormedia.mg/story/20250605edi072",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【網路中獎與代繳稅金點數詐騙】",
    hint: "長輩加入通訊群組聽信『當沖教授』報明牌，並下載對方提供的專屬特製投資 App，期間曾順利出金 6 萬元。隨後，詐團以『不小心申購到 50 張新股，需限期補足數百萬交割款否則違約』為由，逼得長輩四處向親友借款。直到報警後才驚覺 App 內的資產全是虛假數字，且因中途領取的 6 萬元實為詐騙贓款，導致名下所有銀行帳戶皆面臨遭警示凍結的危機。",
    isTrue: false,
    details:
      "這其實是【假當沖明牌與虛假新股申購投資詐騙】的手法！核心是利用看盤軟體封閉群組坑殺，並非假冒抽中頭獎要求去超商買遊戲點數拍照回傳當稅金。",
    link: "https://www.mirrormedia.mg/story/20250605edi072",
  },
  // === 新聞素材 33：Gmail 漏洞與 OAuth ===
  {
    category: "網路社會與通訊軟體",
    title: "【假冒 Google 官方帳戶調查與 OAuth 授權釣魚詐騙】",
    hint: "用戶收到一封偽裝成 Google 官方網域發出的電子郵件，誆稱其個人帳戶正遭執法機構調查。信中以恐嚇字眼要求用戶限期公開帳戶內容並點擊連結驗證，隨後將用戶導向與官方極度相似的假登入畫面，藉體竊取帳號密碼並誘騙用戶按下第三方應用程式的 OAuth 授權，導致信箱、聯絡人與雲端硬碟的所有權限遭到全面入侵。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒 Google 官方帳戶調查與 OAuth 授權釣魚詐騙】的手法！利用技術漏洞偽造官方寄件者網域，並針對第三方 OAuth 連動授權實施全面權限洗劫。",
    link: "https://www.mirrormedia.mg/story/20250523edi010",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假網路求職與提供網路銀行人頭帳戶詐騙】",
    hint: "用戶收到一封偽裝成 Google 官方網域發出的電子郵件，誆稱其個人帳戶正遭執法機構調查。信中以恐嚇字眼要求用戶限期公開帳戶內容並點擊連結驗證，隨後將用戶導向與官方極度相似的假登入畫面，藉此竊取帳號密碼並誘騙用戶按下第三方應用程式的 OAuth 授權，導致信箱、聯絡人與雲端硬碟的所有權限遭到全面入侵。",
    isTrue: false,
    details:
      "這其實是【假冒 Google 官方帳戶調查與 OAuth 授權釣魚詐騙】的手法！本案核心是利用高仿驗證網頁騙取數位雲端最高主控權，並非在社群招募兼職以獲取實體存摺提款卡。",
    link: "https://www.mirrormedia.mg/story/20250523edi010",
  },
  // === 新聞素材 34：Google 文件跳轉 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒監理站利用 Google 文件跳轉規費釣魚詐騙】",
    hint: "民眾收到催繳交通罰單的簡訊，點擊連結後發現是合法的 Google 文件頁面，降低戒心。依頁面指示掃描當中的 QR Code 後，被導向以假亂真的山寨監理站繳費網站，要求輸入信用卡卡號與個資以繳納 3,000 元罰款。此手法利用多個合法與非法網站間的轉接跳轉，企圖混淆民眾並規避科技偵查。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒監理站利用 Google 文件跳轉規費釣魚詐騙】的手法！將假的繳費 QR Code 埋入合法的 Google 文件頁面降低防備心，再進行信用卡個資盜刷。",
    link: "https://www.mirrormedia.mg/story/20250420soc007",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【網路交友假冒軍官戰地受困詐騙】",
    hint: "民眾收到催繳交通罰單的簡訊，點擊連結後發現是合法的 Google 文件頁面，降低戒心。依頁面指示掃描當中的 QR Code 後，被導向以假亂真 的山寨監理站繳費網站，要求輸入信用卡卡號與個資以繳納 3,000 元罰款。此手法利用多個合法與非法網站間的轉接跳轉，企圖混淆民眾並規避科技偵查。",
    isTrue: false,
    details:
      "這其實是【假冒監理站利用 Google 文件跳轉規費釣魚詐騙】的手法！本案核心是利用雲端平台做多層跳轉竊取信用卡，並非假冒駐外軍官宣稱受困要求匯款援助買機票。",
    link: "https://www.mirrormedia.mg/story/20250420soc007",
  },
  // === 新聞素材 35：DHL包裹補稅 ===
  {
    category: "電信與簡訊詐騙",
    title: "【假冒國際快遞海外包裹補稅釣魚詐騙】",
    hint: "民眾收到冒充知名物流公司（如 DHL）的英文電子郵件，宣稱其名下有海外快遞包裹，因未繳納 7 美元的微額稅金而無法配送，若不點擊信中連結刷卡補繳，包裹將被退回。民眾在慌亂中點擊進入山寨繳費網頁並輸入信用卡卡號，隨後手機便收到高額的海外盜刷驗證簡訊。",
    isTrue: true,
    details:
      "沒錯，這確實是【假冒國際快遞海外包裹補稅釣魚詐騙】的手法！利用 7 美元微小金額降低戒心，一旦點擊信中連結輸入信用卡，後台便開始海外高額跨國盜刷。",
    link: "https://www.mirrormedia.mg/story/20250322soc004",
  },
  {
    category: "電信與簡訊詐騙",
    title: "【假冒自來水公司與催繳水費詐騙】",
    hint: "民眾收到冒充知名物流公司（如 DHL）的英文電子郵件，宣稱其名下有海外快遞包裹，因未繳納 7 美元的微額稅金而無法配送，若不點擊信中連結刷卡補繳，包裹將被退回。民眾在慌亂中點擊進入山寨繳費網頁並輸入信用卡卡號，隨後手機便收到高額的海外盜刷驗證簡訊。",
    isTrue: false,
    details:
      "這其實是【假冒國際快遞海外包裹補稅釣魚詐騙】的手法！核心是利用國際快遞英文信進行卡號釣魚，並非冒充自來水公司發送欠費斷水催繳簡訊。",
    link: "https://www.mirrormedia.mg/story/20250322soc004",
  },
  // === 新聞素材 36：實體男公關戀愛日誌 ===
  {
    category: "網路社會與通訊軟體",
    title: "【境外機房與在地男公關複合式戀愛交友詐騙】",
    hint: "單身熟女在網路認識貼心暖男，隨後對方指派台灣在地的實體『戀愛男公關』現身約會並發生親密關係。此時境外機房配合男公關回報的約會日誌，持續在線上營造命定情人的假象，等受害者深陷情網後，再以公司急需資金周轉為由，誘騙受害者提領大筆現金，並由假冒公司同僚的車手出面面交，洗劫受害者千萬積蓄。",
    isTrue: true,
    details:
      "沒錯，這確實是【境外機房與在地男公關複合式戀愛交友詐騙】的手法！打破單純線上聊天，由實體男公關出馬約會，再配合約會日誌由機房在線上同步情感操控大額面交。",
    link: "https://www.mirrormedia.mg/story/20250107edi066",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假冒臉書官方粉專中獎廣告詐騙】",
    hint: "單身熟女在網路認識貼心暖男，隨後對方指派台灣在地的實體『戀愛男公關』現身約會並發生親密關係。此時境外機房配合男公關回報的約會日誌，持續在線上營造命定情人的假象，等受害者深陷情網後，再以公司急需資金周轉為由，誘騙受害者提領大筆現金，並由假冒公司同僚的車手出面面交，洗劫受害者千萬積蓄。",
    isTrue: false,
    details:
      "這其實是【境外機房與在地男公關複合式戀愛交友詐騙】的手法！核心是美男計情感操控面交，並非在臉書投放中獎、填問卷送好禮的山寨粉專釣魚廣告。",
    link: "https://www.mirrormedia.mg/story/20250107edi066",
  },
  // === 新聞素材 37：分享螢幕網銀洗劫 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假買家誘騙分享螢幕之金流驗證詐騙】",
    hint: "民眾在網路平台拍賣商品，遭遇假買家私訊誆稱無法下單，並提供虛假連結要求賣家聯繫 LINE 客服。隨後假客服以『開通金流服務實名制』或『託運認證』為由，引導賣家在通訊軟體中開啟『分享螢幕』功能並操作網銀 App。歹徒藉此在後台即時側錄賣家的帳戶密碼與手機簡訊 OTP 驗證碼，即使賣家驚覺有異不願點選最後的確認匯款，存款仍會遭對方直接盜領。",
    isTrue: true,
    details:
      "沒錯，這確實是【假買家誘騙分享螢幕之金流驗證詐騙】的手法！假藉實名制或金流開通話術，誘騙開啟分享螢幕功能，直接即時側錄網銀帳密與彈出的驗證碼。",
    link: "https://www.mirrormedia.mg/story/20250105soc008",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【網路假博弈網站代操與儲值詐騙】",
    hint: "民眾在網路平台拍賣商品，遭遇假買家私訊誆稱無法下單，並提供虛假連結要求賣家聯繫 LINE 客服。隨後假客服以『開通金流服務實名制』或『託運認證』為由，引導賣家在通訊軟體中開啟『分享螢幕』功能並操作網銀 App。歹徒藉此在後台即時側錄賣家的帳戶密碼與手機簡訊 OTP 驗證碼，即使賣家驚覺有異不願點選最後的確認匯款，存款仍會遭對方直接盜領。",
    isTrue: false,
    details:
      "這其實是【假買家誘騙分享螢幕之金流驗證詐騙】的手法！利用賣家成交心切，用螢幕分享特性竊取動態驗證碼，並非線上博弈代操宣稱穩賺不賠要求儲值。",
    link: "https://www.mirrormedia.mg/story/20250105soc008",
  },
  // === 新聞素材 38：豪乳按摩點數老哏 ===
  {
    category: "網路社會與通訊軟體",
    title: "【假援交與購買遊戲點數保證金詐騙】",
    hint: "民眾透過 LINE 結識自稱經營個人按摩工作室的援交正妹，對方以露骨性服務話術誘使民眾前往超商見面。然而到了約定地點後正妹並未現身，反而傳訊宣稱因擔心警方查緝，要求民眾先購買 3 萬元的遊戲點數拍照傳過去當作『見面保證金』，聲稱驗證身分後即可見面消費並退款。",
    isTrue: true,
    details:
      "沒錯，這確實是【假援交與購買遊戲點數保證金詐騙】的手法！用清涼照片勾引，約見面後以躲避警察為由，恐嚇逼迫購買實體遊戲點數拍照回傳序號。",
    link: "https://www.mirrormedia.mg/story/20241231soc001",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【虛假網拍商品未到貨退款詐騙】",
    hint: "民眾透過 LINE 結識自稱經營個人按摩工作室的援交正妹，對方以露骨性服務話術誘使民眾前往超商見面。然而到了約定地點後正妹並未現身，反而傳訊宣稱因擔心警方查緝，要求民眾先購買 3 萬元的遊戲點數拍照傳過去當作『見面保證金』，聲稱驗證身分後即可見面消費並退款。",
    isTrue: false,
    details:
      "這其實是【假援交與購買遊戲點數保證金詐騙】的手法！利用色心誘導至超商買高額點數進行資產逃避，並非客服致電宣稱網購包裹遺失要辦理退款。",
    link: "https://www.mirrormedia.mg/story/20241231soc001",
  },
  // === 新聞素材 39：巷弄碰瓷拆手錶 ===
  {
    category: "日常生活與實體詐騙",
    title: "【街頭蓄意碰撞之假車禍手錶碰瓷索賠詐騙】",
    hint: "民眾駕車或騎車行經狹窄巷弄時，遭遇路人惡意靠近並發生輕微擦撞。路人隨即將事先拆解好的手錶及零件丟棄在地上，佯稱貴重物品遭撞毀，並以趕時間為由，強硬催促民眾當場交付 2 萬 5,000 元現金和解。此為歹徒蓄意製造假車禍，企圖利用民眾息事寧人的心理進行勒索。",
    isTrue: true,
    details:
      "沒錯，這確實是【街頭蓄意碰撞之假車禍手錶碰瓷索賠詐騙】的手法！用事先拆解好的故障貴重手錶設局，利用趕時間、施加高壓精神勒索強索現金。",
    link: "https://www.mirrormedia.mg/story/20241022web001",
  },
  {
    category: "日常生活與實體詐騙",
    title: "【假冒慈善機構募款與愛心義賣詐騙】",
    hint: "民眾駕車或騎車行經狹窄巷弄時，遭遇路人惡意靠近並發生輕微擦撞。路人隨即將事先拆解好的手錶及零件丟棄在地上，佯稱貴重物品遭撞毀，並以趕時間為由，強硬催促民眾當場交付 2 萬 5,000 元現金和解。此為歹徒蓄意製造假車禍，企圖利用民眾息事寧人的心理進行勒索。",
    isTrue: false,
    details:
      "這其實是【街頭蓄意碰撞之假車禍手錶碰瓷索賠詐騙】的手法！本案是實體巷弄碰瓷強索現金和解，並非在車站或街頭強行推銷高價愛心筆義賣募款。",
    link: "https://www.mirrormedia.mg/story/20241022web001",
  },
  // === 新聞素材 40：中秋實體月餅禮盒 ===
  {
    category: "網路社會與通訊軟體",
    title: "【利用節慶寄送實體免費禮盒之假投資詐騙】",
    hint: "民眾加入網路通訊軟體的投資群組，群組助理宣稱因中秋節將至，要免費寄送知名餅乾禮盒慰勞學員。民眾留下個資與住址後確實收到實體精美禮盒，因而對該投資團隊產生高度信任，隨後便在群組的誘導下，逐步點擊不明連結下載假投資 App 並匯入大筆資金，落入放長線釣大魚的詐騙陷阱。",
    isTrue: true,
    details:
      "沒錯，這確實是【利用節慶寄送實體免費禮盒之假投資詐騙】的手法！詐團下血本寄送真實精緻中秋禮盒，利用互惠心理降低防備心，再引導至假 App 洗劫資金。",
    link: "https://www.mirrormedia.mg/story/20240915soc014",
  },
  {
    category: "網路社會與通訊軟體",
    title: "【假冒幽靈包裹與貨到付款擦邊球詐騙】",
    hint: "民眾加入網路通訊軟體的投資群組，群組助理宣稱因中秋節將至，要免費寄送知名餅乾禮盒慰勞學員。民眾留下個資與住址後確實收到實體精美禮盒，因而對該投資團隊產生高度信任，隨後便在群組的誘導下，逐步點擊不明連結下載假投資 App 並匯入大筆資金，落入放長線釣大魚的詐騙陷阱。",
    isTrue: false,
    details:
      "這其實是【利用節慶寄送實體免費禮盒之假投資詐騙】的手法！核心是真實禮品包裝假金融長線釣魚投資，並非寄送未訂購劣質產品並收取貨到付款的幽靈包裹。",
    link: "https://www.mirrormedia.mg/story/20240915soc014",
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
    // 每次隨機從 80 題大庫中完全洗牌抽出 10 題進行挑戰，大幅度提升隨機性與遊戲重複遊玩度
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
        {/* 🌟 題庫總量動態標籤優化區塊 */}
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={styles.progressText}>
            進度：{isQuizFinished ? 10 : currentIndex + 1} / {deck.length}
          </Text>
          <View
            style={{
              backgroundColor: "#e0f2fe",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 8,
              marginTop: 4,
              borderWidth: 1,
              borderColor: "#bae6fd",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: "#0369a1",
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              🎲 本次挑戰由海量題庫（目前已收錄 {RAW_QUIZ_POOL.length}{" "}
              題）隨機抽出 10 題測試
            </Text>
          </View>
        </View>

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
  // 🌟 1. 這裡必須改成白底，最上方狀態列的灰邊才會消失！
  safe: { flex: 1, backgroundColor: "#ffffff" },

  // 🌟 2. 統一 Header 樣式（高度統一為 56）
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },

  // 🌟 3. 完美絕對置中關鍵：左右兩側寬度統一設定為 60
  backButton: { paddingVertical: 8, width: 60, justifyContent: "center" },
  placeholder: { width: 60 },

  // 🌟 4. 統一字體大小
  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },

  // 🌟 5. 把原本 safe 的灰底移到 container 這裡，確保下方卡片區還是灰底
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },

  // --- 以下為你原本寫好的 ScamMethods 專屬樣式，完全維持不動 ---
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
