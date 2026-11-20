const TERMS = [
 {
  "id": "term_001",
  "word_en": "RAG",
  "word_zh": "檢索增強生成",
  "full_name": "Retrieval-Augmented Generation",
  "definition": "結合檢索系統與大語言模型的技術，讓 AI 先去外部知識庫查資料，再根據查到的內容回答，降低胡說八道的機率。",
  "category": [
   "人工智慧"
  ],
  "application_scenarios": [
   "企業內部知識庫",
   "文件問答",
   "客服機器人",
   "技術文件助手",
   "AI搜尋引擎"
  ],
  "example_sentence": "這家公司想做內部資料庫問答，建議用 RAG 架構來降低 AI 幻覺。",
  "related_terms": [
   "term_002",
   "term_003",
   "term_031"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "檢索增強生成",
    "slang": [
     "RAG 架構",
     "接 RAG",
     "檢索增強"
    ],
    "dialogue": "我們的客服機器人會接 RAG，回答前先去知識庫找資料。"
   },
   "one_liner": "RAG 就像是給 AI 一本「開卷考試的參考書」。它不改變 LLM 本身的模型參數，而是在回答前先去搜尋企業內部的資料庫，把相關文件貼給 AI 當作參考答案，藉此解決 AI 亂講話（幻覺）與資料時效性的問題。",
   "versus": {
    "title": "RAG 🆚 Fine-tuning",
    "left_title": "RAG（檢索增強生成）",
    "right_title": "Fine-tuning（微調）",
    "rows": [
     {
      "label": "是否改模型參數",
      "left": "不改，回答前先查外部資料",
      "right": "會用領域資料再訓練模型參數"
     },
     {
      "label": "資料更新",
      "left": "更新知識庫即可，較即時",
      "right": "重新訓練才能反映新資料"
     },
     {
      "label": "成本",
      "left": "較低，適合企業知識問答",
      "right": "較高，需要資料與算力"
     },
     {
      "label": "白話比喻",
      "left": "給 AI 一本參考書，開卷考試",
      "right": "送 AI 去上公司內部訓練課程"
     }
    ]
   }
  }
 },
 {
  "id": "term_002",
  "word_en": "LLM",
  "word_zh": "大型語言模型",
  "full_name": "Large Language Model",
  "definition": "用海量文字訓練出來的 AI 模型，可以理解和生成人類語言，例如 ChatGPT 背後的模型。",
  "category": [
   "人工智慧"
  ],
  "application_scenarios": [
   "聊天機器人",
   "文件問答",
   "程式碼助手",
   "翻譯",
   "客服機器人"
  ],
  "example_sentence": "老師說這個作業可以用 LLM 輔助寫程式，但要自己看得懂。",
  "related_terms": [
   "term_001",
   "term_003"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "大型語言模型",
    "slang": [
     "大模型",
     "LLM 模型",
     "跑 LLM"
    ],
    "dialogue": "這個功能不用自己訓模型，直接接 LLM API 就好。"
   },
   "one_liner": "LLM 就像一個讀過海量書籍、很會接話的實習生，你給它提示，它就能生成看起來合理的答案，但不保證正確。",
   "versus": null
  }
 },
 {
  "id": "term_003",
  "word_en": "Embedding",
  "word_zh": "向量嵌入",
  "full_name": "Embedding",
  "definition": "把文字、圖片轉成一串數字向量，讓電腦可以計算語意相似度，是搜尋引擎和 RAG 的基礎。",
  "category": [
   "人工智慧"
  ],
  "application_scenarios": [
   "AI搜尋引擎",
   "文件問答",
   "推薦系統",
   "語意搜尋"
  ],
  "example_sentence": "把技術文件都轉成 Embedding 存起來，使用者一問就能找到最相關的段落。",
  "related_terms": [
   "term_001",
   "term_002"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "向量嵌入",
    "slang": [
     "embed 一下",
     "轉向量",
     "打向量"
    ],
    "dialogue": "文件先 embed 成向量，存進 Vector DB 才能做語意搜尋。"
   },
   "one_liner": "Embedding 就像把一段文字轉成座標，意思相近的文字會落在附近，電腦就能用距離判斷它們像不像。",
   "versus": null
  }
 },
 {
  "id": "term_004",
  "word_en": "Deadlock",
  "word_zh": "死結",
  "full_name": "Deadlock",
  "definition": "兩個以上的進程互相等待對方釋放資源，結果誰都動不了，就像兩個人在窄巷互不相讓。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "多執行緒程式",
   "資料庫交易",
   "面試常考題",
   "系統設計"
  ],
  "example_sentence": "面試被問到 Deadlock 的四個必要條件，你答得出來嗎？",
  "related_terms": [
   "term_005",
   "term_006",
   "term_007"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "死結",
    "slang": [
     "卡死",
     "死鎖",
     "互相等"
    ],
    "dialogue": "服務突然全部卡住，看起來是兩把鎖互相等待造成 Deadlock。"
   },
   "one_liner": "死結就像兩個人在狹窄通道面對面相遇，兩個人都在等對方讓路，結果誰都不肯退，最後大家都卡住無法繼續前進。",
   "versus": null
  }
 },
 {
  "id": "term_005",
  "word_en": "Process",
  "word_zh": "行程 / 進程",
  "full_name": "Process",
  "definition": "作業系統中執行中的程式單位，有自己獨立的記憶體空間。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "作業系統課程",
   "多工處理",
   "系統程式設計"
  ],
  "example_sentence": "開工作管理員看到的每一個 Chrome 分頁，背後都是一個 Process。",
  "related_terms": [
   "term_006",
   "term_004"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "行程 / 進程",
    "slang": [
     "開 process",
     "Process 爆掉",
     "多開一個 process"
    ],
    "dialogue": "這個工作太吃 CPU，乾脆多開一個 Process 隔離。"
   },
   "one_liner": "Process 就像一間獨立工廠，有自己的廠房、倉庫和資源，倒閉了也不會影響隔壁工廠。",
   "versus": {
    "title": "Process (進程) 🆚 Thread (線程)",
    "left_title": "Process (進程)",
    "right_title": "Thread (線程)",
    "rows": [
     {
      "label": "核心定義",
      "left": "作業系統分配資源（記憶體）的最小單位",
      "right": "CPU 排程與執行的最小單位"
     },
     {
      "label": "記憶體共享",
      "left": "彼此獨立，無法直接存取對方記憶體",
      "right": "同一 Process 內的 Thread 共享記憶體"
     },
     {
      "label": "崩潰影響",
      "left": "一個 Process 崩潰，不影響其他 Process",
      "right": "一個 Thread 崩潰，可能拖垮整個 Process"
     },
     {
      "label": "白話比喻",
      "left": "一間工廠，擁有獨立空間與資源",
      "right": "工廠裡的一條產線，共用廠房與倉庫"
     }
    ]
   }
  }
 },
 {
  "id": "term_006",
  "word_en": "Thread",
  "word_zh": "執行緒",
  "full_name": "Thread",
  "definition": "比 Process 更小的執行單位，同一個 Process 內的 Thread 共享記憶體，切換速度更快。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "多執行緒程式",
   "遊戲開發",
   "伺服器併發處理"
  ],
  "example_sentence": "下載軟體一邊下載、一邊顯示進度條，就是多 Thread 在工作。",
  "related_terms": [
   "term_005",
   "term_007",
   "term_008"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "執行緒",
    "slang": [
     "開 thread",
     "多執行緒",
     "thread 卡住"
    ],
    "dialogue": "這個下載任務丟到背景 Thread，不要卡住主畫面。"
   },
   "one_liner": "Thread 就像同一間工廠裡的多條產線，大家共用廠房和倉庫，動作快但一個產線出事可能拖累全廠。",
   "versus": {
    "title": "Process (進程) 🆚 Thread (線程)",
    "left_title": "Process (進程)",
    "right_title": "Thread (線程)",
    "rows": [
     {
      "label": "核心定義",
      "left": "作業系統分配資源（記憶體）的最小單位",
      "right": "CPU 排程與執行的最小單位"
     },
     {
      "label": "記憶體共享",
      "left": "彼此獨立，無法直接存取對方記憶體",
      "right": "同一 Process 內的 Thread 共享記憶體"
     },
     {
      "label": "崩潰影響",
      "left": "一個 Process 崩潰，不影響其他 Process",
      "right": "一個 Thread 崩潰，可能拖垮整個 Process"
     },
     {
      "label": "白話比喻",
      "left": "一間工廠，擁有獨立空間與資源",
      "right": "工廠裡的一條產線，共用廠房與倉庫"
     }
    ]
   }
  }
 },
 {
  "id": "term_007",
  "word_en": "Mutex",
  "word_zh": "互斥鎖",
  "full_name": "Mutual Exclusion",
  "definition": "保護共享資源的鎖，一次只允許一個 Thread 進入，避免資料被同時改壞。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "多執行緒程式",
   "併發控制",
   "面試常考題"
  ],
  "example_sentence": "兩個 Thread 同時寫同一個變數會出錯，記得加 Mutex。",
  "related_terms": [
   "term_008",
   "term_004"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "互斥鎖",
    "slang": [
     "上鎖",
     "加鎖",
     "lock 住"
    ],
    "dialogue": "這段共享變數記得加 Mutex，不然兩個 Thread 會同時改壞。"
   },
   "one_liner": "Mutex 就像廁所的門鎖，一次只讓一個人進去，其他人只能在外面排隊等鑰匙。",
   "versus": {
    "title": "Mutex 🆚 Semaphore",
    "left_title": "Mutex（互斥鎖）",
    "right_title": "Semaphore（號誌量）",
    "rows": [
     {
      "label": "控制數量",
      "left": "一次只允許一個 Thread 進入",
      "right": "可設定同時允許 N 個 Thread 進入"
     },
     {
      "label": "擁有權",
      "left": "有擁有者，誰上鎖誰解鎖",
      "right": "通常沒有擁有者，只做計數控制"
     },
     {
      "label": "適用場景",
      "left": "保護單一共享變數",
      "right": "連線池、停車場車位、資源數量控管"
     },
     {
      "label": "白話比喻",
      "left": "廁所門鎖，一次一個人",
      "right": "停車場剩餘車位燈號，有空位就放行"
     }
    ]
   }
  }
 },
 {
  "id": "term_008",
  "word_en": "Semaphore",
  "word_zh": "號誌量",
  "full_name": "Semaphore",
  "definition": "比 Mutex 更通用的同步工具，可以控制同時進入臨界區的數量，例如停車場空位計數。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "併發控制",
   "資源池管理",
   "作業系統課程"
  ],
  "example_sentence": "連線池只允許 10 個連線，就用 Semaphore 來控管。",
  "related_terms": [
   "term_007",
   "term_006"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "號誌量",
    "slang": [
     "號誌",
     "放令牌",
     "限流"
    ],
    "dialogue": "連線池只有十個位子，用 Semaphore 控制同時最多十個連線。"
   },
   "one_liner": "Semaphore 就像停車場的剩餘車位燈號，車位滿了就擋住入口，有一台車離開才再放一台進來。",
   "versus": {
    "title": "Mutex 🆚 Semaphore",
    "left_title": "Mutex（互斥鎖）",
    "right_title": "Semaphore（號誌量）",
    "rows": [
     {
      "label": "控制數量",
      "left": "一次只允許一個 Thread 進入",
      "right": "可設定同時允許 N 個 Thread 進入"
     },
     {
      "label": "擁有權",
      "left": "有擁有者，誰上鎖誰解鎖",
      "right": "通常沒有擁有者，只做計數控制"
     },
     {
      "label": "適用場景",
      "left": "保護單一共享變數",
      "right": "連線池、停車場車位、資源數量控管"
     },
     {
      "label": "白話比喻",
      "left": "廁所門鎖，一次一個人",
      "right": "停車場剩餘車位燈號，有空位就放行"
     }
    ]
   }
  }
 },
 {
  "id": "term_009",
  "word_en": "Virtual Memory",
  "word_zh": "虛擬記憶體",
  "full_name": "Virtual Memory",
  "definition": "讓程式以為自己有很大記憶體的技術，OS 會在實體記憶體和硬碟之間搬資料。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "作業系統課程",
   "效能調校",
   "系統設計"
  ],
  "example_sentence": "電腦 RAM 不夠時會變慢，就是因為一直在用 Virtual Memory 交換。",
  "related_terms": [
   "term_010",
   "term_005"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "虛擬記憶體",
    "slang": [
     "吃 swap",
     "記憶體交換",
     "VM 不夠"
    ],
    "dialogue": "程式記憶體一直漲，最後開始用 Virtual Memory 交換就變超慢。"
   },
   "one_liner": "Virtual Memory 就像書桌太小，把不常用的書先放到書櫃，需要時再拿回來，讓你有「桌子很大」的錯覺。",
   "versus": null
  }
 },
 {
  "id": "term_010",
  "word_en": "Cache",
  "word_zh": "快取",
  "full_name": "Cache",
  "definition": "把常用的資料放在離 CPU 最近、最快的地方，之後就不用再去慢速的地方拿。",
  "category": [
   "作業系統",
   "計算機網路"
  ],
  "application_scenarios": [
   "網頁加速",
   "資料庫優化",
   "CPU設計",
   "CDN"
  ],
  "example_sentence": "網頁第二次開比較快，就是因為瀏覽器 Cache 了圖片。",
  "related_terms": [
   "term_009",
   "term_033"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "快取",
    "slang": [
     "快取",
     "cache 住",
     "清 cache"
    ],
    "dialogue": "這個 API 太慢，先加一層 Cache，重複查詢就不用再打資料庫。"
   },
   "one_liner": "Cache 就像把常用的工具放在手邊的工具袋，不用每次跑回倉庫拿，速度快很多。",
   "versus": null
  }
 },
 {
  "id": "term_011",
  "word_en": "API",
  "word_zh": "應用程式介面",
  "full_name": "Application Programming Interface",
  "definition": "軟體之間溝通的約定，前端透過 API 跟後端要資料。",
  "category": [
   "軟體工程",
   "計算機網路"
  ],
  "application_scenarios": [
   "前後端串接",
   "第三方登入",
   "APP開發",
   "面試必考"
  ],
  "example_sentence": "串接天氣 API，就可以在你的 APP 顯示即時天氣。",
  "related_terms": [
   "term_012",
   "term_032",
   "term_013"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "應用程式介面",
    "slang": [
     "串 API",
     "打 API",
     "API 掛了"
    ],
    "dialogue": "前端直接打這支 API 拿使用者資料，不用自己碰資料庫。"
   },
   "one_liner": "API 就像餐廳的點餐窗口，你不用進廚房，只要照規矩點餐，廚房就把結果送出來。",
   "versus": null
  }
 },
 {
  "id": "term_012",
  "word_en": "REST",
  "word_zh": "表現層狀態轉換",
  "full_name": "Representational State Transfer",
  "definition": "設計 API 的一種風格，用 HTTP 的 GET/POST/PUT/DELETE 對應查/增/改/刪。",
  "category": [
   "軟體工程",
   "計算機網路"
  ],
  "application_scenarios": [
   "後端開發",
   "前後端串接",
   "系統設計"
  ],
  "example_sentence": "這份 REST API 文件寫 GET /users 就是查詢使用者列表。",
  "related_terms": [
   "term_011",
   "term_013"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "表現層狀態轉換",
    "slang": [
     "RESTful",
     "走 REST",
     "REST API"
    ],
    "dialogue": "這支服務照 REST 設計，GET /users 查列表、POST /users 建使用者。"
   },
   "one_liner": "REST 就像一套點餐規則：看菜單用 GET、加點用 POST、改餐點用 PUT、取消用 DELETE，大家一看就懂。",
   "versus": null
  }
 },
 {
  "id": "term_013",
  "word_en": "HTTP",
  "word_zh": "超文本傳輸協定",
  "full_name": "HyperText Transfer Protocol",
  "definition": "瀏覽器跟網站伺服器講話的語言，負責請求跟回應網頁內容。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "網頁開發",
   "爬蟲",
   "後端開發",
   "面試必考"
  ],
  "example_sentence": "上課老師說 HTTP 是無狀態的，所以才需要 Cookie 來記住登入。",
  "related_terms": [
   "term_012",
   "term_014",
   "term_017"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "超文本傳輸協定",
    "slang": [
     "打 HTTP",
     "HTTP 請求",
     "status code"
    ],
    "dialogue": "這支 API 回 500，先看 HTTP status code 再查後端 log。"
   },
   "one_liner": "HTTP 就像寄信格式，信封上寫好網址和方法，伺服器收到後回你一封信和狀態碼。",
   "versus": null
  }
 },
 {
  "id": "term_014",
  "word_en": "DNS",
  "word_zh": "網域名稱系統",
  "full_name": "Domain Name System",
  "definition": "把 google.com 這種網址翻譯成 IP 位址的電話簿系統。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "網站部署",
   "網路除錯",
   "系統設計"
  ],
  "example_sentence": "網站打不開，先 ping 一下看看是不是 DNS 掛了。",
  "related_terms": [
   "term_013",
   "term_015"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "網域名稱系統",
    "slang": [
     "DNS 沒解",
     "查 DNS",
     "網域設定"
    ],
    "dialogue": "網站打不開先查 DNS，搞不好是網域根本沒指到正確 IP。"
   },
   "one_liner": "DNS 就像電話簿，你講得出「google.com」這個名字，它幫你查到對應的 IP 電話號碼。",
   "versus": null
  }
 },
 {
  "id": "term_015",
  "word_en": "TCP",
  "word_zh": "傳輸控制協定",
  "full_name": "Transmission Control Protocol",
  "definition": "可靠的傳輸協定，會確認對方有收到，遺失會重傳，適合傳檔案、開網頁。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "網路程式設計",
   "視訊通話",
   "面試常考題",
   "系統設計"
  ],
  "example_sentence": "TCP 三向交握是面試網路題的開場白。",
  "related_terms": [
   "term_016",
   "term_013"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "傳輸控制協定",
    "slang": [
     "走 TCP",
     "TCP 連線",
     "三向交握"
    ],
    "dialogue": "這個服務要求不能掉資料，所以走 TCP，不要用 UDP。"
   },
   "one_liner": "TCP 就像掛號信，寄出後會確認對方收到，沒收到就重寄，保證資料完整到達。",
   "versus": {
    "title": "TCP 🆚 UDP",
    "left_title": "TCP",
    "right_title": "UDP",
    "rows": [
     {
      "label": "可靠性",
      "left": "會確認對方收到，遺失會重傳",
      "right": "不確認對方是否收到，可能掉包"
     },
     {
      "label": "速度",
      "left": "較慢，但資料完整",
      "right": "較快，適合即時應用"
     },
     {
      "label": "適用場景",
      "left": "網頁、檔案傳輸、資料庫連線",
      "right": "遊戲、直播、語音通話"
     },
     {
      "label": "白話比喻",
      "left": "掛號信，會確認簽收",
      "right": "廣播，講出去就不管了"
     }
    ]
   }
  }
 },
 {
  "id": "term_016",
  "word_en": "UDP",
  "word_zh": "使用者資料包協定",
  "full_name": "User Datagram Protocol",
  "definition": "快速但不可靠的傳輸協定，不管對方有沒有收到，適合遊戲、直播這種即時應用。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "線上遊戲",
   "直播",
   "語音通話",
   "DNS查詢"
  ],
  "example_sentence": "打遊戲會 Lag，有時候就是 UDP 封包掉了。",
  "related_terms": [
   "term_015",
   "term_017"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "使用者資料包協定",
    "slang": [
     "走 UDP",
     "UDP 封包",
     "掉包"
    ],
    "dialogue": "遊戲重視即時性，寧可偶爾掉包也不要等重傳，所以走 UDP。"
   },
   "one_liner": "UDP 就像廣播，講出去就不管了，速度快但可能有人沒聽到。",
   "versus": {
    "title": "TCP 🆚 UDP",
    "left_title": "TCP",
    "right_title": "UDP",
    "rows": [
     {
      "label": "可靠性",
      "left": "會確認對方收到，遺失會重傳",
      "right": "不確認對方是否收到，可能掉包"
     },
     {
      "label": "速度",
      "left": "較慢，但資料完整",
      "right": "較快，適合即時應用"
     },
     {
      "label": "適用場景",
      "left": "網頁、檔案傳輸、資料庫連線",
      "right": "遊戲、直播、語音通話"
     },
     {
      "label": "白話比喻",
      "left": "掛號信，會確認簽收",
      "right": "廣播，講出去就不管了"
     }
    ]
   }
  }
 },
 {
  "id": "term_017",
  "word_en": "WebSocket",
  "word_zh": "網頁即時通訊協定",
  "full_name": "WebSocket",
  "definition": "讓瀏覽器和伺服器保持長連線、可以互相即時推訊息的技術。",
  "category": [
   "計算機網路",
   "軟體工程"
  ],
  "application_scenarios": [
   "聊天室",
   "即時遊戲",
   "股票報價",
   "客服機器人"
  ],
  "example_sentence": "做線上聊天室不要一直 polling，直接用 WebSocket 比較省資源。",
  "related_terms": [
   "term_013",
   "term_011"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "網頁即時通訊協定",
    "slang": [
     "開 WS",
     "長連線",
     "即時推播"
    ],
    "dialogue": "聊天室不要一直 polling，直接開 WebSocket 讓伺服器主動推訊息。"
   },
   "one_liner": "WebSocket 就像電話熱線，雙方一旦接通就能隨時互相講話，不用每次重新撥號。",
   "versus": null
  }
 },
 {
  "id": "term_018",
  "word_en": "Load Balancer",
  "word_zh": "負載平衡器",
  "full_name": "Load Balancer",
  "definition": "把湧入的使用者請求平均分配給多台伺服器，避免某一台被操爆。",
  "category": [
   "計算機網路",
   "軟體工程"
  ],
  "application_scenarios": [
   "系統設計",
   "高流量網站",
   "面試常考題",
   "雲端部署"
  ],
  "example_sentence": "雙十一流量太大，前面一定要加 Load Balancer 擋著。",
  "related_terms": [
   "term_033",
   "term_029"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "負載平衡器",
    "slang": [
     "掛 LB",
     "負載平衡",
     "分流"
    ],
    "dialogue": "流量進來先過 Load Balancer，再分給後面三台伺服器。"
   },
   "one_liner": "Load Balancer 就像百貨公司的分流人員，把客人平均帶到不同櫃台，避免某一櫃排到爆。",
   "versus": null
  }
 },
 {
  "id": "term_019",
  "word_en": "Latency",
  "word_zh": "延遲",
  "full_name": "Latency",
  "definition": "從發出請求到收到回應的時間，越低代表反應越快。",
  "category": [
   "計算機網路",
   "軟體工程"
  ],
  "application_scenarios": [
   "遊戲優化",
   "API效能",
   "系統設計",
   "使用者體驗"
  ],
  "example_sentence": "老師說 Latency 和 Throughput 要一起看，不能只看一個。",
  "related_terms": [
   "term_020",
   "term_018"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "延遲",
    "slang": [
     "延遲高",
     "latency 爆",
     "慢半拍"
    ],
    "dialogue": "使用者說很卡，先量一下 API Latency 是網路慢還是資料庫慢。"
   },
   "one_liner": "Latency 就像你按下服務鈴到服務生出現的時間，越短代表反應越快。",
   "versus": {
    "title": "Latency 🆚 Throughput",
    "left_title": "Latency（延遲）",
    "right_title": "Throughput（吞吐量）",
    "rows": [
     {
      "label": "核心定義",
      "left": "從送出請求到收到回應的時間",
      "right": "單位時間內系統能處理的請求量"
     },
     {
      "label": "關注重點",
      "left": "單次反應快不快",
      "right": "整體能扛多少流量"
     },
     {
      "label": "常見單位",
      "left": "毫秒（ms）",
      "right": "RPS / QPS"
     },
     {
      "label": "白話比喻",
      "left": "服務生多久來一次",
      "right": "整間餐廳一小時能服務多少客人"
     }
    ]
   }
  }
 },
 {
  "id": "term_020",
  "word_en": "Throughput",
  "word_zh": "吞吐量",
  "full_name": "Throughput",
  "definition": "單位時間內系統能處理多少請求，例如每秒 1000 個請求。",
  "category": [
   "計算機網路",
   "軟體工程"
  ],
  "application_scenarios": [
   "效能測試",
   "系統設計",
   "資料庫優化"
  ],
  "example_sentence": "壓測報告寫 Throughput 是 5000 RPS，代表每秒可扛 5000 请求。",
  "related_terms": [
   "term_019",
   "term_010"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "吞吐量",
    "slang": [
     "扛多少 QPS",
     "吞吐量",
     "RPS"
    ],
    "dialogue": "壓測報告說 Throughput 有 5000 RPS，但 Latency 也不能太差。"
   },
   "one_liner": "Throughput 就像高速公路每小時能通過多少輛車，數字越大代表系統越能消化流量。",
   "versus": {
    "title": "Latency 🆚 Throughput",
    "left_title": "Latency（延遲）",
    "right_title": "Throughput（吞吐量）",
    "rows": [
     {
      "label": "核心定義",
      "left": "從送出請求到收到回應的時間",
      "right": "單位時間內系統能處理的請求量"
     },
     {
      "label": "關注重點",
      "left": "單次反應快不快",
      "right": "整體能扛多少流量"
     },
     {
      "label": "常見單位",
      "left": "毫秒（ms）",
      "right": "RPS / QPS"
     },
     {
      "label": "白話比喻",
      "left": "服務生多久來一次",
      "right": "整間餐廳一小時能服務多少客人"
     }
    ]
   }
  }
 },
 {
  "id": "term_021",
  "word_en": "Recursion",
  "word_zh": "遞迴",
  "full_name": "Recursion",
  "definition": "函式自己呼叫自己的寫法，一定要記得寫終止條件，不然會無窮迴圈。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "資料結構課程",
   "演算法面試",
   "樹狀結構走訪"
  ],
  "example_sentence": "寫費氏數列最直覺的就是 Recursion，但考試會考你怎麼優化。",
  "related_terms": [
   "term_022"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "遞迴",
    "slang": [
     "遞迴下去",
     "遞迴爆掉",
     "recursive"
    ],
    "dialogue": "這棵樹用 Recursion 走訪最直覺，但記得寫終止條件。"
   },
   "one_liner": "Recursion 就像俄羅斯娃娃，打開一層裡面還有一層，直到最小那個不能再開為止。",
   "versus": null
  }
 },
 {
  "id": "term_022",
  "word_en": "Polymorphism",
  "word_zh": "多型",
  "full_name": "Polymorphism",
  "definition": "物件導向三大特性之一，同一個方法在不同物件上有不同行為，例如狗叫跟貓叫都是叫聲但聲音不同。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "物件導向課程",
   "Java考試",
   "面試必考",
   "框架設計"
  ],
  "example_sentence": "老師上課講 Polymorphism 聽不懂？記住：同一個介面，不同實作。",
  "related_terms": [
   "term_021",
   "term_011"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "多型",
    "slang": [
     "多型",
     "同一個介面",
     "override"
    ],
    "dialogue": "這裡用 Polymorphism，不同付款方式都實作同一個 pay() 介面。"
   },
   "one_liner": "Polymorphism 就像同一個「叫聲」指令，狗執行出來是汪汪，貓執行出來是喵喵，介面一樣但行為不同。",
   "versus": null
  }
 },
 {
  "id": "term_023",
  "word_en": "ORM",
  "word_zh": "物件關聯對映",
  "full_name": "Object-Relational Mapping",
  "definition": "讓你不用寫 SQL，用程式語言的物件就能操作資料庫的工具，例如 Django ORM。",
  "category": [
   "軟體工程",
   "資料庫"
  ],
  "application_scenarios": [
   "後端開發",
   "快速開發",
   "專題實作"
  ],
  "example_sentence": "用 ORM 一行 User.objects.all() 就查出所有使用者，不用寫 SELECT。",
  "related_terms": [
   "term_024",
   "term_025"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "物件關聯對映",
    "slang": [
     "用 ORM",
     "ORM 查",
     "少寫 SQL"
    ],
    "dialogue": "這張表用 ORM 操作就好，除非效能有問題再手寫 SQL。"
   },
   "one_liner": "ORM 就像翻譯機，你用程式語言的物件講話，它幫你翻成 SQL 跟資料庫溝通。",
   "versus": null
  }
 },
 {
  "id": "term_024",
  "word_en": "Index",
  "word_zh": "索引",
  "full_name": "Database Index",
  "definition": "資料庫的目錄，加了之後查詢變超快，但寫入會變慢一點，要取捨。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "資料庫優化",
   "效能調校",
   "面試常考題"
  ],
  "example_sentence": "查詢 100 萬筆資料要 3 秒？幫常用欄位加個 Index 試試。",
  "related_terms": [
   "term_025",
   "term_023"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "索引",
    "slang": [
     "加索引",
     "index 沒走",
     "走索引"
    ],
    "dialogue": "這條查詢慢成這樣，先看有沒有走 Index，不要全表掃描。"
   },
   "one_liner": "Index 就像書本的目錄，找資料時先翻目錄直接跳到那一頁，不用從第一頁慢慢找。",
   "versus": null
  }
 },
 {
  "id": "term_025",
  "word_en": "Transaction",
  "word_zh": "交易",
  "full_name": "Transaction",
  "definition": "資料庫的一組操作，要嘛全部成功，要嘛全部失敗，例如轉帳不能只扣款不入帳。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "銀行轉帳",
   "電商下單",
   "資料庫課程",
   "面試必考"
  ],
  "example_sentence": "電商下單要扣庫存又要建訂單，這兩步一定要包在同一個 Transaction。",
  "related_terms": [
   "term_026",
   "term_004"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "交易",
    "slang": [
     "包交易",
     "rollback",
     "commit"
    ],
    "dialogue": "扣庫存和建訂單要包在同一個 Transaction，失敗就一起 rollback。"
   },
   "one_liner": "Transaction 就像轉帳，扣款和入帳必須一起成功，不能只扣了錢卻沒進對方帳戶。",
   "versus": null
  }
 },
 {
  "id": "term_026",
  "word_en": "Normalization",
  "word_zh": "正規化",
  "full_name": "Normalization",
  "definition": "設計資料庫表格的方法，把重複資料拆開，避免改一個地方、其他地方忘記改。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "資料庫設計",
   "專題實作",
   "考試"
  ],
  "example_sentence": "期中考考第三正規化（3NF），記得先會畫 ER Model。",
  "related_terms": [
   "term_025",
   "term_024"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "正規化",
    "slang": [
     "正規化",
     "拆表",
     "3NF"
    ],
    "dialogue": "這張表重複資料太多，先做 Normalization 拆乾淨再上線。"
   },
   "one_liner": "Normalization 就像整理衣櫃，把同類衣服放在同一格，避免同樣的東西散落在各處、改了一個地方忘記改另一個。",
   "versus": null
  }
 },
 {
  "id": "term_027",
  "word_en": "CI/CD",
  "word_zh": "持續整合與部署",
  "full_name": "Continuous Integration / Continuous Deployment",
  "definition": "程式一 push 就自動跑測試、自動部署上線，不用人工半夜爬起來發版。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "團隊協作",
   "自動化部署",
   "DevOps",
   "實習工作"
  ],
  "example_sentence": "學長說進公司第一件事就是看懂他們的 CI/CD pipeline。",
  "related_terms": [
   "term_030",
   "term_028"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "持續整合與部署",
    "slang": [
     "跑 CI",
     "CI 掛了",
     "自動部署"
    ],
    "dialogue": "PR 送出去會自動跑 CI，測試過了才允許 merge 和部署。"
   },
   "one_liner": "CI/CD 就像工廠的自動輸送帶，程式一 push 就自動測試、打包、送到線上，不用人工半夜發版。",
   "versus": null
  }
 },
 {
  "id": "term_028",
  "word_en": "Docker",
  "word_zh": "容器",
  "full_name": "Docker",
  "definition": "把程式跟環境包成一個箱子，到哪台電腦跑都一樣，不再有在我電腦可以跑的問題。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "環境建置",
   "專題部署",
   "微服務",
   "實習工作"
  ],
  "example_sentence": "專題 demo 前先 dockerize，不然教授電腦一定跑不起來。",
  "related_terms": [
   "term_029",
   "term_027"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "容器化",
    "slang": [
     "包 Docker",
     "dockerize",
     "容器"
    ],
    "dialogue": "這個服務先 dockerize，確保大家本機和正式環境跑起來一樣。"
   },
   "one_liner": "Docker 就像把程式和它的環境一起裝進一個標準貨櫃，不管搬到哪台機器，打開都能用同樣方式運行。",
   "versus": null
  }
 },
 {
  "id": "term_029",
  "word_en": "Kubernetes",
  "word_zh": "容器編排系統",
  "full_name": "Kubernetes (K8s)",
  "definition": "管理一大堆 Docker 容器的工具，會自動擴容、自動重啟掛掉的服務。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "微服務",
   "雲端部署",
   "系統設計",
   "維運"
  ],
  "example_sentence": "小專題用 Docker 就夠了，K8s 是給大公司上百台機器的。",
  "related_terms": [
   "term_028",
   "term_018"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "容器編排系統",
    "slang": [
     "K8s",
     "丟上 K8s",
     "叢集"
    ],
    "dialogue": "服務變多之後就用 Kubernetes 管，掛掉會自動重啟和擴容。"
   },
   "one_liner": "Kubernetes 就像貨櫃港口的管理系統，自動安排哪個貨櫃放哪裡、壞掉就補一個、忙不過來就多開幾個。",
   "versus": null
  }
 },
 {
  "id": "term_030",
  "word_en": "Git",
  "word_zh": "版本控制",
  "full_name": "Git",
  "definition": "記錄程式碼每一版變化的工具，可以回溯、開分支、跟別人協作不打架。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "團隊協作",
   "專題實作",
   "面試必備",
   "開源貢獻"
  ],
  "example_sentence": "期中考前記得 git commit，不然熬夜寫的 code 噴掉沒人救你。",
  "related_terms": [
   "term_027",
   "term_036"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "版本控制",
    "slang": [
     "commit",
     "push 上去",
     "開分支"
    ],
    "dialogue": "改完先 commit，再 push 到遠端開 PR 給同事 review。"
   },
   "one_liner": "Git 就像遊戲存檔，每個重要進度都能存一版，玩壞了還能讀檔回到上一個安全點。",
   "versus": null
  }
 },
 {
  "id": "term_031",
  "word_en": "Chatbot",
  "word_zh": "聊天機器人",
  "full_name": "Chatbot",
  "definition": "可以跟人對話的程式，現在多半接 LLM，負責回答客服、導購問題。",
  "category": [
   "人工智慧",
   "軟體工程"
  ],
  "application_scenarios": [
   "客服機器人",
   "企業內部知識庫",
   "電商導購",
   "專題實作"
  ],
  "example_sentence": "畢專想做客服機器人？RAG + Chatbot 是最快有成果的組合。",
  "related_terms": [
   "term_001",
   "term_002"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "聊天機器人",
    "slang": [
     "客服 bot",
     "接 bot",
     "機器人"
    ],
    "dialogue": "官網先接一個 Chatbot 擋常見問題，真的解不了再轉真人客服。"
   },
   "one_liner": "Chatbot 就像店門口的接待員，先幫你回答常見問題，複雜的再帶你去櫃台找真人。",
   "versus": null
  }
 },
 {
  "id": "term_032",
  "word_en": "SDK",
  "word_zh": "軟體開發套件",
  "full_name": "Software Development Kit",
  "definition": "別人包好給你用的工具組，例如串金流、接地圖都會給你 SDK。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "APP開發",
   "第三方串接",
   "金流整合"
  ],
  "example_sentence": "要接 LINE 登入，直接載官方 SDK 比自己刻 API 快十倍。",
  "related_terms": [
   "term_011"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "軟體開發套件",
    "slang": [
     "載 SDK",
     "用官方 SDK",
     "包 SDK"
    ],
    "dialogue": "接金流不要自己刻，直接用官方 SDK 比較穩也比較快。"
   },
   "one_liner": "SDK 就像買家具附的工具包，螺絲、板手、說明書都幫你準備好，照著做就能組起來。",
   "versus": null
  }
 },
 {
  "id": "term_033",
  "word_en": "CDN",
  "word_zh": "內容傳遞網路",
  "full_name": "Content Delivery Network",
  "definition": "在全世界放很多快取伺服器，讓使用者都從最近的地方載圖片影片，網站才會快。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "網站加速",
   "影音串流",
   "遊戲更新",
   "高流量網站"
  ],
  "example_sentence": "圖片都丟 CDN，教授從國外開你的網站也不會卡。",
  "related_terms": [
   "term_010",
   "term_018"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "內容傳遞網路",
    "slang": [
     "丟 CDN",
     "走 CDN",
     "CDN 快取"
    ],
    "dialogue": "圖片和影片都丟 CDN，使用者從最近的節點載入才不會慢。"
   },
   "one_liner": "CDN 就像把商品預先放在各地分店，客人不用每次從總倉庫等貨，離家最近的分店直接拿給你。",
   "versus": null
  }
 },
 {
  "id": "term_034",
  "word_en": "Firewall",
  "word_zh": "防火牆",
  "full_name": "Firewall",
  "definition": "擋在網路出入口的守衛，決定哪些封包可以進出，防止駭客入侵。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "資安",
   "伺服器維運",
   "企業網路"
  ],
  "example_sentence": "SSH 連不上？先檢查 Firewall 有沒有開 22 port。",
  "related_terms": [
   "term_035",
   "term_014"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "防火牆",
    "slang": [
     "開 port",
     "擋掉了",
     "防火牆規則"
    ],
    "dialogue": "服務連不上先看 Firewall 有沒有開對應 port。"
   },
   "one_liner": "Firewall 就像社區門口的警衛，檢查誰可以進來、誰不能出去，把可疑人物擋在外面。",
   "versus": null
  }
 },
 {
  "id": "term_035",
  "word_en": "SQL Injection",
  "word_zh": "SQL注入攻擊",
  "full_name": "SQL Injection",
  "definition": "駭客在輸入框塞惡意 SQL，騙資料庫吐出不該給的資料，新手最常犯的漏洞。",
  "category": [
   "資料庫",
   "計算機網路"
  ],
  "application_scenarios": [
   "資安",
   "後端開發",
   "面試常考題",
   "專題審查"
  ],
  "example_sentence": "登入框直接拼字串組 SQL？等著被 SQL Injection 脫庫吧，記得用參數化查詢。",
  "related_terms": [
   "term_023",
   "term_034"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "SQL 注入攻擊",
    "slang": [
     "被注入",
     "脫庫",
     "拼 SQL"
    ],
    "dialogue": "登入查詢不要直接拼字串，不然很容易被 SQL Injection。"
   },
   "one_liner": "SQL Injection 就像有人在點餐單上偷寫「順便把倉庫鑰匙交出來」，如果廚房照單全收，資料就被搬走了。",
   "versus": {
    "title": "SQL Injection 🆚 參數化查詢",
    "left_title": "SQL Injection（注入攻擊）",
    "right_title": "參數化查詢（Prepared Statement）",
    "rows": [
     {
      "label": "風險來源",
      "left": "把使用者輸入直接拼進 SQL 字串",
      "right": "把輸入當成參數，不當成 SQL 指令"
     },
     {
      "label": "攻擊後果",
      "left": "可能被脫庫、刪庫或繞過登入",
      "right": "即使輸入含惡意字串，也只會被當成普通資料"
     },
     {
      "label": "實務做法",
      "left": "禁止字串拼接 SQL",
      "right": "使用 ORM 或 Prepared Statement"
     },
     {
      "label": "白話比喻",
      "left": "客人偷改點餐單，廚房照單全收",
      "right": "點餐單和備註分開寫，廚房不會把備註當指令"
     }
    ]
   }
  }
 },
 {
  "id": "term_036",
  "word_en": "Agile",
  "word_zh": "敏捷開發",
  "full_name": "Agile",
  "definition": "小步快跑的開發方法，每 1-2 週一個 Sprint，不斷 Demo、快速改需求。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "團隊協作",
   "專題管理",
   "實習工作",
   "Scrum"
  ],
  "example_sentence": "專題別想一次做到完美，用 Agile 先做出 MVP 再迭代。",
  "related_terms": [
   "term_030",
   "term_027"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "敏捷開發",
    "slang": [
     "跑 Agile",
     "開 Sprint",
     "迭代"
    ],
    "dialogue": "這個專案用 Agile，每兩週一個 Sprint，做完就 Demo 給客戶看。"
   },
   "one_liner": "Agile 就像邊開車邊調整方向，先小步做出能用的版本，再根據回饋快速修正，而不是一次憋大招。",
   "versus": null
  }
 },
 {
  "id": "term_037",
  "word_en": "Garbage Collection",
  "word_zh": "垃圾回收",
  "full_name": "Garbage Collection (GC)",
  "definition": "程式語言自動幫你清掉沒在用的記憶體，不用自己 free，Java/Python 都有。",
  "category": [
   "軟體工程",
   "作業系統"
  ],
  "application_scenarios": [
   "Java課程",
   "Python開發",
   "效能調校",
   "面試常考題"
  ],
  "example_sentence": "C 語言要自己 malloc/free，Java 靠 Garbage Collection 省很多事。",
  "related_terms": [
   "term_009",
   "term_022"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "垃圾回收",
    "slang": [
     "GC",
     "GC 卡頓",
     "記憶體回收"
    ],
    "dialogue": "服務偶爾會卡一下，可能是 Garbage Collection 在回收大量物件。"
   },
   "one_liner": "Garbage Collection 就像辦公室的自動清潔員，會定期把沒人使用的東西清掉，你不用自己丟垃圾。",
   "versus": null
  }
 },
 {
  "id": "term_038",
  "word_en": "OAuth",
  "word_zh": "開放授權",
  "full_name": "Open Authorization",
  "definition": "用 Google/LINE 帳號一鍵登入的標準，不用把密碼交給第三方網站。",
  "category": [
   "計算機網路",
   "軟體工程"
  ],
  "application_scenarios": [
   "第三方登入",
   "APP開發",
   "資安",
   "會員系統"
  ],
  "example_sentence": "專題登入頁放個 Google OAuth，使用者才懶得再註冊一組帳密。",
  "related_terms": [
   "term_011",
   "term_013"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "開放授權",
    "slang": [
     "OAuth 登入",
     "第三方登入",
     "拿 token"
    ],
    "dialogue": "登入頁接 Google OAuth，使用者不用再註冊一組新帳密。"
   },
   "one_liner": "OAuth 就像用身分證換一張臨時通行證，你不用把身分證交給對方，也能證明你是誰並取得有限權限。",
   "versus": null
  }
 },
 {
  "id": "term_039",
  "word_en": "Compiler",
  "word_zh": "編譯器",
  "full_name": "Compiler",
  "definition": "把你寫的高階語言一次翻成機器碼的程式，C/Java 都要先編譯才能跑。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "程式語言課程",
   "系統程式",
   "效能優化"
  ],
  "example_sentence": "編譯原理被當很慘？先搞懂 Lexer 跟 Parser 在幹嘛。",
  "related_terms": [
   "term_021",
   "term_037"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "編譯器",
    "slang": [
     "編譯",
     "compile 不過",
     "build 失敗"
    ],
    "dialogue": "程式 compile 不過先看型別錯誤，不要急著怪環境。"
   },
   "one_liner": "Compiler 就像翻譯員，把你寫的高階語言整本翻成機器看得懂的指令，翻完才能執行。",
   "versus": null
  }
 },
 {
  "id": "term_040",
  "word_en": "API Gateway",
  "word_zh": "API閘道",
  "full_name": "API Gateway",
  "definition": "微服務架構的大門口，統一管認證、限流、轉發，後面掛幾十個小服務都靠它。",
  "category": [
   "軟體工程",
   "計算機網路"
  ],
  "application_scenarios": [
   "微服務",
   "系統設計",
   "面試常考題"
  ],
  "example_sentence": "系統設計面試畫微服務，記得在前面加一層 API Gateway。",
  "related_terms": [
   "term_011",
   "term_018",
   "term_029"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "API 閘道",
    "slang": [
     "掛 Gateway",
     "統一入口",
     "Gateway 擋"
    ],
    "dialogue": "微服務前面放一層 API Gateway，統一處理認證、限流和轉發。"
   },
   "one_liner": "API Gateway 就像大樓一樓的櫃台，所有訪客先在這裡登記、驗證，再由櫃台帶你到正確的樓層部門。",
   "versus": null
  }
 },
 {
  "id": "term_041",
  "word_en": "Paging",
  "word_zh": "分頁",
  "full_name": "Paging",
  "definition": "作業系統把記憶體切成固定大小的頁框，程式只需載入用到的頁，讓記憶體不足時也能執行大型程式。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "作業系統課程",
   "虛擬記憶體",
   "效能調校",
   "面試常考題"
  ],
  "example_sentence": "程式明明比 RAM 大還能跑，就是 Paging 搭配 Virtual Memory 的功勞。",
  "related_terms": [
   "term_009",
   "term_004"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "分頁",
    "slang": [
     "切 Page",
     "換頁",
     "Page fault"
    ],
    "dialogue": "這個服務記憶體一直爆，先看一下是不是 Paging 太頻繁。"
   },
   "one_liner": "Paging 就像把一本厚書拆成一頁一頁，書桌放不下時只把正在看的那幾頁拿出來，其餘先放書櫃。",
   "versus": null
  }
 },
 {
  "id": "term_042",
  "word_en": "DOM",
  "word_zh": "文件物件模型",
  "full_name": "Document Object Model",
  "definition": "瀏覽器把 HTML 解析成樹狀結構，JavaScript 透過 DOM 讀取或修改網頁內容與樣式。",
  "category": [
   "軟體工程",
   "前端開發"
  ],
  "application_scenarios": [
   "前端開發",
   "網頁互動",
   "框架設計",
   "面試必考"
  ],
  "example_sentence": "用 document.querySelector 抓到按鈕，就是在操作 DOM。",
  "related_terms": [
   "term_043",
   "term_044",
   "term_013"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "文件物件模型",
    "slang": [
     "抓 DOM",
     "DOM 節點",
     "操作 DOM"
    ],
    "dialogue": "這個點擊事件直接操作 DOM 就好，不用整個頁面重繪。"
   },
   "one_liner": "DOM 就像網頁的「骨架地圖」，JavaScript 拿著這張地圖找到任何一個元素，幫它換文字、改顏色或加事件。",
   "versus": null
  }
 },
 {
  "id": "term_043",
  "word_en": "SSR",
  "word_zh": "伺服器端渲染",
  "full_name": "Server-Side Rendering",
  "definition": "伺服器先把 HTML 組好再回傳給瀏覽器，使用者能更快看到內容，也有助於 SEO。",
  "category": [
   "軟體工程",
   "前端開發"
  ],
  "application_scenarios": [
   "前端開發",
   "SEO",
   "網頁效能",
   "面試必考"
  ],
  "example_sentence": "電商商品頁需要 SEO，通常會用 SSR 讓搜尋引擎直接看到完整內容。",
  "related_terms": [
   "term_044",
   "term_013",
   "term_042"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "伺服器端渲染",
    "slang": [
     "伺服器渲染",
     "SSR 直出",
     "走 SSR"
    ],
    "dialogue": "這頁要 SEO，所以我們走 SSR，不要全部丟給瀏覽器渲染。"
   },
   "one_liner": "SSR 就像餐廳先把菜做好端上來，使用者一開頁就能看到完整內容，不用等瀏覽器自己慢慢煮。",
   "versus": {
    "title": "SSR 🆚 CSR",
    "left_title": "SSR（伺服器端渲染）",
    "right_title": "CSR（客戶端渲染）",
    "rows": [
     {
      "label": "畫面產生位置",
      "left": "伺服器先組好 HTML 再回傳",
      "right": "瀏覽器下載 JS 後自己產生畫面"
     },
     {
      "label": "首屏速度",
      "left": "通常較快，使用者更快看到內容",
      "right": "首屏較慢，要等 JS 下載與執行"
     },
     {
      "label": "SEO",
      "left": "較友善，搜尋引擎看得到完整內容",
      "right": "較弱，需要額外處理"
     },
     {
      "label": "白話比喻",
      "left": "餐廳先做好菜再端上來",
      "right": "把食譜和食材送到家，自己動手做"
     }
    ]
   }
  }
 },
 {
  "id": "term_044",
  "word_en": "CSR",
  "word_zh": "客戶端渲染",
  "full_name": "Client-Side Rendering",
  "definition": "瀏覽器先下載 JavaScript，再由前端在瀏覽器裡產生畫面，互動流暢但首屏較慢、SEO 較弱。",
  "category": [
   "軟體工程",
   "前端開發"
  ],
  "application_scenarios": [
   "前端開發",
   "單頁應用",
   "網頁效能",
   "面試必考"
  ],
  "example_sentence": "後台管理系統不需要 SEO，用 CSR 搭配 SPA 開發起來更快。",
  "related_terms": [
   "term_043",
   "term_042",
   "term_013"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "客戶端渲染",
    "slang": [
     "前端渲染",
     "瀏覽器渲染",
     "走 CSR"
    ],
    "dialogue": "這是內部後台，用 CSR 就好，不用為了 SEO 搞 SSR。"
   },
   "one_liner": "CSR 就像把食譜和食材一起送到你家，瀏覽器要自己動手做，做完才看得到完整畫面。",
   "versus": {
    "title": "SSR 🆚 CSR",
    "left_title": "SSR（伺服器端渲染）",
    "right_title": "CSR（客戶端渲染）",
    "rows": [
     {
      "label": "畫面產生位置",
      "left": "伺服器先組好 HTML 再回傳",
      "right": "瀏覽器下載 JS 後自己產生畫面"
     },
     {
      "label": "首屏速度",
      "left": "通常較快，使用者更快看到內容",
      "right": "首屏較慢，要等 JS 下載與執行"
     },
     {
      "label": "SEO",
      "left": "較友善，搜尋引擎看得到完整內容",
      "right": "較弱，需要額外處理"
     },
     {
      "label": "白話比喻",
      "left": "餐廳先做好菜再端上來",
      "right": "把食譜和食材送到家，自己動手做"
     }
    ]
   }
  }
 },
 {
  "id": "term_045",
  "word_en": "Debounce",
  "word_zh": "防抖",
  "full_name": "Debounce",
  "definition": "事件停止後才執行一次，常用在搜尋輸入，避免使用者每打一個字就打一次 API。",
  "category": [
   "軟體工程",
   "前端開發"
  ],
  "application_scenarios": [
   "前端開發",
   "搜尋輸入",
   "效能優化",
   "面試常考題"
  ],
  "example_sentence": "搜尋框用 Debounce 300ms，使用者打完字才送出請求。",
  "related_terms": [
   "term_046",
   "term_011",
   "term_019"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "防抖",
    "slang": [
     "防抖",
     "debounce 一下",
     "延遲送出"
    ],
    "dialogue": "這個搜尋框記得加 debounce，不然每打一個字就打爆後端。"
   },
   "one_liner": "Debounce 就像電梯門，有人一直按著開門鍵它就不會關，等到最後一個人停手後才關門出發。",
   "versus": null
  }
 },
 {
  "id": "term_046",
  "word_en": "Throttle",
  "word_zh": "節流",
  "full_name": "Throttle",
  "definition": "固定時間內最多執行一次，常用在捲動、滑鼠移動等高頻事件，控制執行頻率。",
  "category": [
   "軟體工程",
   "前端開發"
  ],
  "application_scenarios": [
   "前端開發",
   "效能優化",
   "無限捲動",
   "面試常考題"
  ],
  "example_sentence": "監聽 scroll 事件時用 Throttle，每 100ms 最多算一次位置。",
  "related_terms": [
   "term_045",
   "term_019",
   "term_020"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "節流",
    "slang": [
     "節流",
     "限流一下",
     "固定頻率"
    ],
    "dialogue": "這個 scroll 事件太密集，加個 throttle 讓它固定時間才跑一次。"
   },
   "one_liner": "Throttle 就像高速公路的匝道儀控，不管多少車想上來，每隔固定時間只放行一批。",
   "versus": null
  }
 },
 {
  "id": "term_047",
  "word_en": "CORS",
  "word_zh": "跨來源資源共用",
  "full_name": "Cross-Origin Resource Sharing",
  "definition": "瀏覽器的跨來源資源共用機制，伺服器要用回應標頭明確允許，前端才能讀取不同網域的 API。",
  "category": [
   "計算機網路",
   "前端開發",
   "軟體工程"
  ],
  "application_scenarios": [
   "前後端串接",
   "網頁開發",
   "資安",
   "面試必考"
  ],
  "example_sentence": "前端在 localhost:3000 呼叫 localhost:8000 的 API 被擋，通常是 CORS 沒設定。",
  "related_terms": [
   "term_013",
   "term_011",
   "term_034"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "跨來源資源共用",
    "slang": [
     "跨域",
     "CORS 擋住",
     "開 CORS"
    ],
    "dialogue": "API 一直報 CORS 錯誤，請後端把我們的前端網域加進 allow-origin。"
   },
   "one_liner": "CORS 就像社區警衛，瀏覽器預設不讓別的社區的人進來，除非伺服器明確說「這個網域可以通過」。",
   "versus": null
  }
 },
 {
  "id": "term_048",
  "word_en": "ACID",
  "word_zh": "交易四大特性",
  "full_name": "Atomicity, Consistency, Isolation, Durability",
  "definition": "資料庫交易的四大保證：原子性、一致性、隔離性、持久性，確保轉帳等多步驟操作不會只做一半。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "資料庫課程",
   "銀行轉帳",
   "系統設計",
   "面試必考"
  ],
  "example_sentence": "轉帳扣款和入帳要包在同一個交易，才能符合 ACID。",
  "related_terms": [
   "term_025",
   "term_024",
   "term_026"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "交易四大特性",
    "slang": [
     "ACID 四兄弟",
     "交易保證",
     "符合 ACID"
    ],
    "dialogue": "這個扣庫存流程一定要有 ACID，不然超賣會很難查。"
   },
   "one_liner": "ACID 就像銀行轉帳的保證：錢要嘛一起扣、一起進，不會出現扣了卻沒入帳的半套交易。",
   "versus": null
  }
 },
 {
  "id": "term_049",
  "word_en": "Message Queue",
  "word_zh": "訊息佇列",
  "full_name": "Message Queue",
  "definition": "生產者把任務放進佇列，消費者非同步取出處理，用來削峰、解耦與避免請求塞車。",
  "category": [
   "軟體工程",
   "系統設計"
  ],
  "application_scenarios": [
   "微服務",
   "非同步處理",
   "系統設計",
   "面試常考題"
  ],
  "example_sentence": "寄信、轉檔這種慢工作丟進 Message Queue，主流程先回覆使用者。",
  "related_terms": [
   "term_018",
   "term_040",
   "term_019"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "訊息佇列",
    "slang": [
     "丟 Queue",
     "排隊處理",
     "MQ"
    ],
    "dialogue": "這個寄信流程不要卡住下單，直接丟 Message Queue 非同步處理。"
   },
   "one_liner": "Message Queue 就像餐廳的點單夾，櫃台先把單夾上去就讓客人走，廚房再慢慢照順序出餐。",
   "versus": null
  }
 },
 {
  "id": "term_050",
  "word_en": "Vector DB",
  "word_zh": "向量資料庫",
  "full_name": "Vector Database",
  "definition": "專門儲存與搜尋向量資料的資料庫，能依語意相似度找出最相關的文件，是 RAG 的核心元件。",
  "category": [
   "人工智慧",
   "資料庫"
  ],
  "application_scenarios": [
   "AI搜尋引擎",
   "文件問答",
   "RAG",
   "語意搜尋"
  ],
  "example_sentence": "把文件 Embedding 存進 Vector DB，使用者提問時就能找回最相關段落。",
  "related_terms": [
   "term_001",
   "term_003",
   "term_024"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "向量資料庫",
    "slang": [
     "向量庫",
     "Vector DB",
     "存向量"
    ],
    "dialogue": "文件先 embed 後丟進 Vector DB，RAG 才有東西可以檢索。"
   },
   "one_liner": "Vector DB 就像一個依照「意思」而不是「關鍵字」排序的圖書館，你問問題，它會找出語意最接近的書。",
   "versus": null
  }
 },
 {
  "id": "term_051",
  "word_en": "Fine-tuning",
  "word_zh": "微調",
  "full_name": "Fine-tuning",
  "definition": "用特定領域資料繼續訓練既有模型，讓模型更符合企業語氣與任務，但成本比 RAG 高。",
  "category": [
   "人工智慧"
  ],
  "application_scenarios": [
   "AI模型客製",
   "企業導入",
   "RAG",
   "面試常考題"
  ],
  "example_sentence": "想讓模型學會公司客服語氣，可以收集對話資料做 Fine-tuning。",
  "related_terms": [
   "term_002",
   "term_001",
   "term_003"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "微調",
    "slang": [
     "調模型",
     "fine-tune 一下",
     "訓模型"
    ],
    "dialogue": "這個任務用 RAG 就夠了，先別急著花錢 fine-tune 模型。"
   },
   "one_liner": "Fine-tuning 就像讓一個已經會說話的員工去上公司內部訓練，學會你們家的用語和流程。",
   "versus": {
    "title": "RAG 🆚 Fine-tuning",
    "left_title": "RAG（檢索增強生成）",
    "right_title": "Fine-tuning（微調）",
    "rows": [
     {
      "label": "是否改模型參數",
      "left": "不改，回答前先查外部資料",
      "right": "會用領域資料再訓練模型參數"
     },
     {
      "label": "資料更新",
      "left": "更新知識庫即可，較即時",
      "right": "重新訓練才能反映新資料"
     },
     {
      "label": "成本",
      "left": "較低，適合企業知識問答",
      "right": "較高，需要資料與算力"
     },
     {
      "label": "白話比喻",
      "left": "給 AI 一本參考書，開卷考試",
      "right": "送 AI 去上公司內部訓練課程"
     }
    ]
   }
  }
 },
 {
  "id": "term_052",
  "word_en": "Big-O",
  "word_zh": "時間複雜度",
  "full_name": "Big-O Notation",
  "definition": "描述演算法執行時間或空間隨資料量成長的趨勢，例如 O(n)、O(log n)，用來比較效率。",
  "category": [
   "軟體工程",
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "演算法面試",
   "效能分析",
   "考試"
  ],
  "example_sentence": "二分搜尋是 O(log n)，比一筆一筆找的 O(n) 快很多。",
  "related_terms": [
   "term_021",
   "term_053",
   "term_024"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "時間複雜度",
    "slang": [
     "Big O",
     "複雜度",
     "O 多少"
    ],
    "dialogue": "你這個寫法是 O(n²)，資料一大就會炸，能不能降到 O(n log n)？"
   },
   "one_liner": "Big-O 就像在估算「資料變十倍時，工作量會變多快」，讓你知道這個演算法能不能撐到大場面。",
   "versus": null
  }
 },
 {
  "id": "term_053",
  "word_en": "Graph",
  "word_zh": "圖",
  "full_name": "Graph",
  "definition": "由節點與邊組成的資料結構，可表示社群關係、地圖、網路拓撲，常見走訪有 BFS 與 DFS。",
  "category": [
   "軟體工程",
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "演算法面試",
   "社群網路",
   "路徑規劃"
  ],
  "example_sentence": "找朋友的朋友、計算最短路徑，都可以把資料建成 Graph。",
  "related_terms": [
   "term_021",
   "term_052",
   "term_054"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "圖",
    "slang": [
     "建圖",
     "跑圖",
     "Graph 走訪"
    ],
    "dialogue": "這題先把關係建成 graph，再用 BFS 找最短路徑。"
   },
   "one_liner": "Graph 就像一張捷運路線圖，站是節點、軌道是邊，問題變成「怎麼從這站走到那站」。",
   "versus": null
  }
 },
 {
  "id": "term_054",
  "word_en": "Set",
  "word_zh": "集合",
  "full_name": "Set",
  "definition": "不重複元素的集合，支援聯集、交集、差集，常用來去重與快速判斷元素是否存在。",
  "category": [
   "軟體工程",
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "離散數學",
   "演算法面試",
   "去重"
  ],
  "example_sentence": "想知道兩個標籤清單的共同項目，用 Set 取交集最快。",
  "related_terms": [
   "term_053",
   "term_052",
   "term_024"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "集合",
    "slang": [
     "Set 去重",
     "丟進 Set",
     "取交集"
    ],
    "dialogue": "這批 ID 先用 Set 去重，不然後面統計會重複算。"
   },
   "one_liner": "Set 就像一盒不能放重複貼紙的收藏盒，同一張貼紙不管拿幾次來，盒子裡只會有一張。",
   "versus": null
  }
 },
 {
  "id": "term_055",
  "word_en": "Boolean Algebra",
  "word_zh": "布林代數",
  "full_name": "Boolean Algebra",
  "definition": "用 True/False 與 AND、OR、NOT 運算描述邏輯的數學，是數位電路與條件判斷的基礎。",
  "category": [
   "軟體工程",
   "離散數學"
  ],
  "application_scenarios": [
   "離散數學",
   "數位邏輯",
   "程式設計",
   "考試"
  ],
  "example_sentence": "if 條件裡的 && 和 || 優先順序，就是 Boolean Algebra 的應用。",
  "related_terms": [
   "term_054",
   "term_053",
   "term_039"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "布林代數",
    "slang": [
     "布林邏輯",
     "true/false 判斷",
     "化簡條件"
    ],
    "dialogue": "這個權限判斷先用 boolean algebra 化簡，不然 if 會寫到爆。"
   },
   "one_liner": "Boolean Algebra 就像用「是／否」開關組出複雜規則，AND 是兩個開關都要開，OR 是其中一個開就好。",
   "versus": null
  }
 },
 {
  "id": "term_056",
  "word_en": "Deploy",
  "word_zh": "部署",
  "full_name": "Deploy",
  "definition": "把開發完成的程式正式放到伺服器或雲端環境，讓使用者可以開始使用新版本。",
  "category": [
   "軟體工程",
   "DevOps"
  ],
  "application_scenarios": [
   "網站部署",
   "CI/CD",
   "實習工作",
   "面試常考題"
  ],
  "example_sentence": "今天下午要 Deploy 新版本，早上先把資料庫 migration 跑完。",
  "related_terms": [
   "term_027",
   "term_028",
   "term_029"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計",
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "部署",
    "slang": [
     "上版",
     "推上 Production",
     "發版"
    ],
    "dialogue": "我們今天下午三點要 上版 (Deploy)，先不要 merge 程式碼。"
   },
   "one_liner": "Deploy 就像把新版餐點正式放上菜單，客人開始點得到；上線前要先確認廚房真的做得出來，不然就會客訴。",
   "versus": null
  }
 },
 {
  "id": "term_057",
  "word_en": "Pull Request (PR)",
  "word_zh": "合併請求",
  "full_name": "Pull Request",
  "definition": "請團隊把你分支上的修改合併回主要分支，通常會搭配 code review 與自動測試。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "團隊協作",
   "版本控制",
   "開源貢獻",
   "實習工作"
  ],
  "example_sentence": "功能做完先發 PR，等同事 review 通過再 merge 進 main。",
  "related_terms": [
   "term_030",
   "term_027",
   "term_056"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "合併請求",
    "slang": [
     "提 PR",
     "開 PR",
     "發 PR",
     "審 PR"
    ],
    "dialogue": "我把登入功能的 code 寫好了，已經 發 PR 了，再幫我 review 一下。"
   },
   "one_liner": "Pull Request 就像把修改好的文件交給同事審稿，大家看過沒問題才正式併進公司的最終版本。",
   "versus": null
  }
 },
 {
  "id": "term_058",
  "word_en": "Algorithm",
  "word_zh": "演算法",
  "full_name": "Algorithm",
  "definition": "為了解決問題而設計的一組有限且明確的步驟，接收輸入、經過處理後產生輸出。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "演算法面試",
   "考試"
  ],
  "example_sentence": "這題用 greedy 演算法就可以在線性時間內解掉。",
  "related_terms": [
   "term_052",
   "term_021"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "演算法",
    "slang": [
     "演算法",
     "解法",
     "套路"
    ],
    "dialogue": "面試時先講清楚用的是哪一種演算法，再分析複雜度。"
   },
   "one_liner": "演算法就像食譜：把食材（輸入）照著步驟處理，最後端出答案（輸出）。",
   "versus": null
  }
 },
 {
  "id": "term_059",
  "word_en": "Array",
  "word_zh": "陣列",
  "full_name": "Array",
  "definition": "在連續記憶體中存放一組相同型別元素的資料結構，可透過索引在常數時間存取。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "演算法面試"
  ],
  "example_sentence": "用陣列存學生成績，再用索引直接取出第三個人的分數。",
  "related_terms": [
   "term_090",
   "term_053"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "陣列",
    "slang": [
     "陣列",
     "array",
     "一維陣列"
    ],
    "dialogue": "這筆資料用陣列存就好，索引存取最快。"
   },
   "one_liner": "陣列就像一排有編號的抽屜，知道號碼就能立刻拿到裡面的東西。",
   "versus": {
    "title": "Array 🆚 Linked Array",
    "left_title": "陣列（Array）",
    "right_title": "鏈結串列（Linked List）",
    "rows": [
     {
      "label": "存取速度",
      "left": "索引直接存取，O(1)",
      "right": "要從頭走過去，O(n)"
     },
     {
      "label": "記憶體",
      "left": "連續配置",
      "right": "分散配置，靠指標串起來"
     },
     {
      "label": "插入刪除",
      "left": "要搬動元素，較慢",
      "right": "改指標即可，較快"
     }
    ]
   }
  }
 },
 {
  "id": "term_060",
  "word_en": "Abstraction",
  "word_zh": "抽象化",
  "full_name": "Abstraction",
  "definition": "隱藏實作細節，只對外暴露必要的介面，讓使用者專注在「做什麼」而不是「怎麼做」。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "物件導向課程",
   "框架設計"
  ],
  "example_sentence": "呼叫 API 時不用知道伺服器怎麼實作，這就是抽象化。",
  "related_terms": [
   "term_011",
   "term_077"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "抽象化",
    "slang": [
     "抽象",
     "抽象化",
     "包一層"
    ],
    "dialogue": "這層再抽象一點，上層就不用管底層細節了。"
   },
   "one_liner": "抽象化就像開車不用懂引擎原理，只要會踩油門和轉方向盤。",
   "versus": null
  }
 },
 {
  "id": "term_061",
  "word_en": "Asynchronous",
  "word_zh": "非同步",
  "full_name": "Asynchronous",
  "definition": "發出請求後不必等待結果返回就能繼續執行其他工作，結果通常透過 callback、Promise 或事件通知。",
  "category": [
   "前端開發"
  ],
  "application_scenarios": [
   "非同步處理",
   "前後端串接"
  ],
  "example_sentence": "用 async/await 打 API，等待期間頁面還是可以操作。",
  "related_terms": [
   "term_017",
   "term_049"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "非同步",
    "slang": [
     "非同步",
     "async",
     "異步"
    ],
    "dialogue": "這個呼叫改成非同步，不然畫面會卡住。"
   },
   "one_liner": "非同步就像寄 email：寄完就可以做別的事，不用站在信箱前等對方回信。",
   "versus": {
    "title": "Blocking 🆚 Asynchronous",
    "left_title": "阻塞（Blocking）",
    "right_title": "非同步（Asynchronous）",
    "rows": [
     {
      "label": "等待方式",
      "left": "原地等結果回來",
      "right": "先做別的事，稍後再拿結果"
     },
     {
      "label": "執行緒",
      "left": "被佔住",
      "right": "可處理其他工作"
     },
     {
      "label": "常見情境",
      "left": "同步讀檔",
      "right": "AJAX、事件監聽"
     }
    ]
   }
  }
 },
 {
  "id": "term_062",
  "word_en": "Architecture",
  "word_zh": "架構",
  "full_name": "Architecture",
  "definition": "系統整體的結構與組織方式，包含元件划分、職責分工以及彼此之間的互動關係。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "系統設計",
   "微服務"
  ],
  "example_sentence": "這套系統的架構是微服務，每個服務有自己的資料庫。",
  "related_terms": [
   "term_011",
   "term_099"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "架構",
    "slang": [
     "架構",
     "系統架構",
     "整體設計"
    ],
    "dialogue": "先不要把架構畫得太細，把元件和流向講清楚就好。"
   },
   "one_liner": "架構就像房子的設計圖：先決定哪裡是客廳、哪裡是廚房，再來才考慮裝修。",
   "versus": null
  }
 },
 {
  "id": "term_063",
  "word_en": "Blocking",
  "word_zh": "阻塞",
  "full_name": "Blocking",
  "definition": "呼叫之後必須等結果返回才能繼續，等待期間執行緒無法處理其他工作。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "伺服器併發處理",
   "多執行緒程式"
  ],
  "example_sentence": "這個讀檔操作是阻塞的，執行緒會卡在這裡。",
  "related_terms": [
   "term_006",
   "term_005"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "阻塞",
    "slang": [
     "阻塞",
     "卡住",
     "blocking call"
    ],
    "dialogue": "這支 API 里面有個 blocking call，難怪併發一高就慢。"
   },
   "one_liner": "阻塞就像排隊買咖啡：你站在隊伍裡甚麼都不能做，只能等。",
   "versus": null
  }
 },
 {
  "id": "term_064",
  "word_en": "Banker's Algorithm",
  "word_zh": "銀行家演算法",
  "full_name": "Banker's Algorithm",
  "definition": "由 Dijkstra 提出的死結避免演算法，模擬資源分配後系統是否仍處於安全狀態，不安全就拒絕分配。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "併發控制",
   "作業系統課程"
  ],
  "example_sentence": "考試很愛考銀行家演算法，先算安全序列再決定要不要給資源。",
  "related_terms": [
   "term_004",
   "term_008"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "銀行家演算法",
    "slang": [
     "銀行家",
     "安全序列",
     "死結避免"
    ],
    "dialogue": "用銀行家演算法算一下，這個分配會不會造成死結。"
   },
   "one_liner": "銀行家演算法就像放款前先試算：如果把錢借出去，剩下的人還能不能還得起來。",
   "versus": null
  }
 },
 {
  "id": "term_065",
  "word_en": "Binary Search",
  "word_zh": "二分搜尋",
  "full_name": "Binary Search",
  "definition": "在已排序資料中每次取中間值比較，把搜尋範圍減半，時間複雜度為 O(log n)。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "演算法面試",
   "考試"
  ],
  "example_sentence": "資料已經排序好了，用二分搜尋只要幾次比較就找到。",
  "related_terms": [
   "term_052",
   "term_059"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "二分搜尋",
    "slang": [
     "二分",
     "binary search",
     "砍一半"
    ],
    "dialogue": "這題先排序再二分搜尋，複雜度就過了。"
   },
   "one_liner": "二分搜尋就像查字典：先翻中間頁，判斷要往前還是往後，每次砍一半。",
   "versus": null
  }
 },
 {
  "id": "term_066",
  "word_en": "Consistent Hashing",
  "word_zh": "一致雜湊",
  "full_name": "Consistent Hashing Function",
  "definition": "把資料與節點映射到同一個環上，增減節點時只需要搬動少數資料，常用於分散式快取。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "高流量網站",
   "微服務"
  ],
  "example_sentence": "快取集群加節點時用一致雜湊，避免大部分 key 都失效。",
  "related_terms": [
   "term_010",
   "term_018"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "一致雜湊",
    "slang": [
     "一致性雜湊",
     "hash ring",
     "環"
    ],
    "dialogue": "快取節點會增減，記得用一致雜湊，不要直接對節點數取模。"
   },
   "one_liner": "一致雜湊就像把資料和伺服器排在一個圓圈上，加一台機器只影響它附近的資料。",
   "versus": null
  }
 },
 {
  "id": "term_067",
  "word_en": "CAP Theorem",
  "word_zh": "CAP 定理",
  "full_name": "CAP Theorem",
  "definition": "分散式系統無法同時滿足一致性、可用性與分區容錯，最多只能同時達成其中兩項。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "系統設計",
   "微服務"
  ],
  "example_sentence": "設計分散式資料庫時，先在 CAP 之間做出取捨。",
  "related_terms": [
   "term_048",
   "term_075"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "CAP 定理",
    "slang": [
     "CAP",
     "三選二",
     "CAP 定理"
    ],
    "dialogue": "這套系統選 CP，所以分區時寧可拒絕服務也要保證一致。"
   },
   "one_liner": "CAP 定理就像三角選擇題：一致性、可用性、分區容錯只能選兩個。",
   "versus": null
  }
 },
 {
  "id": "term_068",
  "word_en": "Concurrency",
  "word_zh": "並行",
  "full_name": "Concurrence / Concurrency",
  "definition": "多個任務在同一段時間內交替執行，邏輯上看起來像是同時進行，但不一定真的同時跑。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "多執行緒程式",
   "伺服器併發處理"
  ],
  "example_sentence": "單核 CPU 也能靠 context switch 達成並行。",
  "related_terms": [
   "term_006",
   "term_096"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "並行",
    "slang": [
     "並行",
     "concurrent",
     "並發"
    ],
    "dialogue": "這支服務要處理高並行，執行緒池要調一下。"
   },
   "one_liner": "並行就像一個人邊煮飯邊接電話：兩件事都在進行，其實是快速切換。",
   "versus": {
    "title": "Concurrency 🆚 Parallel",
    "left_title": "並行（Concurrency）",
    "right_title": "平行（Parallel）",
    "rows": [
     {
      "label": "本質",
      "left": "交替處理，看起來同時",
      "right": "真正同時執行"
     },
     {
      "label": "硬體",
      "left": "單核也可以",
      "right": "需要多核心"
     },
     {
      "label": "關鍵",
      "left": "結構設計",
      "right": "硬體資源"
     }
    ]
   }
  }
 },
 {
  "id": "term_069",
  "word_en": "Confidentiality",
  "word_zh": "保密性",
  "full_name": "Confidentiality",
  "definition": "資訊安全三要素之一，確保資料只讓被授權的人讀取，不外洩給未授權者。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "資安",
   "企業網路"
  ],
  "example_sentence": "加密傳輸就是為了滿足保密性。",
  "related_terms": [
   "term_013",
   "term_034"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "保密性",
    "slang": [
     "保密",
     "機密性",
     "confidentiality"
    ],
    "dialogue": "這個欄位是個資，要滿足保密性，日誌不能印出來。"
   },
   "one_liner": "保密性就像把信件裝進信封，只有收件人能拆開看內容。",
   "versus": null
  }
 },
 {
  "id": "term_070",
  "word_en": "Context Switch",
  "word_zh": "上下文切換",
  "full_name": "Context Switch",
  "definition": "CPU 從一個行程或執行緒切換到另一個時，必須先保存目前狀態再還原下一個的狀態，本身有成本。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "多工處理",
   "效能分析"
  ],
  "example_sentence": "執行緒開太多反而一直 context switch，效能變差。",
  "related_terms": [
   "term_005",
   "term_006"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "上下文切換",
    "slang": [
     "context switch",
     "切換",
     "上下文"
    ],
    "dialogue": "執行緒不是開越多越快，context switch 會吃掉 CPU。"
   },
   "one_liner": "上下文切換就像讀書讀到一半被電話打斷：先記住讀到第幾頁，講完再回來接著讀。",
   "versus": null
  }
 },
 {
  "id": "term_071",
  "word_en": "CRUD",
  "word_zh": "增刪查改",
  "full_name": "Create, Read, Update, Delete",
  "definition": "新增、讀取、更新、刪除四種基本資料操作，大多數 API 與後端服務都圍繞它設計。",
  "category": [
   "後端開發"
  ],
  "application_scenarios": [
   "後端開發",
   "前後端串接"
  ],
  "example_sentence": "這支 RESTful API 就是標準的 CRUD 設計。",
  "related_terms": [
   "term_011",
   "term_012"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "增刪查改",
    "slang": [
     "CRUD",
     "增刪查改",
     "四個基本動作"
    ],
    "dialogue": "後台管理頁面本質上就是 CRUD，先做這四支 API。"
   },
   "one_liner": "CRUD 就是資料的四個基本動作：新增、讀取、修改、刪除。",
   "versus": null
  }
 },
 {
  "id": "term_072",
  "word_en": "Data Structure",
  "word_zh": "資料結構",
  "full_name": "Data Structure",
  "definition": "組織與儲存資料的方式，影響存取、插入、刪除的效率，是演算法的基礎。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "演算法面試"
  ],
  "example_sentence": "這題選對資料結構，複雜度直接從 O(n) 變成 O(1)。",
  "related_terms": [
   "term_053",
   "term_059",
   "term_054"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "資料結構",
    "slang": [
     "資料結構",
     "DS",
     "資料怎麼擺"
    ],
    "dialogue": "先想清楚資料結構，再寫演算法，順序不要反了。"
   },
   "one_liner": "資料結構就像收納方式：東西怎麼擺，決定了你找得到它的速度。",
   "versus": null
  }
 },
 {
  "id": "term_073",
  "word_en": "Diffie-Hellman",
  "word_zh": "迪菲-赫爾曼密鑰交換",
  "full_name": "Diffie-Hellman Key Exchange",
  "definition": "讓雙方在完全不安全的通道上，透過公開資訊各自計算出同一把共享金鑰的協定，常用於 HTTPS/TLS。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "資安",
   "企業網路"
  ],
  "example_sentence": "TLS 握手時會用 Diffie-Hellman 交換金鑰。",
  "related_terms": [
   "term_013"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "迪菲-赫爾曼密鑰交換",
    "slang": [
     "DH",
     "金鑰交換",
     "DH 握手"
    ],
    "dialogue": "TLS 裡面就是用 DH 在沒有預共享秘密的情況下生出金鑰。"
   },
   "one_liner": "Diffie-Hellman 就像兩個人當著旁人的面，用公開步驟各自算出同一個密碼，偷聽的人卻算不出來。",
   "versus": null
  }
 },
 {
  "id": "term_074",
  "word_en": "Dependency Injection",
  "word_zh": "依賴注入",
  "full_name": "Dependency Injection (DI)",
  "definition": "由外部把物件需要的依賴傳進去，而不是在物件內部自己建立，降低耦合並方便測試。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "框架設計",
   "後端開發"
  ],
  "example_sentence": "Spring 的 @Autowired 就是典型的依賴注入。",
  "related_terms": [
   "term_060",
   "term_011"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "依賴注入",
    "slang": [
     "DI",
     "注入",
     "dependency injection"
    ],
    "dialogue": "把 repo 用 DI 注入進去，單元測試就可以直接塞 mock。"
   },
   "one_liner": "依賴注入就像插座：電器不用自己發電，插上牆上的電就能用。",
   "versus": null
  }
 },
 {
  "id": "term_075",
  "word_en": "Distributed Consensus",
  "word_zh": "分散式共識",
  "full_name": "Distributed Consensus",
  "definition": "多台機器透過訊息交換，對某個值或某個順序達成一致同意的機制，是分散式系統的核心難題。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "微服務",
   "高流量網站"
  ],
  "example_sentence": "etcd 與 ZooKeeper 都是為了解決分散式共識問題。",
  "related_terms": [
   "term_095",
   "term_103",
   "term_067"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "分散式共識",
    "slang": [
     "共識",
     "consensus",
     "達成一致"
    ],
    "dialogue": " leader 掛掉之後要重新選舉，本質上就是分散式共識。"
   },
   "one_liner": "分散式共識就像一群人開會：就算有人沒來或講錯話，最後還是要同意同一個結論。",
   "versus": null
  }
 },
 {
  "id": "term_076",
  "word_en": "Eventually Consistent",
  "word_zh": "最終一致性",
  "full_name": "Eventual Consistency",
  "definition": "更新後不保證立刻讀到最新值，但經過一段時間、沒有新的更新時，所有副本最終會收斂一致。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "雲端部署",
   "高流量網站"
  ],
  "example_sentence": "DNS 更新就是最終一致性，幾分鐘後才全世界生效。",
  "related_terms": [
   "term_067",
   "term_111",
   "term_092"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "最終一致性",
    "slang": [
     "最終一致",
     "eventual",
     "遲早一致"
    ],
    "dialogue": "這個讀取可能拿到舊資料，我們接受最終一致性。"
   },
   "one_liner": "最終一致性就像群組訊息：剛發出去不是每個人都立刻看到，但過一陣子就會都收到。",
   "versus": {
    "title": "Strong 🆚 Eventual Consistency",
    "left_title": "強一致性（Strong）",
    "right_title": "最終一致性（Eventual）",
    "rows": [
     {
      "label": "讀到最新值",
      "left": "保證立刻讀到",
      "right": "過一段時間才讀到"
     },
     {
      "label": "延遲",
      "left": "較高",
      "right": "較低"
     },
     {
      "label": "可用性",
      "left": "較易受影響",
      "right": "較高"
     }
    ]
   }
  }
 },
 {
  "id": "term_077",
  "word_en": "Encapsulation",
  "word_zh": "封裝",
  "full_name": "Encapsulation",
  "definition": "把資料與操作包在物件內部，只透過公開方法存取，避免外部直接改動內部狀態。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "物件導向課程",
   "框架設計"
  ],
  "example_sentence": "把欄位設成 private，只留 getter/setter，就是封裝。",
  "related_terms": [
   "term_060",
   "term_022"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "封裝",
    "slang": [
     "封裝",
     "package 起來",
     "encapsulation"
    ],
    "dialogue": "欄位不要直接 expose，封裝起來才不會被亂改。"
   },
   "one_liner": "封裝就像膠囊藥：把藥粉包起來，你只要吞下去，不用知道裡面怎麼混合。",
   "versus": null
  }
 },
 {
  "id": "term_078",
  "word_en": "Endianness",
  "word_zh": "端序",
  "full_name": "Endianness (Big-endian / Little-endian)",
  "definition": "多位元組資料在記憶體中的存放順序，分為高位在前的大端與低位在前的小端。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "系統程式設計",
   "CPU設計"
  ],
  "example_sentence": "網路協定多用大端，x86 則是小端，轉換時要注意。",
  "related_terms": [],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "端序",
    "slang": [
     "大小端",
     "endian",
     "字節序"
    ],
    "dialogue": "這個 binary format 是小端，跨平台的時候要轉。"
   },
   "one_liner": "端序就像寫日期：有人寫 2026-11-20，有人寫 20-11-2026，資料一樣但順序不同。",
   "versus": null
  }
 },
 {
  "id": "term_079",
  "word_en": "FIFO",
  "word_zh": "先進先出",
  "full_name": "First-In, First-Out",
  "definition": "最早進入佇列的元素最先被取出，是佇列的基本行為。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "訊息佇列"
  ],
  "example_sentence": "訊息佇列用 FIFO，保證順序不會亂掉。",
  "related_terms": [
   "term_101",
   "term_049"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "先進先出",
    "slang": [
     "FIFO",
     "先進先出",
     "先來先服務"
    ],
    "dialogue": "訂單處理要照順序來，所以用 FIFO 佇列。"
   },
   "one_liner": "FIFO 就像排隊買票：先來的人先買到。",
   "versus": null
  }
 },
 {
  "id": "term_080",
  "word_en": "FILO",
  "word_zh": "先進後出",
  "full_name": "First-In, Last-Out",
  "definition": "最早進入的元素最後才被取出，也就是堆疊的行為，也稱 LIFO。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程"
  ],
  "example_sentence": "函式呼叫堆疊就是 FILO，最後呼叫的最先返回。",
  "related_terms": [
   "term_106"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "先進後出",
    "slang": [
     "FILO",
     "LIFO",
     "後進先出"
    ],
    "dialogue": "undo 功能用堆疊，符合 FILO 的順序。"
   },
   "one_liner": "FILO 就像疊盤子：最先放的那個在最下面，最後才拿得到。",
   "versus": null
  }
 },
 {
  "id": "term_081",
  "word_en": "Hash",
  "word_zh": "雜湊",
  "full_name": "Hash / Hashing",
  "definition": "把任意長度的輸入映射成固定長度的雜湊值，常用於快速查表、去重與資料完整性檢查。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "去重",
   "資料庫設計"
  ],
  "example_sentence": "用雜湊表把查詢從 O(n) 降到接近 O(1)。",
  "related_terms": [
   "term_010",
   "term_024"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "雜湊",
    "slang": [
     "hash",
     "雜湊",
     "hashCode"
    ],
    "dialogue": "這個集合用 hash 去重，不要每次都線性掃。"
   },
   "one_liner": "雜湊就像把身分證字號轉成一個號碼，看號碼就能快速找到對應的人。",
   "versus": null
  }
 },
 {
  "id": "term_082",
  "word_en": "Heap",
  "word_zh": "堆積",
  "full_name": "Heap (Priority Queue)",
  "definition": "一種特殊二元樹，父節點的值總是大于等于（或小于等于）子節點，常用來實作優先佇列。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "演算法面試",
   "資料結構課程"
  ],
  "example_sentence": "Top-K 問題用 heap 最適合，不用全部排序。",
  "related_terms": [
   "term_065",
   "term_059"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "堆積",
    "slang": [
     "heap",
     "堆",
     "優先佇列"
    ],
    "dialogue": "取前 K 大的元素用 heap 就好，不用全排序。"
   },
   "one_liner": "堆積就像排隊但 VIP 先走：最重要的人永遠在最前面。",
   "versus": null
  }
 },
 {
  "id": "term_083",
  "word_en": "IPC",
  "word_zh": "行程間通訊",
  "full_name": "Inter-Process Communication",
  "definition": "不同行程之間交換資料與同步的方法，常見有 pipe、shared memory、message queue 與 socket。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "系統程式設計",
   "微服務"
  ],
  "example_sentence": "兩個 process 用 pipe 傳資料，就是 IPC。",
  "related_terms": [
   "term_005",
   "term_049",
   "term_097"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "行程間通訊",
    "slang": [
     "IPC",
     "行程通訊",
     "process 間通訊"
    ],
    "dialogue": "這兩個 process 要交換資料，用 IPC 而不是直接讀同一個變數。"
   },
   "one_liner": "IPC 就像兩個房間之間裝了對講機，讓彼此能傳紙條並協調工作。",
   "versus": null
  }
 },
 {
  "id": "term_084",
  "word_en": "Integrity",
  "word_zh": "完整性",
  "full_name": "Integrity",
  "definition": "資訊安全三要素之一，确保資料在傳輸或儲存過程中沒有被未授權竄改。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "資安",
   "資料庫設計"
  ],
  "example_sentence": "用 hash 檢查下載檔案的完整性。",
  "related_terms": [
   "term_081",
   "term_013"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "完整性",
    "slang": [
     "完整性",
     "integrity",
     "沒被改過"
    ],
    "dialogue": "傳完檔案要驗一下 hash，確認完整性。"
   },
   "one_liner": "完整性就像包裹上的封條：收到時封條沒破，就表示內容沒被調包。",
   "versus": null
  }
 },
 {
  "id": "term_085",
  "word_en": "Immutable",
  "word_zh": "不可變",
  "full_name": "Immutable",
  "definition": "物件一旦建立就不能再修改，任何變更都會產生新物件，常用於並行與狀態管理。",
  "category": [
   "前端開發"
  ],
  "application_scenarios": [
   "框架設計",
   "前端開發"
  ],
  "example_sentence": "React 的 state 更新要回傳新物件，就是不可變的概念。",
  "related_terms": [
   "term_030"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "不可變",
    "slang": [
     "immutable",
     "不可變",
     "不要改原物件"
    ],
    "dialogue": "不要直接 mutate state，回一個新的物件。"
   },
   "one_liner": "不可變就像用原子筆寫字：寫錯不能擦掉，只能拿新紙重寫。",
   "versus": null
  }
 },
 {
  "id": "term_086",
  "word_en": "Inheritance",
  "word_zh": "繼承",
  "full_name": "Inheritance",
  "definition": "子類別沿用父類別的屬性與方法，並可加以擴充或覆寫，是物件導向的三大特性之一。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "物件導向課程",
   "Java課程"
  ],
  "example_sentence": "Cat 繼承 Animal，再覆寫 sound() 方法。",
  "related_terms": [
   "term_022",
   "term_077"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "繼承",
    "slang": [
     "inherit",
     "繼承",
     "extends"
    ],
    "dialogue": "這兩個 class 有重複邏輯，抽一個父類別讓它們繼承。"
   },
   "one_liner": "繼承就像兒子遺傳爸爸的眼睛：不用重新長一雙，還能再加上自己的特徵。",
   "versus": null
  }
 },
 {
  "id": "term_087",
  "word_en": "Idempotency",
  "word_zh": "冪等性",
  "full_name": "Idempotency",
  "definition": "同一個操作執行一次與執行多次的結果相同，常用於重試機制與支付 APIs。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "金流整合",
   "高流量網站"
  ],
  "example_sentence": "付款 API 要設計成冪等，重送上扣款只會發生一次。",
  "related_terms": [
   "term_012",
   "term_011"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "冪等性",
    "slang": [
     "冪等",
     "idempotent",
     "重試安全"
    ],
    "dialogue": "這個 endpoint 要冪等，client 超時重送才不會重複扣款。"
   },
   "one_liner": "冪等性就像按電梯按鈕：按一次和按十次，電梯都只來一次。",
   "versus": null
  }
 },
 {
  "id": "term_088",
  "word_en": "JSON",
  "word_zh": "JSON",
  "full_name": "JavaScript Object Notation",
  "definition": "一種輕量級的資料交換格式，用 key-value 與陣列表示結構化資料，語言無關。",
  "category": [
   "前端開發"
  ],
  "application_scenarios": [
   "前後端串接",
   "API效能"
  ],
  "example_sentence": "API 回傳 JSON，前端直接解析成物件。",
  "related_terms": [
   "term_011",
   "term_012"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "JSON",
    "slang": [
     "JSON",
     "json 格式",
     "payload"
    ],
    "dialogue": "response 用 JSON，欄位名統一用 camelCase。"
   },
   "one_liner": "JSON 就像快遞包裹的內容清單：用統一格式告訴你里面裝了什麼。",
   "versus": null
  }
 },
 {
  "id": "term_089",
  "word_en": "Kernel",
  "word_zh": "核心",
  "full_name": "Operating System Kernel",
  "definition": "作業系統最核心的部分，負責管理 CPU、記憶體、檔案系統與硬體資源，並提供系統呼叫給使用者程式。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "作業系統課程",
   "系統程式設計"
  ],
  "example_sentence": "Linux kernel 負責排程 process 與管理記憶體。",
  "related_terms": [
   "term_005",
   "term_009"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "核心",
    "slang": [
     "kernel",
     "核心",
     "內核"
    ],
    "dialogue": "這個 driver 要跑在 kernel space，不是 user space。"
   },
   "one_liner": "核心就像大腦：所有器官（硬體）都要透過它才能協調運作。",
   "versus": null
  }
 },
 {
  "id": "term_090",
  "word_en": "Linked List",
  "word_zh": "鏈結串列",
  "full_name": "Linked List",
  "definition": "由節點組成的資料結構，每個節點存放資料與指向下一個節點的指標，插入刪除方便但存取需線性走訪。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程"
  ],
  "example_sentence": "實作 LRU cache 時會用到 doubly linked list。",
  "related_terms": [
   "term_059",
   "term_082"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "鏈結串列",
    "slang": [
     "linked list",
     "鏈表",
     "連結串列"
    ],
    "dialogue": "這裡插入很頻繁，用 linked list 比陣列划算。"
   },
   "one_liner": "鏈結串列就像尋寶遊戲：每張紙條告訴你下一張在哪裡。",
   "versus": null
  }
 },
 {
  "id": "term_091",
  "word_en": "Memory Leak",
  "word_zh": "記憶體洩漏",
  "full_name": "Memory Leak",
  "definition": "程式配置記憶體後沒有釋放，導致可用記憶體愈來愈少，長期執行可能發生 OutOfMemoryError。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "效能調校",
   "伺服器維運"
  ],
  "example_sentence": "事件監聽沒移除，造成 memory leak。",
  "related_terms": [
   "term_037",
   "term_009"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "記憶體洩漏",
    "slang": [
     "memory leak",
     "洩漏",
     "忘記釋放"
    ],
    "dialogue": "這支服務跑幾天就重啟，八成是 memory leak。"
   },
   "one_liner": "記憶體洩漏就像水龍頭沒關：水一直流，最後水塔滿出來。",
   "versus": null
  }
 },
 {
  "id": "term_092",
  "word_en": "NWR",
  "word_zh": "NWR 模型",
  "full_name": "NWR Quorum Model",
  "definition": "分散式系統中控制讀寫一致性的模型：N 為副本數、W 為寫入確認數、R 為讀取確認數，W+R>N 可保證讀到最新值。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "系統設計",
   "高流量網站"
  ],
  "example_sentence": "N=3、W=2、R=2，就能保證讀到剛寫入的資料。",
  "related_terms": [
   "term_076",
   "term_067"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "NWR 模型",
    "slang": [
     "NWR",
     "quorum",
     "W+R>N"
    ],
    "dialogue": "把 W 調到 2、R 調到 2，就能讀到最新寫入。"
   },
   "one_liner": "NWR 就像投票：總共 N 個人，W 個人同意才算寫成功，R 個人同意才能讀到。",
   "versus": null
  }
 },
 {
  "id": "term_093",
  "word_en": "Node",
  "word_zh": "節點",
  "full_name": "Node",
  "definition": "分散式系統或資料結構中的基本單位，可能是一台伺服器、一個運算單元或圖中的一個點。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "微服務",
   "高流量網站"
  ],
  "example_sentence": "這個 cluster 有五個 node，掛掉一個還能服務。",
  "related_terms": [
   "term_053",
   "term_075"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "節點",
    "slang": [
     "node",
     "節點",
     "一台機器"
    ],
    "dialogue": "先把 node 加進 cluster，再讓它同步資料。"
   },
   "one_liner": "節點就像網路裡的一站：每個站都能收發並轉送資料。",
   "versus": null
  }
 },
 {
  "id": "term_094",
  "word_en": "OSI Model",
  "word_zh": "OSI 模型",
  "full_name": "Open Systems Interconnection Model",
  "definition": "將網路通訊分成七層的參考模型，從實體、資料鏈結、網路、傳輸、會議、表達到應用層。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "企業網路",
   "網路除錯"
  ],
  "example_sentence": "除錯時用 OSI 模型一層一層檢查，比較有方向。",
  "related_terms": [
   "term_015",
   "term_013"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "OSI 模型",
    "slang": [
     "OSI",
     "七層模型",
     "網路分層"
    ],
    "dialogue": "照 OSI 模型往下查，先看第三層 IP 通不通。"
   },
   "one_liner": "OSI 模型就像快遞流程：從寄件、打包、運輸到送達，每層各做一件事。",
   "versus": null
  }
 },
 {
  "id": "term_095",
  "word_en": "Paxos",
  "word_zh": "Paxos 演算法",
  "full_name": "Paxos Consensus Algorithm",
  "definition": "Leslie Lamport 提出的分散式共識演算法，讓多個節點在可能有失敗的情況下對同一個值達成一致。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "系統設計",
   "微服務"
  ],
  "example_sentence": "Chubby 與 ZooKeeper 背後都參考了 Paxos。",
  "related_terms": [
   "term_103",
   "term_075"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "Paxos 演算法",
    "slang": [
     "paxos",
     "共識演算法",
     "多數決"
    ],
    "dialogue": "Paxos 正確但很難懂，實務上多用 Raft。"
   },
   "one_liner": "Paxos 就像一套開會規則：即使有人遲到或中途離開，大家還是能得出同一個決議。",
   "versus": null
  }
 },
 {
  "id": "term_096",
  "word_en": "Parallel",
  "word_zh": "平行",
  "full_name": "Parallelism",
  "definition": "真正同時執行多個任務，通常需要多核心或多台機器，與「看起來同時」的並行不同。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "多工處理",
   "效能優化"
  ],
  "example_sentence": "把矩陣運算拆到多核心平行處理，速度快很多。",
  "related_terms": [
   "term_068",
   "term_006"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "平行",
    "slang": [
     "parallel",
     "平行",
     "同時跑"
    ],
    "dialogue": "這段計算可以平行化，用多執行緒跑滿 CPU。"
   },
   "one_liner": "平行就像多個人同時搬箱子：真的一起做，不是一個人來回跑。",
   "versus": null
  }
 },
 {
  "id": "term_097",
  "word_en": "Pipe",
  "word_zh": "管線",
  "full_name": "Pipe",
  "definition": "作業系統提供的訊息傳遞媒介，讓一個行程的輸出直接成為另一個行程的輸入。",
  "category": [
   "作業系統"
  ],
  "application_scenarios": [
   "系統程式設計",
   "Linux課程"
  ],
  "example_sentence": "用 pipe 把 grep 的輸出接给 wc -l。",
  "related_terms": [
   "term_083",
   "term_005"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "管線",
    "slang": [
     "pipe",
     "管線",
     "|"
    ],
    "dialogue": "在 shell 里面用 pipe 把所有指令串起來就好。"
   },
   "one_liner": "管線就像水管：把一個水龍頭接到另一個，水直接流過去。",
   "versus": null
  }
 },
 {
  "id": "term_098",
  "word_en": "Procedure",
  "word_zh": "程序",
  "full_name": "Procedure",
  "definition": "一連串為了完成特定任務的步驟，偏向流程面的描述；與配置資源的 process 不同。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "程式設計",
   "系統程式設計"
  ],
  "example_sentence": "把這段流程寫成一個 procedure，到處都能呼叫。",
  "related_terms": [
   "term_005"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "程序",
    "slang": [
     "procedure",
     "程序",
     "步驟"
    ],
    "dialogue": "這裡指的是 procedure 流程，不是 process 行程，別混在一起。"
   },
   "one_liner": "程序就像食譜裡的步驟說明：照著做就能完成一道菜。",
   "versus": null
  }
 },
 {
  "id": "term_099",
  "word_en": "Protocol",
  "word_zh": "協定",
  "full_name": "Protocol",
  "definition": "雙方溝通時共同遵守的規則與格式，包含訊息順序、資料格式與錯誤處理。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "後端開發",
   "企業網路"
  ],
  "example_sentence": "HTTP 是用在應用層的協定。",
  "related_terms": [
   "term_013",
   "term_015"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "協定",
    "slang": [
     "protocol",
     "協定",
     "協議"
    ],
    "dialogue": "兩邊要先把協定講清楚，欄位格式才不會對不起來。"
   },
   "one_liner": "協定就像語言：兩個人都講同一種語言才能聽懂彼此。",
   "versus": null
  }
 },
 {
  "id": "term_100",
  "word_en": "Primary Key",
  "word_zh": "主鍵",
  "full_name": "Primary Key",
  "definition": "資料表中用來唯一識別每筆紀錄的欄位或欄位組合，不可重複且不可為空。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "資料庫設計",
   "資料庫課程"
  ],
  "example_sentence": "每張表都要有 primary key，例如使用者 ID。",
  "related_terms": [
   "term_024",
   "term_026"
  ],
  "frequency": "must",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "主鍵",
    "slang": [
     "PK",
     "主鍵",
     "primary key"
    ],
    "dialogue": "這張表的 primary key 用自增 ID 就好。"
   },
   "one_liner": "主鍵就像身分證號碼：每個人都不一樣，靠它就能找到唯一那筆資料。",
   "versus": null
  }
 },
 {
  "id": "term_101",
  "word_en": "Queue",
  "word_zh": "佇列",
  "full_name": "Queue",
  "definition": "先進先出（FIFO）的資料結構，常用來緩衝非同步工作或傳遞訊息。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "非同步處理"
  ],
  "example_sentence": "把請求放進 queue，背景 worker 慢慢處理。",
  "related_terms": [
   "term_079",
   "term_049"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "佇列",
    "slang": [
     "queue",
     "佇列",
     "队列"
    ],
    "dialogue": "先把請求塞進 queue，不要直接打資料庫。"
   },
   "one_liner": "佇列就是排隊：先來的人先被服務。",
   "versus": null
  }
 },
 {
  "id": "term_102",
  "word_en": "Query",
  "word_zh": "查詢",
  "full_name": "Query",
  "definition": "向資料庫或搜尋系統提出請求，取出符合條件的資料。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "資料庫設計",
   "搜尋輸入"
  ],
  "example_sentence": "寫一個 query 找出最近一個月註冊的使用者。",
  "related_terms": [
   "term_035",
   "term_024"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "查詢",
    "slang": [
     "query",
     "查詢",
     "SQL"
    ],
    "dialogue": "這個 query 很慢，看一下有沒有用到 index。"
   },
   "one_liner": "查詢就像填表格向管理員要資料：你告訴他條件，他幫你找出符合的。",
   "versus": null
  }
 },
 {
  "id": "term_103",
  "word_en": "Raft",
  "word_zh": "Raft 演算法",
  "full_name": "Raft Consensus Algorithm",
  "definition": "一種強調可理解性的分散式共識演算法，透過 leader 選舉與日誌複製維持一致性。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "系統設計",
   "微服務"
  ],
  "example_sentence": "etcd 用 Raft 保證資料一致。",
  "related_terms": [
   "term_095",
   "term_075"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "Raft 演算法",
    "slang": [
     "raft",
     "leader 選舉",
     "共識"
    ],
    "dialogue": "用 Raft 選出 leader 之後，所有寫入都走 leader。"
   },
   "one_liner": "Raft 就像開會先選出一位主持人：之後大家都聽主持人的決定。",
   "versus": null
  }
 },
 {
  "id": "term_104",
  "word_en": "Runtime",
  "word_zh": "執行階段",
  "full_name": "Runtime",
  "definition": "程式實際執行的時期，也指支援程式跑起來所需的環境，例如 JVM 或 Node.js runtime。",
  "category": [
   "軟體工程"
  ],
  "application_scenarios": [
   "程式設計",
   "環境建置"
  ],
  "example_sentence": "這支程式需要 Java runtime 才能執行。",
  "related_terms": [
   "term_039"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "執行階段",
    "slang": [
     "runtime",
     "執行期",
     "運行時"
    ],
    "dialogue": "先確認server 上裝了對應的 runtime，不然跑不起來。"
   },
   "one_liner": "執行階段就像演員上台表演的時候：劇本（程式碼）這時才真的被演出来。",
   "versus": null
  }
 },
 {
  "id": "term_105",
  "word_en": "Strong Consistency",
  "word_zh": "強一致性",
  "full_name": "Strong Consistency",
  "definition": "每次讀取都保證拿到最近一次完成的寫入結果，使用者所見即最新。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "資料庫交易",
   "高流量網站"
  ],
  "example_sentence": "銀行帳戶餘額必須是強一致性，不能讀到舊資料。",
  "related_terms": [
   "term_076",
   "term_048"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "強一致性",
    "slang": [
     "強一致",
     "strong",
     "線性一致"
    ],
    "dialogue": "金流相關的資料要強一致性，不能用 eventual。"
   },
   "one_liner": "強一致性就像發訊息後，保證每個人立刻看到最新那一則。",
   "versus": null
  }
 },
 {
  "id": "term_106",
  "word_en": "Stack",
  "word_zh": "堆疊",
  "full_name": "Stack",
  "definition": "後進先出（LIFO）的資料結構，常用於函式呼叫、括號匹配與運算式求值。",
  "category": [
   "演算法"
  ],
  "application_scenarios": [
   "資料結構課程",
   "演算法面試"
  ],
  "example_sentence": "用 stack 檢查括號是否成對。",
  "related_terms": [
   "term_080",
   "term_101"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "演算法面試"
  ],
  "communication": {
   "jargon": {
    "formal": "堆疊",
    "slang": [
     "stack",
     "堆疊",
     "棧"
    ],
    "dialogue": "DFS 用 stack 寫最直覺，BFS 用 queue。"
   },
   "one_liner": "堆疊就像疊書：最後放的那本最先拿走。",
   "versus": null
  }
 },
 {
  "id": "term_107",
  "word_en": "Serialization",
  "word_zh": "序列化",
  "full_name": "Serialization",
  "definition": "將物件或資料結構轉成可儲存或傳輸的格式，例如 JSON、XML 或位元組流；反向動作是反序列化。",
  "category": [
   "前端開發"
  ],
  "application_scenarios": [
   "前後端串接",
   "API效能"
  ],
  "example_sentence": "把物件序列化成 JSON 再送到 API。",
  "related_terms": [
   "term_088",
   "term_011"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "序列化",
    "slang": [
     "序列化",
     "serialize",
     "轉成字串"
    ],
    "dialogue": "payload 要先序列化，接收端再反序列化。"
   },
   "one_liner": "序列化就像把家具拆成平整的包裝：方便搬運，到了目的地再組回去。",
   "versus": null
  }
 },
 {
  "id": "term_108",
  "word_en": "Two-Phase Commit",
  "word_zh": "二階段提交",
  "full_name": "Two-Phase Commit (2PC)",
  "definition": "分散式交易協定，分成準備與提交兩階段，確保所有參與者一起成功或一起失敗。",
  "category": [
   "資料庫"
  ],
  "application_scenarios": [
   "資料庫交易",
   "微服務"
  ],
  "example_sentence": "跨資料庫交易用 2PC，但 coordinator 故障會阻塞。",
  "related_terms": [
   "term_025",
   "term_048"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "二階段提交",
    "slang": [
     "2PC",
     "兩階段提交",
     "prepare/commit"
    ],
    "dialogue": "2PC 雖然一致，但效能差，能不用就不用。"
   },
   "one_liner": "二階段提交就像結婚登記：先問雙方是否願意（準備），都答應了才正式登記（提交）。",
   "versus": null
  }
 },
 {
  "id": "term_109",
  "word_en": "Unicode",
  "word_zh": "統一碼",
  "full_name": "Unicode",
  "definition": "為世界上大多數字元制定統一編碼，讓不同語言的文字都能正確顯示與交換。",
  "category": [
   "前端開發"
  ],
  "application_scenarios": [
   "網頁開發",
   "翻譯"
  ],
  "example_sentence": "網頁指定 UTF-8，就是使用 Unicode 編碼。",
  "related_terms": [
   "term_088"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "統一碼",
    "slang": [
     "unicode",
     "utf-8",
     "萬國碼"
    ],
    "dialogue": "encoding 統一用 UTF-8，避免中文變亂碼。"
   },
   "one_liner": "統一碼就像全球的郵件地址格式：不管哪個國家的人寫地址，郵差都看得懂。",
   "versus": null
  }
 },
 {
  "id": "term_110",
  "word_en": "URI/URL",
  "word_zh": "統一資源識別碼／定位符",
  "full_name": "Uniform Resource Identifier / Locator",
  "definition": "用來識別或定位網路資源的字串；URL 是 URI 的一種，除了識別還給出取得資源的方式。",
  "category": [
   "計算機網路"
  ],
  "application_scenarios": [
   "網頁開發",
   "API效能"
  ],
  "example_sentence": "https://example.com/api/users 就是一個 URL。",
  "related_terms": [
   "term_013",
   "term_012"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "統一資源識別碼／定位符",
    "slang": [
     "URL",
     "URI",
     "網址"
    ],
    "dialogue": "這個 API 的 URL 設計得不夠 RESTful，改一下。"
   },
   "one_liner": "URL 就像網站的地址：貼上它就能找到你要的那一頁。",
   "versus": null
  }
 },
 {
  "id": "term_111",
  "word_en": "Weak Consistency",
  "word_zh": "弱一致性",
  "full_name": "Weak Consistency",
  "definition": "不保證讀取能立刻看到最新寫入，也不保證何時才會收斂，是一致性模型中最寬鬆的一種。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "高流量網站",
   "CDN"
  ],
  "example_sentence": "CDN 快取更新屬於弱一致性，各地區生效時間不同。",
  "related_terms": [
   "term_076"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "系統設計"
  ],
  "communication": {
   "jargon": {
    "formal": "弱一致性",
    "slang": [
     "弱一致",
     "weak",
     "不保證"
    ],
    "dialogue": "這個快取是弱一致性，更新後不一定馬上看得到。"
   },
   "one_liner": "弱一致性就像謠言：你聽到的版本可能不是最新的，也不知道什麼時候才會更新。",
   "versus": null
  }
 },
 {
  "id": "term_112",
  "word_en": "Zero-day Attack",
  "word_zh": "零日攻擊",
  "full_name": "Zero-day Attack",
  "definition": "利用尚未公開或尚未修補的漏洞進行攻擊，防守方在攻擊發生前沒有機會準備補丁。",
  "category": [
   "系統設計"
  ],
  "application_scenarios": [
   "資安",
   "資安防護"
  ],
  "example_sentence": "這次事件是零日攻擊，目前還沒有官方修補程式。",
  "related_terms": [
   "term_034",
   "term_069"
  ],
  "frequency": "nice",
  "interview_scenarios": [
   "資安防護"
  ],
  "communication": {
   "jargon": {
    "formal": "零日攻擊",
    "slang": [
     "zero-day",
     "零日",
     "未修補漏洞"
    ],
    "dialogue": "這是 zero-day，先做緩解措施，等廠商出 patch。"
   },
   "one_liner": "零日攻擊就像小偷用一把還沒被發現的萬能鑰匙：防守方連鎖在哪裡都不知道。",
   "versus": null
  }
 }
];
