# HoneyMarron Developer Website

静的ホスティング向けに構成された個人開発者サイトのソースです。個人情報（住所・電話・メール等）は含みません。  
本リポジトリはコンテンツと軽量なフロントエンド実装（HTML/CSS/JS）、SEOメタ、サイトマップ、Vercel 設定で構成されています。

## 機能概要
- 静的サイト（フレームワーク非依存）
- 国際化（i18n）
  - 日本語（デフォルト）と英語（`/en/`）の並行配置
  - 各ページに `canonical` / `og:url` / `hreflang` を設定
  - ヘッダに言語切替リンク
  - 英語ページで外部の英語版が存在しない場合は通常版へ自動フォールバック（`data-fallback-url` + HEAD チェック）
- SEO / メタ
  - `sitemap.xml`（末尾スラッシュありで統一）
  - `manifest.webmanifest`（PWAは無効化：`assets/site.js` で既存 SW を unregister）
  - OGP / Twitter Card / 構造化データ（`application/ld+json`）
- セキュリティヘッダ（`vercel.json`）
  - CSP / Referrer-Policy / Permissions-Policy / X-Content-Type-Options

## ディレクトリ構成（抜粋）
- `index.html` … トップ（日本語）
- `apps/awardcert/index.html` / `apps/voicycare/index.html` … 各アプリ概要（日本語）
- `en/` … 英語版
  - `en/index.html`
  - `en/apps/awardcert/index.html`
  - `en/apps/voicycare/index.html`
  - `en/privacy.html`, `en/terms.html`, `en/contact.html`
- `assets/` … 画像・アイコン・スクリプト等
  - `assets/site.js` … 年の自動更新、SW無効化、英語外部リンクのフォールバック処理
  - `assets/analytics.js` … アナリティクス（必要に応じて）
- `style.css` … 共通スタイル
- `sitemap.xml` … サイトマップ
- `vercel.json` … 配信設定（`trailingSlash: true` など）

## URL方針
- ディレクトリ型URL: 末尾スラッシュあり（例: `/`, `/en/`, `/en/privacy/`, `/apps/awardcert/`）
- ファイル（`.css`/`.js`/画像等）: 末尾スラッシュなし
- `vercel.json` の `trailingSlash: true` に整合するよう、`canonical` / `og:url` / `hreflang` / パンくず / 内部リンク / `sitemap.xml` を全て同一表記に統一しています。

## ローカル開発
任意の静的サーバで配信してください。ビルドは不要です。

例（Python）:
```bash
cd honeymarron-website
python3 -m http.server 4321
# http://localhost:4321 で確認
```

例（Nodeの簡易サーバ）:
```bash
npx serve -l 4321 .
```

## デプロイ
- Vercel を想定しています（他の静的ホスティングでも可）
- `vercel.json` のポイント
  - `cleanUrls: true`
  - `trailingSlash: true`
  - 静的アセットに長期キャッシュ
  - CSP を含むセキュリティヘッダを付与

## 国際化（i18n）
- 英語版は `/en/` 配下にファイルを配置
- `hreflang` は `ja` / `en` / `x-default` を各ページ `<head>` に設定
- 英語ページの外部リンクで英語版が存在しない場合、`data-fallback-url` に指定された通常版へ切り替え

## 関連リンク
- 公開サイト: https://honeymarron.com/

## ポリシー
- 個人情報（PII）はリポジトリに含めません
- 問い合わせ・ポリシーの詳細は各プロダクト公式サイトにリンクします

## 貢献
本リポジトリは個人サイト用のため、外部からのコントリビューションは想定していません。

## ライセンス
本リポジトリのコンテンツおよびコードは無断転載・再利用を禁じます（All rights reserved）。必要な場合は事前に許可を取得してください。
