ルークスで運転練習（PWA版）

■ 中身
  index.html            アプリ本体（このファイル1つでも、ネット接続があれば動きます）
  three.min.js          3D表示のライブラリ（three.js r128・MITライセンス）
  manifest.webmanifest  アプリ名・アイコン・画面の向きなどの設定
  sw.js                 オフラインでも起動できるようにする仕組み
  icon.svg              アイコンの元データ（編集用）
  icon-192.png / icon-512.png          ふつうのアイコン
  maskable-192.png / maskable-512.png  Android用（丸く切り抜かれても大丈夫な版）
  apple-touch-icon.png  iPhone用
  favicon-32.png        ブラウザのタブ用
  ※ すべて同じ階層に置いたまま、アップロードしてください。

■ PWAとして使うには
  1. このフォルダの中身を、HTTPS のサイトにそのままアップロードします。
     （例：GitHub Pages、Netlify、Cloudflare Pages など。PWAは https でしか動きません）
  2. スマホでそのURLを開きます。
     ・iPhone：Safari の共有ボタン →「ホーム画面に追加」
     ・Android：Chrome のメニュー（︙）→「アプリをインストール」または「ホーム画面に追加」
  3. ホーム画面のアイコンから起動すると、全画面のアプリとして動きます。
     一度開けば、電波のない所でも起動できます。

■ 設定メモ
  ・画面の向きは「横」に固定しています（傾きハンドルで画面が勝手に回らないように）。
    縦でも使いたい場合は manifest.webmanifest の "orientation": "landscape" を "any" に変えてください。
    ※ iPhone はこの設定を使わず、端末の向きに従います。
  ・合格スタンプや設定は、スマホの中（そのサイトごと）に保存されます。
  ・index.html を直したときは、次に開いたとき自動で新しい版になります。
    three.min.js やアイコンを差し替えたときは、sw.js の VERSION（roox-v1）を roox-v2 のように変えてください。
