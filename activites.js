/* =====================================================================
   « ACTIVITÉS » : carrousel d'articles (utilisé par lca.html et hlp.html)
   Les articles sont dans articles-lca.js et articles-hlp.js : c'est là
   que tu ajoutes ou modifies un article. Ce fichier-ci n'a pas à être touché.
   ===================================================================== */
(function(){
  var CSS = [
    '.act-wrap{position:relative;}',
    '.act-outer{overflow-x:auto;overflow-y:hidden;cursor:grab;scrollbar-width:none;-ms-overflow-style:none;padding:4px 0 12px;}',
    '.act-outer::-webkit-scrollbar{display:none;}',
    '.act-outer.glisse{cursor:grabbing;user-select:none;}',
    '.act-outer:focus-visible{outline:3px solid var(--act-accent,#B5502E);outline-offset:4px;border-radius:12px;}',
    '.act-track{display:flex;width:max-content;}',
    '.act-set{display:flex;gap:20px;padding-right:20px;}',
    '.act-carte{width:min(600px,86vw);flex-shrink:0;background:#fff;border:1px solid var(--border,#E4DDD0);border-radius:16px;padding:20px;align-self:flex-start;}',
    '.act-date{font-family:Arial,Helvetica,sans-serif;font-size:12px;color:var(--act-accent-dark,#7A3319);margin-bottom:6px;}',
    '.act-titre{font-family:Cambria,Georgia,serif;font-size:21px;line-height:1.25;margin-bottom:14px;}',
    '.act-photo{width:100%;height:320px;object-fit:cover;object-position:center 30%;border-radius:10px;border:1px solid var(--border,#E4DDD0);display:block;background:var(--act-accent-light,#F3E3D3);}',
    '.act-photo + .act-photo,.act-legende + .act-photo{height:220px;margin-top:6px;}',
    '.act-legende{font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6B6760;margin:8px 0 14px;font-style:italic;}',
    '.act-texte{margin-bottom:14px;} .act-texte p{font-size:15px;color:#6B6760;margin-bottom:10px;line-height:1.6;}',
    '.act-postit{margin-top:6px;background:#F0DFA0;padding:12px 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#5B4A1F;transform:rotate(-1deg);border-radius:2px;margin-top:6px;}',
    '.act-postit .label{font-size:10px;text-transform:uppercase;letter-spacing:.04em;opacity:.7;margin-bottom:6px;display:block;}',
    '.act-postit a{color:#5B4A1F;text-decoration:underline;display:inline-block;margin-top:6px;}',
    '.act-fleche{position:absolute;top:calc(50% - 22px);z-index:3;width:44px;height:44px;border-radius:50%;border:1px solid var(--border,#E4DDD0);background:#fff;color:var(--act-accent-dark,#7A3319);font-size:26px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.12);padding:0 0 3px;}',
    '.act-fleche:hover{background:var(--act-accent-light,#F3E3D3);}',
    '.act-fleche:focus-visible{outline:3px solid var(--act-accent,#B5502E);outline-offset:2px;}',
    '.act-prec{left:-14px;} .act-suiv{right:-14px;}',
    '.act-vide{color:#6B6760;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-style:italic;padding:12px 0;}',
    '@media(max-width:700px){.act-photo{height:220px;} .act-photo + .act-photo{height:170px;} .act-prec{left:-6px;} .act-suiv{right:-6px;}}'
  ].join('\n');

  function el(tag, cls, texte){ var e = document.createElement(tag); if(cls) e.className = cls; if(texte != null) e.textContent = texte; return e; }

  function carte(a){
    var c = el('article','act-carte');
    if(a.date) c.appendChild(el('div','act-date', a.date));
    c.appendChild(el('h3','act-titre', a.titre || ''));
    (a.photos || []).forEach(function(p, i){
      var img = el('img','act-photo');
      img.src = p.fichier; img.alt = p.alt || p.legende || ''; img.loading = 'lazy'; img.decoding = 'async';
      img.draggable = false;
      c.appendChild(img);
      if(p.legende) c.appendChild(el('div','act-legende', p.legende));
    });
    if(a.texte){
      var t = el('div','act-texte');
      String(a.texte).split(/\n\s*\n/).forEach(function(par){ if(par.trim()) t.appendChild(el('p', null, par.trim())); });
      c.appendChild(t);
    }
    if(a.notabene || a.lien){
      var n = el('div','act-postit');
      n.appendChild(el('span','label','Nota bene'));
      if(a.notabene) n.appendChild(document.createTextNode(a.notabene));
      if(a.lien && a.lien.url){
        n.appendChild(document.createElement('br'));
        var l = el('a', null, a.lien.texte || a.lien.url); l.href = a.lien.url; l.target = '_blank'; l.rel = 'noopener';
        n.appendChild(l);
      }
      c.appendChild(n);
    }
    return c;
  }

  function demarrer(){
    var racine = document.getElementById('activites');
    if(!racine) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var articles = Array.isArray(window.ARTICLES) ? window.ARTICLES : [];
    if(!articles.length){ racine.appendChild(el('p','act-vide', 'Les premiers articles arrivent bientôt.')); return; }

    var wrap = el('div','act-wrap'), outer = el('div','act-outer'), track = el('div','act-track');
    outer.tabIndex = 0; outer.setAttribute('role','region'); outer.setAttribute('aria-label','Activités menées en classe : utilise les flèches gauche et droite');
    outer.appendChild(track); wrap.appendChild(outer);
    racine.appendChild(wrap);

    function jeu(){ var s = el('div','act-set'); articles.forEach(function(a){ s.appendChild(carte(a)); }); return s; }
    track.appendChild(jeu());
    var seul = articles.length === 1;
    var unite = track.firstChild.offsetWidth;           // largeur d'un jeu complet (cartes + espaces)
    var pas = unite / articles.length;                    // distance d'une carte à la suivante
    if(!seul){
      var copies = Math.max(2, Math.ceil(outer.clientWidth / unite) + 1);
      for(var i = 1; i < copies; i++) track.appendChild(jeu());
    }

    var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var vitesse = (seul || reduit) ? 0 : 0.7;
    var pos = 0, dernier = 0, anim = null, pauseJusqua = 0, survol = false, appuye = false, deplace = false, x0 = 0, s0 = 0;

    function sync(){ if(Math.abs(outer.scrollLeft - dernier) > 1.5) pos = outer.scrollLeft; }
    function appliquer(){ outer.scrollLeft = pos; dernier = outer.scrollLeft; }
    function boucler(){
      if(seul) return;
      if(pos >= unite){ pos -= unite; if(anim){ anim.de -= unite; anim.vers -= unite; } appliquer(); }
      else if(pos <= 0){ pos += unite; if(anim){ anim.de += unite; anim.vers += unite; } appliquer(); }
    }
    function aller(sens){
      if(seul) return;
      sync();
      // on se cale toujours sur le DÉBUT d'une carte : la suivante (sens 1) ou la précédente (sens -1)
      var k = sens > 0 ? Math.floor(pos / pas + 0.02) + 1 : Math.ceil(pos / pas - 0.02) - 1;
      if(k < 0){ pos += unite; appliquer(); k = Math.ceil(pos / pas - 0.02) - 1; }
      anim = { de: pos, vers: k * pas, t0: performance.now(), duree: 550 };
      pauseJusqua = Date.now() + 7000;
    }
    function tic(now){
      sync();
      if(anim){
        var p = Math.min(1, (now - anim.t0) / anim.duree), e = 1 - Math.pow(1 - p, 3);
        pos = anim.de + (anim.vers - anim.de) * e; appliquer();
        if(p >= 1) anim = null;
      } else if(vitesse && !survol && !appuye && Date.now() > pauseJusqua){
        pos += vitesse; appliquer();
      }
      boucler();
      requestAnimationFrame(tic);
    }
    if(!seul){
      var prec = el('button','act-fleche act-prec','‹'), suiv = el('button','act-fleche act-suiv','›');
      prec.type = suiv.type = 'button';
      prec.setAttribute('aria-label','Article précédent'); suiv.setAttribute('aria-label','Article suivant');
      prec.addEventListener('click', function(){ aller(-1); });
      suiv.addEventListener('click', function(){ aller(1); });
      wrap.appendChild(prec); wrap.appendChild(suiv);
      pos = pas * 0; outer.scrollLeft = 1; dernier = outer.scrollLeft; pos = dernier;
      outer.addEventListener('keydown', function(ev){ if(ev.key === 'ArrowRight'){ ev.preventDefault(); aller(1); } if(ev.key === 'ArrowLeft'){ ev.preventDefault(); aller(-1); } });
      outer.addEventListener('mouseenter', function(){ survol = true; });
      outer.addEventListener('mouseleave', function(){ survol = false; appuye = false; outer.classList.remove('glisse'); });
      outer.addEventListener('focusin', function(){ pauseJusqua = Date.now() + 7000; });
      outer.addEventListener('touchstart', function(){ pauseJusqua = Date.now() + 7000; anim = null; }, { passive: true });
      outer.addEventListener('mousedown', function(e){ appuye = true; deplace = false; anim = null; outer.classList.add('glisse'); x0 = e.pageX; s0 = outer.scrollLeft; });
      window.addEventListener('mouseup', function(){ appuye = false; outer.classList.remove('glisse'); });
      outer.addEventListener('mousemove', function(e){
        if(!appuye) return; e.preventDefault();
        var d = e.pageX - x0; if(Math.abs(d) > 3) deplace = true;
        outer.scrollLeft = s0 - d;
      });
      outer.addEventListener('click', function(e){ if(deplace){ e.preventDefault(); e.stopPropagation(); deplace = false; } }, true);
      requestAnimationFrame(tic);
    }
    window.__activites = { aller: aller, pas: function(){ return pas; }, unite: function(){ return unite; } };   // (utile aux tests)
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer); else demarrer();
})();
