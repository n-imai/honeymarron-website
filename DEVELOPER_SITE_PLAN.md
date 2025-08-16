## 開発者サイト（Developer Site）設計ドキュメント（暫定）

- **目的**: 製品横断の公式窓口を一本化し、`app-ads.txt` をルートドメイン直下で安定運用。製品ごとの情報やサポート動線を集約。
- **新リポジトリ**: `honeymarron-website`
- **ドメイン**: `https://honeymarron.com/`（本サイト）
  - 製品サイト（現状維持）
    - 表彰状クリエイター: `https://awardcert.honeymarron.com/`
    - VoicyCare: `https://voicy-care.honeymarron.com/`
- **公開/ホスティング**: Vercel/Netlify/Cloudflare Pages（PRプレビュー＋main自動デプロイ）

### 必須要件

- **app-ads.txt をルート直下に設置**（リダイレクトなし・200で直接取得）
```
google.com, pub-6841615558903359, DIRECT, f08c47fec0942fa0
```

- **robots.txt**（Google-adstxt クローラー許可＋サイトマップ）
```
User-agent: Google-adstxt
Disallow:

User-agent: *
Allow: /
Sitemap: https://honeymarron.com/sitemap.xml
```

- **sitemap.xml**（ルート＋主要下層ページ）
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://honeymarron.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://honeymarron.com/apps/awardcert</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://honeymarron.com/apps/voicycare</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://honeymarron.com/privacy</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>https://honeymarron.com/terms</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>https://honeymarron.com/contact</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  
</urlset>
```

- **App Store / AdMob の参照先を統一**
  - App Store Connect「デベロッパWebサイト」→ `https://honeymarron.com/`
  - AdMob 各アプリの「app-ads.txt ドメイン」→ `honeymarron.com`
  - AdMob で「アップデートを確認」を実行（反映に数時間かかることあり）

### 情報設計

- **トップ（index.html）**: 開発者ブランド概略、製品リンク、サポート、プライバシー
- **アプリ概要ページ（軽量）**: `apps/awardcert`, `apps/voicycare` に製品概要＋「詳しくは各製品サイトへ」導線
- **リンク先**
  - 表彰状クリエイター → `https://awardcert.honeymarron.com/`
  - VoicyCare → `https://voicy-care.honeymarron.com/`（App Store: `https://apps.apple.com/jp/app/id6749561636`）
- **サポート/ポリシー**: デベロッパポリシーと各製品ポリシーへのリンク集

### 最小ディレクトリ構成（新リポ: honeymarron-website）

```
honeymarron-website/
  ├─ index.html                 # トップ（製品リンク＋開発者情報）
  ├─ apps/
  │   ├─ awardcert/index.html   # 概要ページ（軽量・リンク集）
  │   └─ voicycare/index.html   # 概要ページ（軽量・リンク集）
  ├─ assets/                    # 共有画像/アイコン
  ├─ style.css
  ├─ app-ads.txt
  ├─ robots.txt
  └─ sitemap.xml
```

### メタ/計測

- OGP/Twitterカード/`canonical` を設定（ルートは `https://honeymarron.com/`）
- GA4（共有プロパティ）を導入（各製品サイトとはプロパティ分離でも可）

### アクセシビリティ/モバイル

- セーフエリア対応（iOS Safari `env(safe-area-inset-*)`）
- フォントサイズ/コントラスト/タップ領域（48px以上）を基準化

### 運用フロー

- main 直pushで本番自動デプロイ、PRはプレビュー自動生成
- `app-ads.txt` 変更後は AdMob 側で「アップデートを確認」
- Search Console に `honeymarron.com` を登録し `sitemap.xml` 送信、主要URLで「インデックス登録をリクエスト」

### 将来拡張（任意）

- ニュース/お知らせ（Markdown→静的生成）
- プロフィール/メディアキット（ロゴ/スクリーンショット）
- 法的文書（統合版プライバシーポリシー/利用規約）

### 初回タスクチェックリスト

- [ ] リポジトリ `honeymarron-website` を作成
- [ ] `index.html` と製品概要ページを作成
- [ ] `app-ads.txt` / `robots.txt` / `sitemap.xml` を設置
- [ ] ホスティング接続とドメイン紐付け（`honeymarron.com`）
- [ ] App Store/AdMob の参照ドメインを `honeymarron.com` に変更
- [ ] AdMob で「アップデートを確認」
- [ ] Search Console 登録＋サイトマップ送信

### 補足

- サブドメイン側にも `app-ads.txt` を置いても害はありませんが、検証先は `honeymarron.com` に統一。
- 既存製品サイトは現行のサブドメイン運用を継続し、デベロッパサイトからリンクで案内。


