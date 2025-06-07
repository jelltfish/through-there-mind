# Firebase 設置說明

## 1. 安裝 Firebase SDK

```bash
npm install firebase
```

## 2. Firebase 專案設置

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 建立新專案或選擇現有專案
3. 在專案設置中點擊「新增應用程式」選擇 Web 應用
4. 記下您的 Firebase 配置資訊

## 3. 更新 Firebase 配置

1. 複製範例配置文件：
   ```bash
   cp src/lib/firebase.example.ts src/lib/firebase.ts
   ```

2. 編輯 `src/lib/firebase.ts` 檔案，將配置替換為您的實際配置：
   ```typescript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-actual-project-id",
     storageBucket: "your-project.firebasestorage.app",
     messagingSenderId: "123456789012",
     appId: "your-actual-app-id",
     measurementId: "G-your-measurement-id"
   };
   ```

⚠️ **注意**：`firebase.ts` 文件已加入 `.gitignore`，包含敏感的 API 密鑰，不會被提交到版本控制中。

## 4. 設置 Firestore 資料庫

1. 在 Firebase Console 中啟用 Firestore Database
2. 選擇測試模式或設定適當的安全規則
3. 建議的安全規則（開發階段）：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 允許讀取疾病資料
    match /diseases/{document} {
      allow read: if true;
      allow write: if false; // 僅允許管理員寫入
    }
  }
}
```

## 5. 上傳初始資料

1. 啟動開發伺服器：`npm run dev`
2. 訪問：`http://localhost:3000/admin/upload`
3. 點擊「上傳資料到 Firebase」按鈕
4. 等待上傳完成的確認訊息

## 6. 驗證設置

上傳完成後，返回知識頁面 (`/knowledge`) 驗證資料是否正確從 Firebase 載入。

## 7. 生產環境注意事項

- 更新 Firestore 安全規則以限制寫入權限
- 考慮使用環境變數來管理 Firebase 配置
- 移除或保護管理員上傳頁面 (`/admin/upload`)

## 資料結構

Firestore 中的疾病資料結構：

```
diseases (collection)
├── schizophrenia (document)
├── depression (document)
├── anxiety (document)
└── mania (document)
```

每個文檔包含：
- id: string
- name: string
- icon: string
- subtitle: string
- description: string
- symptoms: string[]
- characteristics: string[]
- color: object 