# DEMO HRMS 系統 - Demo 版本

這是DEMO人力資源管理系統 (HRMS) 的互動式 Demo 版本，用於討論和展示。本 Demo 包含模擬數據，重點展示系統的功能、流程和 UI/UX 設計。

## 專案概述

本 Demo 版本旨在展示 HRMS 系統的核心功能：

- 人事基本操作模組
- 勤惰管理模組
- 薪資與獎金模組

## 技術架構

- 前端: HTML5, CSS3, JavaScript (原生)
- UI 元件: 自定義 CSS，基於品牌風格
- 圖表: Chart.js
- 圖標: Font Awesome

## 如何使用

1. 克隆或下載此存儲庫
2. 在瀏覽器中打開 `index.html` 文件
   - 或者使用 Live Server 等工具啟動本地服務器

## Demo 账户

系統提供以下 Demo 帳戶以展示不同角色的功能和權限:

| 角色 | 用戶名 | 密碼 |
|------|-------|------|
| 系統管理員 | admin | password123 |
| HR主管 | hrmanager | password123 |
| HR專員 | hrstaff | password123 |
| 部門主管 | depthead | password123 |
| 一般員工 | employee | password123 |

## 文件結構

```
HRMS-HTML-TEMPLATE/
│
├── index.html                # 儀表板 (首頁)
├── login.html               # 登入頁面
│
├── assets/                  # 靜態資源
│   ├── css/                 # 樣式文件
│   │   ├── style.css        # 全局樣式
│   │   ├── login.css        # 登入頁面樣式
│   │   └── dashboard.css    # 儀表板樣式
│   │
│   ├── js/                  # JavaScript 文件
│   │   ├── main.js          # 全局腳本
│   │   ├── login.js         # 登入頁面腳本
│   │   └── dashboard.js     # 儀表板腳本
│   │
│   └── images/              # 圖片資源
│       ├── logo.png         # 標誌
│       └── user-avatar.jpg  # 使用者頭像示例
│
└── pages/                   # 各功能頁面
    ├── employees/           # 員工管理
    ├── organization/        # 組織架構
    ├── attendance/          # 勤惰管理
    ├── payroll/             # 薪資與獎金
    ├── announcement/        # 公布欄
    ├── reports/             # 報表中心
    └── settings/            # 系統設定
```

## 注意事項

- 本 Demo 僅展示界面和簡單交互，不連接後端數據庫
- 所有資料均為模擬數據，僅用於展示目的
- 登入系統接受任何用戶名和密碼組合

## 聯絡資訊

如有任何問題或建議，請聯絡 IT 服務中心：
- 電子郵件: it.support@xxxx.com (示例)
- 內線: 1234 (示例)

---

© 2025 OnDot. 版權所有. 