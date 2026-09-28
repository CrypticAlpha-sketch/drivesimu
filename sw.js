// ルークスで運転練習 - オフライン用サービスワーカー
// three.min.js やアイコンを差し替えたときは、VERSION の数字を上げてください。
const VERSION='roox-v1';
const FONTS='roox-fonts';
const CORE=['./','./index.html','./manifest.webmanifest','./three.min.js','./icon.svg','./icon-192.png','./icon-512.png',
  './maskable-192.png','./maskable-512.png','./apple-touch-icon.png','./favicon-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    if(r.mode==='navigate'){ // ページ本体：ネット優先（更新がすぐ反映される）、オフラインならキャッシュ
      e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put('./index.html',cp));}return res;})
        .catch(()=>caches.match('./index.html').then(h=>h||Response.error())));
      return;
    }
    e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));}return res;})));
    return;
  }
  if(/^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(u.hostname)){ // フォント等：キャッシュがあれば即使い、裏で更新
    e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(h=>{
      const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res;}).catch(()=>h||Response.error());
      return h||net;})));
  }
});
