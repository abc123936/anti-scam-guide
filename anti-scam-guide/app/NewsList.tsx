import { useRouter } from "expo-router";
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

// 🌟 匯出 50 筆最新新聞資料庫，包含完整內文與防詐解析
export const ALL_NEWS_DATA = [
  {
    id: "1",
    type: "鏡週刊",
    title: "綠營大老無家歸2／女友投資遭詐騙財務缺口大 以債養債全打張俊宏名號",
    date: "2026-07-12",
    summary:
      "【事件經過】\n綠營大老張俊宏的女友因誤信高報酬投資管道遭受巨額詐騙，導致龐大財務缺口。為了填補資金漏洞，涉嫌以張俊宏的名號在外以債養債，最終導致資產遭查封拍賣，相關名義遭濫用。\n\n【防詐重點解析】\n1. 勿信「保證獲利」：詐騙集團常以名人加持或高額報酬誘騙投資人投入資金。\n2. 借貸風險提示：以債養債只會讓資金缺口迅速擴大，發現遭詐應第一時間報警，而非繼續尋求地下借貸。\n3. 名人名義查證：接獲宣稱名人或政要授權的投資邀請，務必透過官方管道進行二次驗證。",
    link: "https://news.google.com/rss/articles/CBMiW0FVX3lxTE9Vi2ptWnF4bjMyczFJaXJsdnBNQXpRWFZNd0EwTFB0Q0NZTFBXWnNlWGxoT3o5QVFscFZTZVFtcWwzdG9qMHdUZXJ1VjBBaGdDanU3T3kya1nSAWBBVV95cUxPLWdERmk3NHhPaTVBVF9JSU11eFlMcWkyMm42MDlndTBDWWZOMWVmQlZoQVdXV1JRM29aaFJYUzhBSUJoSjJzUlNaQjNYTGlIOW83cTlZb1RBbVJkaU1nZ1k?oc=5",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
  },
  {
    id: "2",
    type: "LINE TODAY",
    title: "討論牆 | 台灣29歲女「日本詐騙落網」 長相、姓名全曝光！假冒名人AI投資吸金千萬",
    date: "2026-07-14",
    summary:
      "【案件摘要】\n日本警方破獲一起跨境詐騙案，一名 29 歲台灣籍女性涉嫌擔任車手與機房成員被捕。該集團利用 AI 深偽（Deepfake）技術假冒知名投資名人，以假投資廣告吸引民眾上鉤，吸金達千萬元日幣。\n\n【防詐關鍵提示】\n1. AI 影片防偽：切勿單憑影音內容即認定為名人本人，詐團已能精準複製聲音與面貌。\n2. 車手法律責任：赴海外從事違法車手行為將面臨當地嚴厲刑事追訴，切勿輕信「高薪輕鬆出國工作」陷阱。",
    link: "https://news.google.com/rss/articles/CBMiZEFVX3lxTFBBbWYxaTRuRzJDTXlGMGpDYmpOYUNGVGd0YVM0akFjZE9Pald6dHo5a0Z1dUdsb2N3MUltUlJhM1NDZmRzZTNOMTQzWUhWZmY9ZGxicDF5Mk1PTlNHWFFOQ3E5WHA?oc=5",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400",
  },
  {
    id: "3",
    type: "Yahoo新聞",
    title: "台灣29歲女「日本詐騙落網」 長相、姓名全曝光！假冒名人AI投資吸金千萬",
    date: "2026-07-14",
    summary:
      "【詳細報導】\n日本警方針對跨境詐騙進行專案掃蕩，逮捕多名涉案台籍成員。詐騙集團利用社群軟體投放假投資訊息，並以 AI 模擬財經名人聲音進行語音詐騙，取信高齡受害對象並派員前往面交取材。\n\n【應對策略】\n凡要求面交現金、購買黃金或轉帳至個人帳戶之投資操作，均為 100% 詐騙。若懷疑身邊親友受騙，請撥打 165 反詐騙專線。",
    link: "https://news.google.com/rss/articles/CBMiogNBVV95cUxQS2RuYWJCLU5ETXRLeGNNYkNrMXNsVlRpYlNadmsyaEo1YUNkbjhZQTNSQXZCVlVGdGp1UnRkZ3RpZkg2U0ZHQzdETDZoWktRWERLNVNZbWI4RnpScHNJYWhBTUtNX3l6M2VtTk9UdzdiREotSlJTYjdHeVVXbWtJMjVOYlZ3cnhUOHAyMFk0aUQ3eWFfeEF2c0syRkxWc3huRjZOZ1BTU2Q0RTJrbkhLS1VUZjE5LUVaTVc4T01URHpKYndFQ3dhcTM2enJvM1E1RG1KNWpmeGh5Rk9tM2djSzJ1amFobU45dnk4MHJMZEJDbm9jRFpaWmhmb3FnbDRzNlBZYUxaTi1uLXRPXzFRT2xRQmQ5WWZkLXBLaHZ1RWVLUmR1R0ZIcnVNcFg5WEQxeG1mZnFrdU1hM2pzcnphSlhmX3dXX2lLLWVGc2g5V3RUZkcwMGcxRE1zTmcydjk2aHg0SGlYcnVjOFhoanJuUHhIb3RJVzFaN201Z3JRMndYNERSUENPSDVwZ3A5bGJRVkpIaEdHTkhLdDFwVVNFY0H?oc=5",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
  },
  {
    id: "4",
    type: "央廣",
    title: "好騙的、騙過的繼續騙！AI加持，詐騙進化得更厲害！",
    date: "2026-07-13",
    summary: "【專家觀點】\n隨著生成式 AI 快速發展，詐騙技術大幅升級。詐團不僅能精準分析受害者心理弱點，更能自動化產生客製化詐騙簡訊與語音通話，甚至鎖定曾受害的目標進行二次詐騙（如二次追資解凍）。\n\n【防範機制】\n警惕「追回詐款」、「律師代辦維權」等二次詐騙手法。已被騙一次後，切勿再相信任何宣稱能私下幫忙追回款項的組織。",
    link: "https://news.google.com/rss/articles/CBMiYEFVX3lxTFA3TWwyQ1RjdF_Fa1BhVnY1X1ZNOGdoZWUwZ280NnVWZGVvQ1dLaFpVdDlySzB4SVlHSFNVTFloQVdreW1aaUEybXFZNksyeE9VX3AwMzJXbkw2bkdES3lTdQ?oc=5",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
  {
    id: "5",
    type: "自由時報",
    title: "澎湖小管干市價一斤千元以上 警方籲提防網路低價詐騙",
    date: "2026-07-14",
    summary: "【警政宣導】\n澎湖特產小管干市價高昂，近來有不法業者在臉書或一頁式廣告以「低於市價半價」為招徠進行詐騙。民眾下單匯款後，常收到劣質替代品或直接賣家神隱。\n\n【辨識特徵】\n1. 一頁式廣告：無公司地址、電話，僅有 LINE 聯絡方式。\n2. 價格遠低於市場行情：天下沒有白吃的午餐，過度便宜必有詐。",
    link: "https://news.google.com/rss/articles/CBMiZEFVX3lxTE1GQzFxSWF5YTNKc1ZCVmpkQW0xWTR0UFRqNlFiZnQzbU0zMjNCU3pIYmUxS0J3ZmcydFhEXzJRUDFHZDRkQTNrMmRQdUpVWldzT2FlcjNEUnhaNk54b29GY094V0zSAWpBVV95cUxOOTlncFFOYkxkdTAxVnRLNk9oWmtsREdhNFpYM1ZDd21sOVhjdDQtZFBBc3lreTZCU3BNT3RMdG0zYmVEY001X3didFNySXZYb2U4X25nanBCcG1nRThIb0pzQXlqVmg4WlN3?oc=5",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400",
  },
  {
    id: "6",
    type: "中央社",
    title: "成功攔阻近640萬！竹市地政神隊友「多問幾句」 戳破詐騙",
    date: "2026-07-13",
    summary: "【阻詐成功案例】\n新竹市地政事務所人員在辦理抵押權設定手續時，敏銳發現長者對於借款用途交代不清，經機警「多問幾句」並會同警政單位，成功阻止民眾將名下房產抵押變現投給假投資集團，攔阻金額高達 640 萬元。\n\n【關鍵防護】\n金融機構與地政機關的關懷提問是最後一道防線，民眾如遇到臨櫃或地政過戶要求，請配合人員詢問，防範資產被掏空。",
    link: "https://news.google.com/rss/articles/CBMiVkFVX3lxTFBWQTB1d1hLS1pmRHhyakhReW90bHhfVzBobFNrd0ZwMlowMW9adk5QUUZVWk9qRUhZVGNMVkQ4MzgxMXpsNTBSRGFxQm44Y0VYM1VvcFpR?oc=5",
    img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400",
  },
  {
    id: "7",
    type: "TVBS",
    title: "別再罵他笨！醫：詐騙操控的是「這個」而非智商 用減法指責拉受害者一把",
    date: "2026-07-13",
    summary: "【心理學剖析】\n精神科醫師指出，詐騙集團利用的是人類的心理弱點（孤獨、恐懼、貪婪、急迫感），而非智商高低。許多高學歷專業人士同樣會落入陷阱。\n\n【陪伴觀點】\n家屬若以強烈指責方式對待受害者，容易促使受害者產生防衛心理，反而更依賴詐騙集團（如假交友對象）。建議以同理心傾聽，引導其主動向警方求助。",
    link: "https://news.google.com/rss/articles/CBMiT0FVX3lxTFBVbDJJTnRHb08xWlh2eFh1QVg3UHZwMnBzSWNRMjFhNmI3aUg3b1I4TEQ1Z25jdTRDM1daSGloUDZGeC13c3lsUzdNSWJCMHc?oc=5",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400",
  },
  {
    id: "8",
    type: "遠見雜誌",
    title: "2026重陽敬老金》誰能領、領多少、防詐騙一次看懂",
    date: "2026-07-13",
    summary: "【政策與防詐】\n重陽敬老發放期間，詐騙集團常假冒政府機關寄發簡訊或 Email，聲稱「敬老金發放失敗，請點擊連結補登記」。\n\n【正確領取須知】\n政府機關不會要求民眾透過簡訊連結輸入銀行帳號、信用卡卡號或 OTP 動態驗證碼，請務必透過各縣市政府社會局官方網站查詢。",
    link: "https://news.google.com/rss/articles/CBMiTkFVX3lxTE1EQzNUUjBNTjZ6RnA4emR2a3gweXZQQk9fUFRtazNPWWRoNDVndjFFbmJISFZFWkdXN3RjcXNGbEdpTGx3SkhiamZienRTdw?oc=5",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
  },
  {
    id: "9",
    type: "矩亨網",
    title: "OpenAI遭蘋果控告竊商業機密 馬斯克諷奧特曼「把詐騙提升到新境界」",
    date: "2026-07-13",
    summary: "【國際科技新聞】\n矽谷爆發重大商業訴訟，蘋果控告 OpenAI 涉嫌竊取商業機密，馬斯克對此發文諷刺其為新型態科技詐欺手法。國際商業領域中，涉及專利、技術與資產的虛偽陳述同樣屬於高智商詐欺範疇，提醒企業注意智慧財產權與資訊安全合規。",
    link: "https://news.google.com/rss/articles/CBMiT0FVX3lxTE9TTzF0RzhGUktrREg3WVllemhKOG93MDBwX0Q0QVc3WTdvbkV2OWplbjAzbWpkcWtJX1prU05MaFFGMkZPQ3BiUEtsUFFDTTA?oc=5",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
  },
  {
    id: "10",
    type: "官方公告",
    title: "最新消息-防詐騙提醒｜請認明臺北市南港區公所官方Facebook 粉絲專頁",
    date: "2026-07-14",
    summary: "【官方權威聲明】\n南港區公所提醒民眾，近來有不法分子建立假冒之公所 FB 粉絲專頁，進行抽獎或假冒公務宣導。\n\n【防範方式】\n認明官方藍勾勾標章或公務網站公告之正式粉專連結，勿隨意在未經驗證的頁面留言個人身分證字號與手機號碼。",
    link: "https://news.google.com/rss/articles/CBMioAFBVV95cUxOQkhLUzdaQ04wQllBY1UxV1hiM1R4X2h0R1_pTzY1bjV0d0Nmc2lzRXR5VENZWGZuWnI1cTZtSlpKQTg5ZENyNUlhUFVrbEJhc1dXZkxMazVYbThxczZnTXlXZDBvNmh0eVJnTkFZQlhSLXJRZkdfYnVhR1JhMUdESmw5TU12alJxMVVvc1_MV0lqbzczZ3l2Rm5yUVVhZ2xs?oc=5",
    img: "https://images.unsplash.com/photo-1577416416116-44490ae2576d?w=400",
  },
  {
    id: "11",
    type: "今日報",
    title: "神說「那人獨居不好」，交友詐騙偏偏最愛一個人的基督徒",
    date: "2026-07-14",
    summary: "【情感詐騙剖析】\n詐騙集團利用宗教信仰建立心理信任，假冒相同信仰的單身對象，透過長時間貼心噓寒問暖（殺豬盤手法）取得信任後，再以「建堂資金缺口」、「投資共同未來」等理由誘騙匯款。\n\n【防範機制】\n只要交友對象談及金錢、虛擬貨幣或要求匯款，不論對方多符合理想條件，均為詐騙手段。",
    link: "https://news.google.com/rss/articles/CBMinAFBVV95cUxOeFgwSGRhX2ZiNEgxc2l4OFNXWkxiMVE5SWJzdk9hb0VaNGFjc3B3V3BITXFFODlvUldUMzFFdmpSQnh0NmI5cmM4UDh5WHYyZXJrRHpYYlJadlF6SW5jOUQ0MzRjYmExTU9ISm80RHRyWHZRMmQtb2xiRXVhQ29vNkN2YzdQSUJMMWtBZFBQcGxUU3c1QURjS3ppSGQ?oc=5",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
  },
  {
    id: "12",
    type: "風傳媒",
    title: "赴日淪詐騙車手遭逮！29歲台女楊欣怡「長相姓名全曝光」 日警破獲台灣跨國詐團",
    date: "2026-07-14",
    summary: "【案件深度解析】\n台灣詐騙集團將觸角延伸至日本，派遣台籍成員入境擔任提款或面交車手，專門詐騙當地高齡長者。日本警方已對外公開犯嫌照片與全名，後續將依加重處罰法條進行起訴。\n\n【警惕提醒】\n打工度假或海外求職務必透過正當管道，若涉入詐騙犯罪，不僅面臨刑事判刑，更會留下無法抹滅的跨國犯罪紀錄。",
    link: "https://news.google.com/rss/articles/CBMiUEFVX3lxTE52aE5PSEdyNUktaE15Ql9wM2Y2YUw5Q3pyVFFrNXY5eF8zS1V6N1_sbkRTUHRLTUZTc0c4QmRCZ0hjRVdEUXVwNDdSdjVRYkZw?oc=5",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
  },
  {
    id: "13",
    type: "FB新聞",
    title: "快訊／29歲台女「日本詐騙被逮」長相曝！ 日警破獲台灣跨國集團",
    date: "2026-07-14",
    summary: "【社會快訊】\n日本警方宣佈破獲跨國投資詐騙機房，逮捕涉案的 29 歲台籍女子。該案詐騙金額高達上千萬日圓，警方正深入調查幕後台灣主謀與組織運作方式。",
    link: "https://news.google.com/rss/articles/CBMijANBVV95cUxPcTZnX2M3WUI2S0QzMm5YZEdPQWVyanZBUks2MDZuRDhteDNKT2JGX05NcFJxNkZ5SjA1QkVMb21heThWRUVQRkJnTXRNMW9iRE9UeHJNYVVnenRUajdsRGVoZHlyc0Z2NzVBT2h5WmYwUmxseXlkX1_McDdORVpBYUo1dnZWZERWUnRWSTEzbkx0MFJYRWZRdjN5UVlSS1o2WUp0VHQtc0c0MTFXQXlIb1R4MFczOFlLSkZETVNJY1E1QnF6NHJVREZZR0CCPSwSVhhb0VUSmprd3FXaDlRV3ZoTFRBTkFoaXpQdHhuVllPVEFhLUs4ZUl4YkFIUHZ6eG9icFRQMWhZWUlneTA0TEdZMmJZaU9NZEMzTThJVmpJSUdFeHRjV2dYczBhUVRpaENGVVFIdTFkSGV4OTJnd25hQndDYU1lQ2Q4d3pSTlpmSWNyS1JObl83SjBoNE5LYzNtYWNDQVhoOUdVb2kzS1Jfb1BPOXNmeUlpbUx3LVpFcl9FMzBxOW5EQ04?oc=5",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
  },
  {
    id: "14",
    type: "UDN",
    title: "防堵詐團鎖定企業戶與跨境詐騙 兆豐銀行上半年阻詐近億元",
    date: "2026-07-14",
    summary: "【金融阻詐戰報】\n兆豐銀行公布今年上半年聯手警方成功攔阻詐騙成果，總阻詐金額近 1 億元。詐團近期鎖定企業帳戶（B2B 郵件詐欺）及跨境匯款進行詐騙，公私聯防機制已成關鍵阻斷點。\n\n【企業防詐叮嚀】\n公司變更匯款帳號時，務必透過電話或第二管道向廠商進行雙重確認，切勿僅憑 Email 通知即變更受款帳戶。",
    link: "https://news.google.com/rss/articles/CBMiUEFVX3lxTE5iN0FraWVuX2F6THJBTHhVNHozenpUNVZBV21IeE9jUG5hQ19mMXF3b0ZwRnBIbjZnWEo8SDU5OTBIMk0zQ2s3eHNaT00tZ3RX0gFWQVVfeXFMTkFMT3lCREVENDZhdUZXRWJvQVpDMVBnb3kzeWNTRGpLX3NxTlFMLU9sZlRlUzhNU18welNwSGZsa1BNM3VFalROcWRLNjktd0w3MTc2V3c?oc=5",
    img: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=400",
  },
  {
    id: "15",
    type: "世界新聞網",
    title: "接到詐騙電話 華男只問一個問題 對方瞬間「露餡」",
    date: "2026-07-13",
    summary: "【防詐實戰反擊】\n一名民眾接到自稱銀行客服的詐騙電話，聲稱其帳戶有異常扣款。該民眾臨危不亂，僅反問對方「我的開戶分行與預留的緊急聯絡人是誰？」，對方無法回答並急忙掛斷。\n\n【防詐小技巧】\n接到任何涉及資金安全的電話，保持冷靜並主動提出「個人化驗證問題」，或是掛斷後自行撥打官方客服專線核實。",
    link: "https://news.google.com/rss/articles/CBMiYkFVX3lxTE1jeXFnZEJkdXZBV3ZxalhId25UZ0JZYVdiWjhMdGhCaU15Yk5WdlF4cllHUWprc0Zxd2hpOVVBVFdyVDZLQ0QteWNXNUJTMm15SXZUb0lBanlnc3AyMDZrRDVn0gFnQVVfeXFMUERaRDFnMG9kMXlYVTFpZkhEX3FPNWlWN1JZbkV3M2pRWkdCX2VJTGt5Ul_pTHJXU0FhR2pSUGVDTmFnQXFnTjNDWjlPTVo4dG40RzU1WXZBdlk0MThzT1JuMkZ0T2tJZw?oc=5",
    img: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=400",
  },
  {
    id: "16",
    type: "鏡週刊",
    title: "台灣29歲女「日本詐騙落網」 長相、姓名全曝光！假冒名人AI投資吸金千萬",
    date: "2026-07-14",
    summary: "【追蹤報導】\n該起在日本發生的台籍車手案引發台日高度關注。詐騙集團利用 AI 生成軟體模擬財經名人演講影片，並在 FB、LINE 等平台大量投放「免費領取飆股資訊」廣告，藉此誘騙民眾下載假投資 App。",
    link: "https://news.google.com/rss/articles/CBMiW0FVX3lxTE0zWlVtOE9tcnptV095QnpvcVlpOTFiYzMwMkVVOXJaZ3dINnlCVWV5RE9BQUpOX1BCeHN5RERrN2dXUkYwZ1dpZmtDdHpPZU9pTkhSd2VoVllIX2_SAWBBVV95cUxObUxQeE9QdU9MNjFIS3VrSk13OWZaZl8zbU9adGU4NjBwNTQ4MnQwTi1ELWxJZ0xmZm1ndFNUeE9LdW1STHRBT0tMdVVnYzJCMktWT2FjYmNNTzF2Q0pvcjk?oc=5",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400",
  },
  {
    id: "17",
    type: "桃園電子報",
    title: "打贏官司也拿不回錢？直擊詐騙求償核心 徵信專家坦言：一紙空文機率高",
    date: "2026-07-14",
    summary: "【法律求償現實】\n許多詐騙受害者即使打贏民事官司獲得勝訴判決，往往因詐騙集團早已將資金透過虛擬貨幣洗至境外，名下無任何可供執行之資產，導致民事賠償判決書形同「一紙空文」。\n\n【防範大於事後求償】\n預防勝於治療！資產一旦匯出詐團帳戶，追回機率微乎其微，匯款前務必三思。",
    link: "https://news.google.com/rss/articles/CBMiTEFVX3lxTFBwUXlTYW1EOXFtaGw2czFkV252eGM3VlhhcktMRUgwZFZ4QmU5U2hCWE96LV88Zk1MWVBVMEJlcFVLMWJDYVJ4Z0dXZHk?oc=5",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
  },
  {
    id: "18",
    type: "LINE TODAY",
    title: "台灣29歲女車手日本落網！詐騙東京80歲老婦9500萬日圓| Newtalk",
    date: "2026-07-14",
    summary: "【被害案例】\n東京一名 80 歲老婦人遭假檢警與假投資雙重話術詐騙，陸續面交與匯款總計高達 9,500 萬日圓（約新台幣 2,000 萬元）。警方呼籲多加關心家中高齡長者，防範「假冒公務機關」詐騙。",
    link: "https://news.google.com/rss/articles/CBMihwFBVV95cUxPZnltMS1qdDRhS3l1cGVUNzM1clRCVTFWNkdpVHg2anVIZDVab2dxVFFMeUo0a3pjbEVzTE1qeHF2WXROaUdjOTR6SEdONmxBbkhkZkpfVUs3TTVKRW9fd3h4ZTRSNlNqYWJHUkRQTVVtcG9RRE1zQXVMVE1TU2xZa3dGSm9rTEk?oc=5",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
  },
  {
    id: "19",
    type: "Yahoo新聞",
    title: "詐騙! 買賣36萬\"黑水鬼\"手錶 對方稱\"驗錶\"直接落跑",
    date: "2026-07-14",
    summary: "【實體面交詐騙】\n民眾在網路賣場出售價值 36 萬元的勞力士黑水鬼名錶，約定現場面交。買家藉口「帶去旁邊車庫給專業師傅驗錶」，隨即拿著手錶從後門落跑，賣家追趕不及損兵折將。\n\n【面交安全守則】\n1. 避免一人單獨前往。\n2. 貴重物品面交應選在警察局旁或設有監控之銀行大廳，且在未收到款項前不得讓物品離開視線。",
    link: "https://news.google.com/rss/articles/CBMi9wFBVV95cUxQdktkZ3drV3VIX21mOURPWHgtU1VhcnZyMWN1dDVOOHRmcDRRa0NwNnMwZEZhY0x6TTd4TE1iOXN3dThkWi1VRzFxZVI3d1JwX2lOMFhMY0pzRTlCMEoweUt0b0VUX2E1S2JyS3pJeTBVak1PT3U4NURaNUFiV1lyVW1PcHR0UU5WSkcyZTd0Q0J1ZGtfR0gtQTlQUXNlMEZaQUg0aE9MOG4yc0pmLU1TQVEtRGlYSlM2dEt3eU81TGd6zzJvWHNtTWxEWlFMX0lRWVFrYWpxY09MS21mc0w2RDYxZGc3blRYSUQzX3l4eTU1dnU3WmhF?oc=5",
    img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?w=400",
  },
  {
    id: "20",
    type: "UDN",
    title: "家庭主婦臨櫃領150萬稱買新車 向誰買、車款均答不出險陷詐騙",
    date: "2026-07-14",
    summary: "【銀行成功阻詐】\n台南一名家庭主婦前往銀行欲提領 150 萬元現金，聲稱要「買新車」。行員問及購買何種車款與車商資訊時，婦人支吾其詞並頻看手機 LINE 訊息，行員通報警察到場勸阻，才揭發其遭遇投資群組詐騙。",
    link: "https://news.google.com/rss/articles/CBMiU0FVX3lxTE1ETnJnYWVucUNFU1pEdEo2LXdvU09DaWxkSS1OZDZib2NSaWhDZDRoTHJQSHJKWFYxazJ3Y1FETW1LM2RoZTR4OEI0S1Q4Q3JFSXlF0gFYQVVfeXFMTlJJSVBuWkg3enpCY21UWkpDcmRHUVAwdnNIZjZRTGRTNTRsRjFhNFlEX2NneENISEdvNEtiazh3OGNvT1lDZ2RVckotM1_DUGVlMEp1Z05qUQ?oc=5",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400",
  },
  {
    id: "21",
    type: "Yahoo新聞",
    title: "高學歷更好騙？台灣詐騙人口比「神山員工」多，日收破億靠誰撐盤？【AI詐騙解碼專題】",
    date: "2026-07-13",
    summary: "【深度專題】\n統計數據顯示，高學歷族群因過度自信「自己不可能被騙」，更容易陷入客製化的專業投資詐騙。詐騙集團利用大數據與心理學，精準打造高報酬加密貨幣與股票投資坑洞，每日全台遭詐金額破億元。",
    link: "https://news.google.com/rss/articles/CBMiqgRBVV95cUxPb3hnRW1XMzZQZWs5OTVfajd1clVOTUNNZjl3ZXYxbnU3b1BiMU1acVJuWGd3N1NYZkhkbkh6ZzlYVlRPTk5MaTN2cDZEZXJ2TW1FZXN5a0VUOXlLbmhYdnRQc2R4VkpWbHAtbEJDdjZxYTJ3MzBfc0NyTThhcDVwY0piZEJxNko1TW13ZHRKaVJzZXdfNTNvbno2cjMxamRldEp2Tk1uVzhPd3lsOER3N1_aSDdKTmxOTDFOUV_QNk9CcHhLWENsdkMzTVdpMEgxMk1FRW1tbVQyLUMxeW5BVmNZZEN5c2VFWUpxdXlPd01IMktKQVRBcFhzLWp6SU51aUlhR0R1OEwtVlBrNXB5NzhQRjdDUTNCQmlmWjY1MjQtQl_1UFpzQWluSFBZazRWYTJidVh1S2NINVA1M1ZoeVFfeXotWXJiUFR6UzFMelhBSlpsNHFmcXpSRkVfWTVUNzNpS2A2WDluU0tRTktrd0Q5by02QjBhY1AyaGNMWTcwZVBRQXE3cVpEM3liT1hUTjl5SGtaSUVVM1pZdmlWZFVZWjc0dWp4bXhpVUFQYTk1Y25aZlUrblF4OURZTXZLeUZCTXJISEFRaHlETkV6U202WnFUUG9FSzk4X0VQRFhkdllMbHdiUXc5aFlrQ2c1VndTNVlnZk03VTF5QUtrdlpjaVJQbzVKcUxUZ3pHNTJpVjNNNVVvRVZVdkhMdmpxTmFSRVN0SzJiZw?oc=5",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
  {
    id: "22",
    type: "UDN",
    title: "大陸人均日通話降至8.7分鐘 網友：多是詐騙騷擾誰敢接？",
    date: "2026-07-14",
    summary: "【通訊趨勢分析】\n最新統計顯示人均每日語音通話時間創歷年新低。主要原因是騷擾電話與電信詐騙氾濫，民眾對未知來電產生嚴重警惕心理，寧可使用即時通訊軟體文字溝通。",
    link: "https://news.google.com/rss/articles/CBMiUEFVX3lxTE9GcWg0enRVNzFIbjY2blpGc0dPQ1FaWV9iWkwydDF4NzlfTzlrYmZyWUEzNTFfR0RYcnh1MkpNdjR2VHVoV0tkRGpBUmFNVnVN0gFWQVVfeXFMTzR2R0VyQm4xZDhXZWVoMzQwWHpFLTlnWS1nU0pLU2NnRHR3ZUN2Z094TVJtaUVVazVYdTNadUdDb0JJZnZ1ZmVDT3RPcmtZUVJpb2d4Qmc?oc=5",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
  },
  {
    id: "23",
    type: "Yahoo股市",
    title: "AI詐騙浪潮衝擊企業資安 深偽與社工手法致巨額損失",
    date: "2026-07-14",
    summary: "【企業資安威脅】\n資安報告指出，AI 聲紋複製與 Deepfake 視訊已成為企業高階主管詐騙（CEO Fraud）的新手段。詐團假冒高層發送語音指令要求財務人員緊急轉帳，企業應建立多重審核權限機制。",
    link: "https://news.google.com/rss/articles/CBMi5wJBVV95cUxOQ0RTbFEza0ttcWdYUGZpenpNTWdJQUNBN1dqaGpJTUhpZG9tMXBacldlT3F6XzVfN3E3Q1MtY0UyYl_RSXQ2MHVEUW85WjFGTHRjUmZvLTVYcGdyb0o1cUdNQks0bktUWkpZeVhhOGV0UUhJangzLWtZbVJlUE44MzRtZzd0REl1QXhJdGk5XzlCWGJHbXZ6UktpdWx2YlYzbkF2SVhxS2tWb09id3lheExmclhNN2gzemNZbkFsZE9pUGNSN1lHeXUxd0lsUEtXZm5fNjlLMW9oRjhRaXZ3Z3hLWm9EZHExMTExc0hLNmEwWDZiR2lyemxsYUJHZ2l3bEZoVnF5cjhOcjZjREhqZGU4VmZldUdEYVdSWmx3bmhCR1ZrSFJIbHhhM3FmVFBES3c5QWZYeHZWbnJSTzBqTndUajhILVROZk55c3ZGaXJLWUJiUWIyZkYzZjhRWVQ2bzQ4QlYzWQ?oc=5",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
  },
  {
    id: "24",
    type: "經濟日報",
    title: "又有台灣人在日本涉當車手被捕 日警查詐騙集團",
    date: "2026-07-14",
    summary: "【國際合作偵查】\n台日警政機關合作調閱跨境金流與出入境紀錄，發現有特定博弈與詐騙集團在台招募青年，以旅行的名義包辦機票食宿前往日本擔任車手，目前兩國警方已成立專案小組全力打擊。",
    link: "https://news.google.com/rss/articles/CBMikAFBVV95cUxNZ05GQTFna3M3ZFFmY3EtajNBSXNpby0zMElla1hFeUlpUTV1Y3UwZzlFb2F0VkJzbVYwMWdreHAzU0JhalZnWmczLWswX2MtN000ZUZBcXpSb1ZBdGRKY3F3UktfVmI1eGN2UXgzZUVkU2tqTGc2SVlvZTM4Rm1TS3RzNUd4dTR0cS0wM0ZYaU7SAV9BVV95cUxOLW4xSUJldzdUUjZmY1R4bTI5UkpVTmRmVmlsV2JaLTh5ZlBEVEJma2ZTODVobVlUWTVhX1M3d1pTdXlKT0ktTktPWUJQUjBZaS1RZU9DR0dlc0NEZXhhOA?oc=5",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
  },
  {
    id: "25",
    type: "Yahoo新聞",
    title: "詐騙犯不想坐牢…竟在「3年生3孩」全部都棄養！坐月子還重操舊業→下場曝光",
    date: "2026-07-14",
    summary: "【社會奇聞與法治】\n一名女詐騙犯為躲避入監執行，利用法律對懷孕及哺乳期婦女的暫緩執行規定，連續生育並棄養幼兒，甚至在坐月子期間繼續進行網路購物詐騙。檢方最終認定其蓄意規避刑罰，依法撤銷暫緩並即刻收監。",
    link: "https://news.google.com/rss/articles/CBMihwNBVV95cUxONVNfU1dWR2ZWcVFvakEwQ2dLNWRfcGQteV_jczVpdjdaTTNzVUZhdEV0X0xpS0Z1bUlLNGNzamNxMGttM3BXYWdZWG05OFc2SzhaVGV2UW9VVjhBd1BjMVFDcHRMYmd5MmNralA0Vl_BaTBDZHBsZHRGUlBERlFNazZHMFZ1N3MxZl_LdF_aMjQtV0ZvNHJOLW85N1N3cEZmbGxtbTY2YVFGMHRlS2Vuc0hjM2Rlek9LNFBMUGM2Q1ZFbEVKLXNoNWVDaDdaV1JaYjNNaW1MZnJpOXFoaV9vbWRmbnY3OHd1TFlXeFlFTXNOV1ZLX3hYOXZTc1_yTHRwNnZ0cTQzeERmbDUtLUx0YlNPbGJmdHJDTW1zSVliRnp1bDFwSEVYOWpwQ0pBZHBUS0JYb3FxY1_vQVh2NjBWc0dsTGFXZVhkS0N4cDEyQXJwWXFkbHdjSk10NUJsbUt1dFA5NnlubFlNSWtSNGxkSVFhZ1pmalVqZ1h1VVEwamhVa0JKVFhv?oc=5",
    img: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=400",
  },
  {
    id: "26",
    type: "Yahoo新聞",
    title: "母子檔偽造義大利橄欖油詐騙9年！芥花油混充狂撈3760萬",
    date: "2026-07-14",
    summary: "【民務食品詐欺】\n不法業者以廉價芥花油加入色素與香精，偽造為高級義大利原裝進口橄欖油銷售長達 9 年，不法獲利達 3,760 萬元。檢調依黑心食品與加重詐欺罪起訴，提醒消費者購買食品選擇正規檢驗通路。",
    link: "https://news.google.com/rss/articles/CBMi4wJBVV95cUxNZDNicUtlRUFGaEdtaXV3RXptU0s4UE5wU2kzcUxzaVl0ZGY1c1duQmFGWnpqNHJTYk8wYUNUUUNPcVFRTHZlYzJ4ZXdYZ3g2RkVDSURjWjF0S2V6N25kaFRkWmJoLWszVElOYWtlWTRKYVZWcVpFeW9ZYUtIVWcwN3YwRWEtWUtWdHN2ajR5VTZ5dmNaVDNoUkU5QnJZTUd6dzdsYllTUkExUDl2TUtlZnhaSm8zb2FqY3BzODVnOGZ5Y2xQcll2UGF4di1YcjZPUk9JQVlqT3FHSG5MdGJoWkhmS0hZX0c0b1F6bTVCeW1vWHFDVEpuNmIxOXh4dDFzWmM5SmFSWjFaZDRvcHg5OEdfX0xDSV9kUWFBOTBfTlhQQ0pFMGE3TV_mZHFqLWJna210dXlhcmthZHZ3b2lJcVJHWXhGa2pJMXhiUkU2YmFvREhxelZlM3FwSWNjb1Itanhj?oc=5",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
  },
  {
    id: "27",
    type: "Yahoo新聞",
    title: "台男赴日當詐騙車手二度被逮！姓名慘遭公開",
    date: "2026-07-02",
    summary: "【警惕案例】\n一名台籍男子先前已有詐騙前科，出獄後再次赴日加入車手集團，最終二度遭日本警方逮捕。日本執法機關為遏止跨境犯罪風氣，依當地新聞法規全面公開涉案者姓名與個人資訊。",
    link: "https://news.google.com/rss/articles/CBMiuAJBVV95cUxOeDFzTVlSZ1FKTjFVM2VmVnFuZXhmcU1UYzQ4N2pZOXlaOGhxU3pJY0JzNGVsbmJ2d3p5bUVNbksyc29XcmQxVlZPazBPYngtU2FGYVNLVUxGSWhkLTQyNGctTl_PNzRzOG1ocWtfVHlmZm16OVFPOUczWXk4YzJ5UUdHMHp6V2xWem9sbHNUMUxrZ2lsWEZaRE4zV21OOHMtOE1YTFlYQ0tUXzZ0R0dxQjNEaEp0VlUyOTJHOU5fam44MGV2SUlJckpjTUVNNUZVRTgxLU8wZWtzeEdJb1loc1RadExpYlA4ZUJ0YXdnczRRZTlHSHZpOUNabzAzMy1kM29McWdwdUwxdUdkWVF2Qk9VSlFUYmFyM1lvZnA3azRjdWRTY1pyUzZEeTlURlk2S1_zSEpNTnI?oc=5",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
  },
  {
    id: "28",
    type: "新住民網",
    title: "幫朋友投票先等等！LINE投票連結恐藏詐騙 慎防帳號遭盜用",
    date: "2026-07-14",
    summary: "【社群安全警戒】\n常見的「幫我家寵物/小朋友投票」簡訊與 LINE 訊息，點進去後會要求輸入 LINE 帳號、密碼與手機驗證碼。一旦輸入，帳號將秒遭盜用並用來向親友借錢。\n\n【防盜對策】\n切勿在第三方網頁輸入 LINE 的簡訊認證碼（OTP），此為個人帳號轉移之關鍵鑰匙。",
    link: "https://news.google.com/rss/articles/CBMikAFBVV95cUxPR3dkNWRyQ3dhUm1HY3BhZkNodWx5alA5Y1Qyd0dVSXh2TFRxeTRRYTBKdTdyZno1di1CVWpqWTBqMm5NNndraTdYZTNtTGplbHlENUM1UlRmaWFrdEZBSm9LUlYyMy1PalFqOU5wcElad1ZQTER1VkVPekVoS3VjdmJQOWxXNU00dFhvVG9uMjc?oc=5",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400",
  },
  {
    id: "29",
    type: "UDN",
    title: "以為上班族？車手落網竟想向「公司」報備 警傻眼：知道在做什麼？",
    date: "2026-06-27",
    summary: "【車手盲點】\n一名剛畢業青年透過網路應徵「外包金流專員」，每日依指示向陌生人收取現金。遭警方當場逮捕時，竟還開口詢問「可以先讓我向公司請假嗎？」，完全欠缺此為違法詐騙車手之法律認知。\n\n【求職提示】\n凡工作內容包含「代收現金」、「代提款」、「提供金融存摺」均為詐騙車手，無一例外。",
    link: "https://news.google.com/rss/articles/CBMiU0FVX3lxTFBpN2UxU3JXWGxJQWxDVDNLUjVMVEl2MzJQb25NMS10aFRiVTFPbzBLTmpVNktoUTdEQ3h4czE5LVU2WjB0U2hBQzNQTEUxVGc5T3kw0gFYQVVfeXFMUFV1WEZsemZHNFdjMXlmal_RSk5OQVR3THRlb05McHVFUDN3bmNZd1pzbUQ3N3o4LWZFM1g2cDNEbXVLdk5sdkhRZEt6cDFkTU4xVHNwQnVLUA?oc=5",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
  },
  {
    id: "30",
    type: "華視新聞",
    title: "《台灣引路人》專訪刑事局副局長蔡燕明 揭密 AI 深偽詐騙反制關鍵與「雙降」亮點",
    date: "2026-07-14",
    summary: "【官方抗詐專訪】\n刑事局專訪透露，政府已啟動「AI 反詐戰略」，結合三大電信與科技平台，從源頭攔截變造電話號碼與假投資廣告，成功促成受害者人數與财損金額雙降的階段性戰果。",
    link: "https://news.google.com/rss/articles/CBMicEFVX3lxTE9BRDB1TE9IS2FMQWV0M1U4dlpCcnBxNzlSLXg3dUlHMGNDcG1ZOWpENzdmTVpwWXVjYV_fVTIzWWJHUmpId0F3QkRjXzdYOE44N1lDc0FNdnRKQjA5bTVTMlZWWDNMNHJ4MXUzaFBubFA?oc=5",
    img: "https://images.unsplash.com/photo-1521791136366-3eb296a6056f?w=400",
  },
  {
    id: "31",
    type: "官方通報",
    title: "最新消息-打詐臺北隊115年7月反詐宣導",
    date: "2026-07-14",
    summary: "【台北市宣導】\n打詐台北隊針對近期熱門詐騙手法進行彙整宣導，提醒民眾重點防範「網購解除分期付款」、「假冒賣家驗證金流」以及「假簡訊罰單催繳」等新型犯罪手段。",
    link: "https://news.google.com/rss/articles/CBMioAFBVV95cUxNalMtaXRMUmVJbnFBc05laXRYWjQtNjRtNVExT2RlcmRFWnhBNTFaajZiOHdYTU5ON3hIMU9fOExmM3NTTWVTTFFCQVZtNlZXZjJibVVtRFF4ZzAxUmNxN1UtZE4zdjJvTHAtWGF2QXkxWmN3WUZNTlVHMjJla3ZqenhZUFVYNHVXVDBUQ1l5VFdwdnItNlFlOGhfX1pNeFo4?oc=5",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
  },
  {
    id: "32",
    type: "Yahoo新聞",
    title: "發票中獎詐騙猖獗近期逾千件 工程師誤信中千元反遭盜刷78萬",
    date: "2026-07-05",
    summary: "【釣魚簡訊陷阱】\n一名工程師接獲「雲端發票中獎 1,000 元」簡訊，點擊連結進入極為擬真的假財政部網站。填寫信用卡資料領獎後，短短數分鐘內遭海外人頭刷卡盜刷 78 萬元。\n\n【重要觀點】\n領取官方獎金絕不需要輸入信用卡「背後 3 碼 CVC」或手機 OTP 認證碼，凡要求輸入卡號者一律為詐騙網站。",
    link: "https://news.google.com/rss/articles/CBMijwNBVV95cUxOZVFkWlVFMVg0ZnJXbE8wa1c5OHRxRFFLajVNWmgxc05jbzZfNmlpOURiSE9hNjZQZkFqeVhVNlE5RzdFUVdINVlJVHV4cHJTZGt6TzJUOWx3UHpMTnpzUW4yeHVRRXFzVEdHNVEtNkZ4cTJMZDVMSjRRNWhabWJYSVRxdDlvdmV1d3V0XzctVTE1ZnNiRUpjbUVxdFctUE5EQldHXzBNZHlJWXdoTi1WWWpPMWJTM29weTFXOHRSNG5zQVdUYU81NWdTMjItejI4R0N5Z1hONEV2bHB4bzVOMWZQYUNwSU9nU1_OZzAzcVVrR1gtU1ktT2hEZ2pzc3J3UFI4THk3Sk9fU3lXaGIwSzQxNlBsWEdNYWhJYTJwSzc4aE9xRGxTOEliQjVaSXFPUFZaVEl3cWZXTk1FblNmRU5XRi1BZlRrMXg4cFVMMkhnQUFBQVZvalNGODB5eXFjUVhrQkpSVnp4MlRHUXFCV2owSXp0V2RZeUM5T3pTcXp2QkhGQ3NFaGk4dTZZMjA?oc=5",
    img: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=400",
  },
  {
    id: "33",
    type: "TVBS",
    title: "賣家也被詐騙！誤信假物流客服「視訊操作網銀」 帳戶慘被榨乾",
    date: "2026-07-14",
    summary: "【賣家詐騙手勢】\n詐團假冒買家在二手平台留言「無法下單，顯示賣家未簽署三大保障服務」，並傳送假客服連結。假客服要求賣家開啟手機螢幕分享進行網銀金流驗證，藉此偷看密碼並將帳戶資金轉走。",
    link: "https://news.google.com/rss/articles/CBMiTkFVX3lxTE5ubUxmRmQxbGd3VW1FeERuRkFtSHhLQ091RXNUSFBRZWdWbDgwVGRTR1dURW14RC1uYTNqa2tjVWNVcEdESjRDelNPNW9TZw?oc=5",
    img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400",
  },
  {
    id: "34",
    type: "華視新聞",
    title: "網湧現「假冒台積電員工」詐騙盜用邰智源照片- 社會",
    date: "2026-07-14",
    summary: "【名人肖像盜用】\n網路出現大量「台積電資深工程師分享內幕飆股」之廣告，背景竟直接盜用藝人邰智源之劇照與新聞畫面。警政署提醒，切勿相信任何以名人照片包裝之投資群組。",
    link: "https://news.google.com/rss/articles/CBMicEFVX3lxTE48aXFYNTZ4QnFnOW83ek1ZbuzozOG1xWWtNRGhrdmZ3VEtsZld2Y1prcGJGTE1QbFBMOURTb1_5RllGWWpVRTk4dDN2SGlILXVxWnJnT1VlNWt5STVEcUFXZVNadENnek4waGxzaG9kVzc?oc=5",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400",
  },
  {
    id: "35",
    type: "文匯報",
    title: "截留投注資金 誘導反覆轉賬——起底網絡彩票詐騙套路",
    date: "2026-07-14",
    summary: "【博弈彩票詐騙】\n不法平台標榜「專業導師帶操」、「100% 破解彩票開獎規律」。受害者初期小額投注皆能順利提現，一旦加大投注金額，平台即以「流水不足」、「系統維護」、「帳戶凍結」為由拒絕提領並要求持續儲值。",
    link: "https://news.google.com/rss/articles/CBMid0FVX3lxTE9RazkyeGVFQnRiRENlcmR5enk3aGtxclZGU0Z1R2lXaU5NSTdXc2VDWTR4MERzZ3YyVDhuWUVxTkRMUS1jcVhFM3I2MjUyY1p3NVB0Tlkya2J4MXREUWlpT1lNcG9VRldrMEM1Rms2bFZ_NDlDQThV?oc=5",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
  },
  {
    id: "36",
    type: "UDN",
    title: "長島當局示警：「金條騙局」頻传 專針對長者",
    date: "2026-07-14",
    summary: "【新型取款騙局】\n詐團假冒政府稽查人員，聲稱長者帳戶捲入洗錢案，要求將銀行存款全數領出購買實體「黃金金條」，並派專人假冒快遞員前往家中取走金條，手法十分猖獗。",
    link: "https://news.google.com/rss/articles/CBMiUEFVX3lxTFBYcGF6aGJfYmlCdFhpR3RUTTdKaWlxOGZvc09LZXVFenNiNHJuSDNoWm84bDJ2YlFNc1JZNzF0VzBraHhnTFhIeFJnQkxhSUZN?oc=5",
    img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400",
  },
  {
    id: "37",
    type: "Yahoo新聞",
    title: "機警運將報警助逮詐騙 女乘客遭網路感情詐騙變車手遭逮",
    date: "2026-07-13",
    summary: "【運將機警報警】\n計程車司機載送一名女乘客時，發現其通話內容提及「幫老公拿幾百萬包裹現金」，且神色極度緊張。司機判斷其遭網戀詐騙且成為取款車手，機警將車開往派出所求助，及時攔阻詐騙。",
    link: "https://news.google.com/rss/articles/CBMigANBVV95cUxQN0pKRTVETU9rSFR3RGRaQVVYbFlxQVdESnpPNE9SeGFCc0ZzVUV6UXFaT3A2MWJEZldzNTFXSkVxTzZkUHhTcWNnrFkyczlJOEJmWUV2NUpHT2FaLVE2al_QRzY5YXJsRmN2WEx4NkRWS3Y5ZG5lcFFEc0tCUHRnZUVWUk9Ua3NQbkVoemlXdHRFclNFSmNGMGxONGV6bzRsOTBCS0MwOU9DdmNxcUxyeE1pcTMxSVJIR3RrSVZjMkFlN3BhbVdVdVYzVVR3cVJROTFkaXdzb1NVVGhQY0F_cnlnZFJIMV_wNjhpOEVxQ3FrTGJaN1JfRzR0ZEZ4M3FwaE8wMjhrN1hFbjkyWnltUGRMSGp5bDZZa1_tc0dYXzF0Y1BMcXBUTi1jTUZWVXRfNUJnVVo3ZFNhLWRCa0UtVnJSWEZIZDNUSXFzMzZnR0tMSnlPNEU4U21lMzVoX1dCM1RvVTRfTkVXbVpFR01XRThtY2Vxdlg3a1pYRmRIUmg?oc=5",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
  },
  {
    id: "38",
    type: "自由時報",
    title: "日警逮捕2台灣女車手 老婦成詐團肥羊、被騙9500萬日圓",
    date: "2026-07-14",
    summary: "【國際新聞分析】\n兩名台籍女子在日本以觀光簽證名義入境，實則聽從詐騙集團指示，前往東京都多名高齡老婦家中收取數千萬日圓現金。警方調閱監視器畫面後將二人逮捕。",
    link: "https://news.google.com/rss/articles/CBMiZkFVX3lxTFAyLVA5NWlnWjNmTEFhVTA2ZG92UzFzazNFV1VyeWdSa3RWRFJqd0dhaEVJWlNPaFV5Q0hMY2ZxTE8zelRwVmdNM0h5aHVzTkNCemZNQVZSaERyUTRfR3ZEZ3BkSzlkUdIBa0FVX3lxTE1qQTRxLTNsZm1KNDFYWEpuTWJiNDZUOVJCM0NBdmRLX294YllzOVFXRmdVZFhDdnVzeWlQdjFPcGF2ZmhRdmFKUllBVmZfSGFUVF_tYjVlX1NzdUQyam9kdlhwREpDbG1GWDN3?oc=5",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
  },
  {
    id: "39",
    type: "Yahoo股市",
    title: "買房詐騙怎麼防？一次看懂6大不動產詐騙手法與9招自保",
    date: "2026-07-13",
    summary: "【不動產防詐懶人包】\n常見不動產詐騙包括：1. 假房東騙訂金；2. 假買方設局騙房屋產權；3. 冒充地政士過戶。建議民眾免費辦理「地籍異動即時通」，資產有任何異動將第一時間發送簡訊通知業主。",
    link: "https://news.google.com/rss/articles/CBMi_gJBVV95cUxQOGNFeUxveFlES05HUmVWekthNnoxZ3BzUWRXYWlxTUtMRDVndS13cmVDYVh2ZzlWVk5lWjZkQ0lTdVdmUC1ZSkVETkp2aUkzZ3Y3U3g1eFQ4ZmNWOWM3ZzNac2hZY3IwTGZfRXYxQlFxM1FHcFRCS09lb0JCSWxpb2poRzJjTElNZjdRanFZNmFNT1_iVDFoakl5LXRDUFJmWkNpdXJsZFkyMFNjeGdILVA0dFR4V2FFa09aZ1FOdTQybWlLbk0xbkliT1BYTVJrbFhhTjRONmJ1anVFbmJveGtnajRHUkNFV3p3dDM0ME9MV0pad1p1NWlqdElfUkxfS1lpR0xiUVNybllwaVg0eFlSRFlnU2ZPMTVxRkdSbU5URzNINzFhaXhfRy0zbEhDUmdEamFXZFRXaE9rLXpYdHpqLU44RU1CVlQ2YWZJLVpiSFpub0V1OVJVY3hiLWJtVkt1MWIyTmg1R1hQY2hfNDF4cVdsMVA2T1_jcFFR?oc=5",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
  },
  {
    id: "40",
    type: "ETtoday",
    title: "網購族小心！「10大流行詐騙話術」曝光 網友嘆：真的很難分辨",
    date: "2026-07-14",
    summary: "【網購防詐指引】\n十大常見話術包括「重複扣款」、「工作人員設定錯誤」、「邀請升級VIP」、「驗證金流」等。凡遇到賣家要求「前往 ATM 操作」或「開啟網銀 App 進行解鎖」，百分之百是詐騙。",
    link: "https://news.google.com/rss/articles/CBMiXkFVX3lxTE91YWtNSERwY0I1bDUyMHlSQnB6MExtVmFqSmc3V1_PbWVJYjBYYzk0X25RRzBiRjZiX0lLSDhmcWJSU0sxVzVEaVpMT0NQdUdSVmg1cFlNcHVGZG16N1HSAWhBVV95cUxPUUhXYzBlM3NQQTBZQkhLTFVVU1_ibGNsWVB0VEVSbS16STh4dENIYjhmckppWUVsdEtkRFhZNXZZRDUtWG5qT1lINjVtUGw4RWN1ZXZJbXc5YTdtazA5bFM1Sk9uNk5SMg?oc=5",
    img: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=400",
  },
  {
    id: "41",
    type: "LINE TODAY",
    title: "林子宇：外貿協會邀請詐騙主嫌姜建良上YouTube節目後其擔任董事的公司又領經濟部補助",
    date: "2026-07-14",
    summary: "【政治與社會熱議】\n民意代表質疑涉案詐騙主嫌曾獲邀請登上官方推廣頻道，其旗下企業後續甚至取得相關政府補助。經濟部對此回應，若相關涉案人員審判確定，將依規定全面追回補助款項。",
    link: "https://news.google.com/rss/articles/CBMiVkFVX3lxTE1sQzBBNWxFYnRaNUNtemVoSTlwZFBNN2xEdU9iOUxQMjlQSjBOa3BNaURoNVRZYTFWUlJJTzlTcGh2YjQxV0FZY3o2OEllNEdVZER3MnZB?oc=5",
    img: "https://images.unsplash.com/photo-1521791136366-3eb296a6056f?w=400",
  },
  {
    id: "42",
    type: "Yahoo新聞",
    title: "不想通電話！陸人均日通話降至8.7分鐘 推銷詐騙是主因之一",
    date: "2026-07-14",
    summary: "【通訊社會學】\n民眾拒接陌生來電現象日趨普遍，促使推銷與詐騙電話的轉換率持續下降，詐團因而轉向簡訊、LINE 等社群通訊軟體進行精準文字詐欺。",
    link: "https://news.google.com/rss/articles/CBMi7gJBVV95cUxPUDhndk9GM2t4azl4QjRVU1BZM2FWOWFTR3dGRXVfdDJqZ2NBTkJhVW4zVjlMb2Y3VjN2OU1wRkVZbW5oSm1TN2lTUHRaS2RUeGVqNFgxZTczYmVuWVFJa3NRek02VHNXWU42eFUtSHFFVy1oZjVoZ3FFQWoyQ1VtQk9lQlVQMjN2MHFRN3JLQTZ1THp0Wi1IcWwyZUc3ZTI1WWQwQjVGUVF5cmtlSERzTnExaUVRUEUxUkYxSnk3dVlMcnVoTTQ0RE9sMEJDSUpBaDlwdmc2UlhkQ1BBTElWcXQtRlNKTS1FbHFZY25WVlZ4bTJweFFDLXU3RVNlakdHd1VzYm9LanllNFRIM0U4UHlCUjNUb2xPalJycE5RSmdBMW1jZVprNUJpY3JnMVAzRkIxM1RZQmxpOExTSFA3SkxYVzJwU2tHUkdhVVkxeW1DMHJqWTc3Z0hiZVl0TDhfNjBnaXZ6X2ViOUE3WGc?oc=5",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
  },
  {
    id: "43",
    type: "蕃新聞",
    title: "警銀攜手識破假檢警詐騙 攔阻550萬元保單貸款",
    date: "2026-07-14",
    summary: "【保單貸款阻詐】\n老婦人接獲假檢警來電，聲稱其涉洗錢案須將保單解約變現交付「監管帳戶」。老婦前往保險公司辦理 550 萬元保單質押貸款時，櫃檯人員警覺有異通報警方介入，成功保住老婦畢生積蓄。",
    link: "https://news.google.com/rss/articles/CBMiUkFVX3lxTE5IQ3pJczNOa2hCT2dEQVlVNUpnSDZQd3Vsb1hiZVdTcHZDcHpPN3lsTm1qdVNXZS1KSm5fcTRwNjhjNWY4ZUoxU3hCQXZNakphSGc?oc=5",
    img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400",
  },
  {
    id: "44",
    type: "UDN",
    title: "離譜公僕 新北警官結夥黑幫詐騙 羈押禁見",
    date: "2026-07-10",
    summary: "【執法老鼠屎】\n新北市一名派出所長涉嫌勾結黑幫詐騙集團，不僅幫忙查詢民眾個人戶籍個資，甚至協助提供警方臨檢情報。檢調發動搜索後依貪污與詐欺罪嫌向法院聲請羈押獲准，警察局迅速予以兩大過免職處分。",
    link: "https://news.google.com/rss/articles/CBMiUEFVX3lxTFBnV1I1VVp5QWQ4MFRweDlmZ09yNVRfQnhsMjN0bDJsaWpwRnpOQlZ1Z1_itXJVQ21hUm1KV1Rfa0ZuMXkxcU52U2lIQmg4eW4t0gFWQVVfeXFMTkNYeGU3RE51RGVRSjRZZlkyUkV0TlUwNkc0b21WSzFDbkR6V3BBV2c2UDdpU29tVUhYek83MHJOdEtsQ3cyazJHT096N2ZoOW5vQUhJNEE?oc=5",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
  },
  {
    id: "45",
    type: "元丰傳媒",
    title: "黃金回跌男子認有利可圖險被騙 太平警阻詐騙100萬元",
    date: "2026-07-14",
    summary: "【假投資阻詐】\n台中一名男子加入網路 Line 投資群組，誤信「黃金價格回檔，買入黃金交由機構代管可獲得 30% 年化報酬」。男子準備匯款 100 萬元時，經員警說明後醒悟並停止匯款。",
    link: "https://news.google.com/rss/articles/CBMiaEFVX3lxTE0tcWc3S3ZTWmJYWGhsbzA1a3ZVaF_aSS1KX1lpcC1xODVxTk90Q0c3N3dsMGpmbHBhV2czY2pCMTVNWGt4R1BBQi1NaGc1UkpxNTRIQVIwbEhoblItaEx5eGtVdnBzdG5C?oc=5",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
  {
    id: "46",
    type: "UDN",
    title: "調查局破洗錢255億 會計師、銀行人士涉詐情形加深",
    date: "2026-06-26",
    summary: "【白領犯罪專案】\n調查局破獲大規模洗錢水房，涉案金額高達 255 億元。調查發現有不法會計師與銀行從業人員涉嫌開立人頭公司戶並提供規避洗錢防制審查之指導，檢調正擴大偵辦中。",
    link: "https://news.google.com/rss/articles/CBMiU0FVX3lxTE9Va1oxMnFDbTV6b3ZrR0IxY2JCVlZCRDhXNjNpODFoWnYwWGFVQlR6OExfa09lLUpfVXBxZmw0YjR3YmJIREplaGFnU1lQM3JObTB30gFYQVVfeXFMTkFPNkRpTXpZWVY1cnpwNWNHVUpScGpfZUNuUDZLVG10dzRVOW1sa3liNnNpMU5GVjFVV09Ga0NPYTRlTlRqT0U4d21LYldjVVdpSVVPeElzQQ?oc=5",
    img: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=400",
  },
  {
    id: "47",
    type: "PChome",
    title: "愛用手機付款嗎？新詐騙手法4提醒3不原則",
    date: "2026-07-05",
    summary: "【行動支付防詐】\n專家提出行動支付「四提醒、三不原則」：不點陌生連結、不透漏 OTP 簡訊碼、不轉帳給陌生賣家；提醒定期檢查綁定裝置、設定交易額度上限、開啟消費即時通知。",
    link: "https://news.google.com/rss/articles/CBMigAFBVV95cUxOZTdyQzlSVlpEaGhkdGEtbkdrUnlXM3hIdVRVVDB1b2Z1VjRGeHlOdU1DR0FPUnRmS1NtYnJNcWhGaWdKeGpOUk05cXNRWlNwUTNleWsxODZIWFZPNHpTVjNoMFdyc0pmN3V0dEc5U3V6eEkzYUVsTElLczM5NGFtVA?oc=5",
    img: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=400",
  },
  {
    id: "48",
    type: "Yahoo新聞",
    title: "被詐騙錢根本追不回？機房、水房、跨境金流鏈，詐團偏愛「這貨幣」【AI詐騙解碼專題】",
    date: "2026-07-13",
    summary: "【洗錢管道解碼】\n詐騙集團取得詐款後，會在數分鐘內將贓款分流至多個層級的人頭帳戶（水房），最後購買加密貨幣（如泰達幣 USDT）轉至海外冷錢包，造成警方追查金流之極大阻礙。",
    link: "https://news.google.com/rss/articles/CBMiqgRBVV95cUxOVDMyN1hOd0ZVMFcyWE1uWGhRbXJmMmlYQ2dVTW5jek1kUS1TenZnd1NKTFBiWnpnUG5adnAwX0w4VUJycGRRVmpRNU1XZjlzVno4TUdqY2h2Tjc5dHJhWGFlX1VCb3MzRDdUSzNQanBocVVGMmxoQlZJak9ySzdJa0N6TDBfY0RleWNFam5MY0tMNmE4ZFZXbGZVMllKNkljQUFYY1_9Uk40VEM3dG1mdWtmbWNHVnZkY1_4Z1Via01YVDZ1bHViTzM1MmhCVk9nSTdfYjBNNjVYV1BzZ0dZUEZpTUZraUNkRUVPQnNLLUFETXhTR0xuR2wtQVBRaVlnS2JCSjJ6WFFEZmdSdTk4VzlMOHFRbE5hYks4TFlXR01rcWwwV25ibm5GeG5Qc1lacGctOEZtOFFFOVZWMVZ0ODlJQ1ZyTDQ2a0FIRG5zdzMtTjJScW9MUUNhbUxELVBtMGNkUlo4bC1Ma0V3eHZlM1o1UTJPcS02TlY1eXhOSmg2MTVFQzVqRWxiNXh3Wlp5X3lCakdHSjRFMWwwTjlUSENXamhNTXpzZllxdTlGS3NRUlY2cG55RkphaVBOOFF0dnM2VlAxOFI1SXpaWENVRTgtMGZyeTJxa1BhV1Zlb3JZR01FMmNEQ0k3LVl0SzBsdjVvQ0hzRzBGaUtMRzdpLU1hN3d6ZndSM3Q2WThPYlJ2bWlBNW1odUFxQmRfNEJZbzdCM09pMTJuQQ?oc=5",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
  {
    id: "49",
    type: "UDN",
    title: "影／AI變聲戀愛詐騙…檢警逮6公關小姐 月入10萬哭窮 4辣妹降保離去",
    date: "2026-07-03",
    summary: "【變聲科技犯罪】\n檢警破獲利用 AI 變聲軟體進行語音詐騙之機房。該集團聘請公關小姐配合 AI 聲音進行網戀打賞詐騙，月入數十萬元。檢方偵訊後依涉犯加重詐欺罪嫌交保候傳。",
    link: "https://news.google.com/rss/articles/CBMiU0FVX3lxTE9GLU1XZmphOGlOZVdiMkdJLTdabXpUQncxbl_vSUhyMThBSXp3eXVDS2Yzd2NpdzRTWVdHdG9BQ1J6dTlBeS1JTkdQaXFZWnpBRE800gFYQVVfeXFMTXRrOG80bHhxejZzLVhHb0dqdVQwa1J5MllLbDNSZXJQS3gydEFoNGZrN285MnkwV0J4dE1aMnUyUXV2NERDOWZvdkhYQmVMeUNmMFVQbEI1Rg?oc=5",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400",
  },
  {
    id: "50",
    type: "TVBS",
    title: "報過多次詐騙新聞！美資深主播差點被騙光存款 聽到這句才醒",
    date: "2026-07-12",
    summary: "【名人防詐警世】\n美國一名資深電視新聞主播接獲自稱「亞馬遜安全部門」來電，聲称其帳戶遭冒用購買高額商品，並被轉接至假警察。主播在對方要求「提領現金購買 Apple 禮品卡進行核銷」時瞬間醒悟並掛斷通話。\n\n【防詐提醒】\n任何聲稱公務機關或客服要求購買「點數卡/禮品卡」交付者，100% 為詐騙話術！",
    link: "https://news.google.com/rss/articles/CBMiT0FVX3lxTE96dVZRdEJOUWx6ODVKMi1USVRaS2h3MXA4MWpiVHEyTEVleUVHanlEaDlKQzBoTjg5dGZmcG1oTnEzWEEwSFZBV25kU1VtVlE?oc=5",
    img: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=400",
  }
];

export default function NewsList() {
  const router = useRouter();

  // 🚀 點擊帶着新聞 id 跳轉到 App 內的防詐 AI 統整詳情頁
  const handleNewsPress = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* 頂部 Header */}
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

      {/* 新聞列表區塊 */}
      <ScrollView contentContainerStyle={styles.container}>
        {ALL_NEWS_DATA.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.newsCard}
            activeOpacity={0.75}
            onPress={() => handleNewsPress(item.id)}
          >
            {/* 左側圖片 */}
            <Image source={{ uri: item.img }} style={styles.newsImage} />

            {/* 右側內容 */}
            <View style={styles.newsContent}>
              <View style={styles.tagRow}>
                <Text style={styles.typeTag}>{item.type}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.newsSummary} numberOfLines={2}>
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
  safe: { flex: 1, backgroundColor: "#ffffff" },
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
  backButton: {
    paddingVertical: 8,
    width: 60,
    justifyContent: "center",
  },
  placeholder: { width: 60 },
  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },
  container: { padding: 16 },
  newsCard: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingBottom: 16,
  },
  newsImage: {
    width: 100,
    height: 100,
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
    marginBottom: 2,
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