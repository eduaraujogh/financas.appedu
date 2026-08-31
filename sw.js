/* Service worker do painel Finanças.
   Estratégia: rede primeiro para o HTML (para você sempre pegar a versão nova),
   com o cache como rede de segurança quando estiver sem internet. */
const CACHE='financas-v1';
const ESSENCIAL=['./','./index.html','./manifest.webmanifest',
  './icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ESSENCIAL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;                       /* nunca toca nas chamadas ao GitHub */
  const url=new URL(req.url);
  if(url.origin!==location.origin) return;             /* api.github.com passa direto */
  e.respondWith(
    fetch(req).then(r=>{
      const copia=r.clone();
      caches.open(CACHE).then(c=>c.put(req,copia)).catch(()=>{});
      return r;
    }).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html')))
  );
});
