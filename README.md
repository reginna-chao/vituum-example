# 範本（專案名稱） - 前端開發 - Vituum(Vite) #
前端開發

* 無前端框架
* 樣式框架：無
* 編譯工具：Vituum (Vite)



### 日期紀錄 ###
```
2024/11/20 - by Reginna - 工作內容
```



### 測試站網址 ###
* 專案名稱（純靜態測試站）： [專案測試站網址](專案測試站網址)



### 特別注意事項 ###
* Commit要使用相同格式，與指定的類型(Type)，參考下方「Commit 規範」區塊。

> 版控相關是否有應注意事項



### 啟動與架構 ###

##### 架構資訊

1. 使用PUG生成（HTML架構）：PUG
1. 可使用自製 iconFont，詳細運用見gulpfile.js
	* 參考iconfont生成後的html，請在網址列後加入`/fonts/icons/`）[範例（需啟動gulp）](http://localhost:3000/fonts/icons/)
1. 使用 ESLint，統一 JS 格式寫法；使用 Stylelint 統一 SCSS 格式寫法
	* ESLint - VSCode要安裝相關套件 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
	* Stylelint - VSCode要安裝相關套件 [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)，`.scss` 格式檢測
1. Foundation JS 嘗試使用載入 Module 形式，見 foundation.6.9.0.custom.js 檔案		
	使用時，需依照此步驟：
	* 開啟相關的 CSS (見 `src/sass/foundation/_foundation.scss` 設定）
	* 開啟相關的 JS (見 `src/js/vendor/foundation.6.9.0.custom.js` 設定）
	* ※建議把相關客製程式碼拉回 `all.js`（除非**要在生成前啟動的項目**等必要條件才放置於客製化檔案中）
1. JS 啟動：因為一般套件有用 `async` 延後載入，所以啟動要在 `window.onload` 以後，如：

```
$(window).on('load', function() {
$(document).foundation();
})
```

##### 版本資訊

```diff
// Node version v20.18.1
// NPM version V6.14.17
// Vite version v6.2.6
```

##### 安裝、啟動與生成

※於命令提示自字元輸入指令
※建議安裝pnpm後再安裝專案

1. 安裝 `$ pnpm install`
2. 啟動 `$ pnpm dev`
3. 生成 `$ pnpm build`



### 使用外掛列表 ###
* [JQuery 3.7.1](https://code.jquery.com/jquery/) - jQuery
* [Vanilla LazyLoad 19.1.3](https://github.com/verlok/vanilla-lazyload) - 延遲載入圖片 | by Verlok

> 請將有使用的外掛套件撰寫於此



### 開發注意事項 ###

1. Pug編譯時要確認全頁空格數、空格類型是一致的（統一為Tab；統一為空格），否則可能會造成編譯錯誤，推薦使用：
    ```
        空格：2
        使用 space 進行排版
    ```

    ※使用VSCode的人建議將下列項目設定快捷鍵，開啟「鍵盤快速鍵」(Windows: Ctrl+K Ctrl+S | Mac自行查閱)：		

    - 「將縮排轉換成定位點」：全頁轉為Tab
    - 「將縮排轉換成空格」：全頁轉為空白
    - 「檢視: 切換轉譯空白字元」：顯示/隱藏 空白跟定位點

> 專案注意事項寫於此



### 檔案說明 ###

##### -------------------- SASS --------------------
* 使用[BEM命名](http://getbem.com/)方式，或是將選取器的層級數減少(EX: .el > ul > li > a => .el a)
* 檔案功能：
	* 頁面分法與規則見 `src/sass/all.sass`
	* 多頁共用**變數**放置於 `src/sass/layout/_common.sass`
	* 多頁共用**樣式**放置於 `src/sass/layout/_global.sass`
	* Layout樣式放置於 `src/sass/layout/_layout.sass`
	* Layout相關其餘項目放置於 `src/sass/layout/` 資料夾內
	* 外掛套件樣式放置於 `src/sass/vendor/` 資料夾內
* 主要網頁breakpoint (或參考Foundation文件)：尺寸請看 `sass/foundation/setting/setting.scss`
* 整體項目設定包含：h1-h6字體、字級、顏色、breakpoint、主要顯示寬度範圍...等基礎設定，整體設置顏色與字體大小放在 `sass/foundation/setting/setting.scss` 、 `src/sass/layout/_common.sass`
* 如果想要增減foundation的項目開啟，請使用 `sass/foundation/foundation.scss`
* 各單元SCSS通用元素置於檔案頂部

##### -------------------- JS --------------------

* 各頁面 JS 放置於 `src/js` 資料夾內（第一層）
* `src/js/vendor/`：請放置專案用的外掛或是套件檔案		
（沒壓縮或有壓縮檔皆可放置，Gulp編譯會自動判斷並產出 `.min` 檔案，建議js頁面載入時請統一載入壓縮 `.min` 檔）
* `src/js/modules/`：專門於其他js檔案內import的檔案，只寫部分功能，不會生成於dist。
* `src/js/utils/`：專門放置於各檔案需要的基礎JS（檔案名稱需以底線「_」為開頭）
* JS 檔案已兼容 ES6 以及 ES5 可在檔案內撰寫，Gulp編譯後會自動產生 ES5 語法



### Commit 規範 ###

- 格式：type(範圍): 執行內容
- **type**只允許下列項目（全小寫）：
	1. feat: 新增/修改功能 (feature)。
	1. fix: 修補 bug (bug fix)。
	1. docs: 文件 (documentation)。
	1. style: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
	1. refactor: 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
	1. perf: 改善效能 (A code change that improves performance)。
	1. test: 增加測試 (when adding missing tests)。
	1. chore: 建構程序或輔助工具的變動 (maintain)。
	1. revert: 撤銷回覆先前的 commit 例如：revert: type(scope): subject (回覆版本：xxxx)。
- 範例：
	1. feat(about): about page develop
	1. fix: sit-100- fix some bug

- 參考資料：[Git Commit Message 這樣寫會更好，替專案引入規範與範例](https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html)
- 建議安裝：[git-cz](https://github.com/streamich/git-cz)

``` bash
git-cz --disable-emoji --scope='login'
```



---



### 相關文件 ###

##### 專案相關
* [專案資料夾](專案資料夾網址)
* [專案總表](專案總表網址)
* 切版進度：[試算表名稱](切版進度表網址)		
前台開發工程師使用之檔案（客戶檔案無權限）

> 專案相關的檔案寫於此
