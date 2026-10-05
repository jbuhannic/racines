/* =====================================================================
   ARTICLES DE LA PAGE LCA  (affichés dans la section « Activités »)

   POUR AJOUTER UN ARTICLE : copie un bloc { ... }, du « { » jusqu'au « }, »,
   colle-le à la fin de la liste (juste avant le « ]; » final), puis change
   les textes. Les textes se mettent entre apostrophes inversées ` ` (touche
   AltGr + 7) : tu peux y écrire librement des apostrophes ' et des guillemets « ».
   Une virgule doit rester après chaque « } ».

   Champs :
     date      : ce qui s'affiche en petit au-dessus du titre (obligatoire)
     titre     : le titre de l'article (obligatoire)
     photos    : une ou plusieurs photos { fichier, legende } (facultatif)
                 fichier = chemin de la photo, par exemple img/ma-photo.jpg
     texte     : le texte ; laisse une ligne vide entre deux paragraphes (facultatif)
     notabene  : le petit mot sur le papier jaune (facultatif)
     lien      : { texte, url } un lien sous le papier jaune (facultatif)

   Les articles défilent dans l'ordre de cette liste.
   ===================================================================== */
window.ARTICLES = [

  {
    date: `Octobre — Terminale`,
    titre: `Projet « Entretien d'embauche de philosophes »`,
    photos: [
      { fichier: `img/philosophes-entretien.jpg`, legende: `Photo de leçon : projet « entretien d'embauche de philosophes », terminale, octobre.` }
    ],
    notabene: `Les élèves ont dû défendre leur philosophe face à un jury — beaucoup d'arguments inattendus.`
  },

  {
    date: `Novembre — Première`,
    titre: `Projet « Mariages »`,
    photos: [
      { fichier: `img/projet-mariages.jpg`, legende: `Photo d'élèves : projet « mariages », première, novembre.` }
    ],
    notabene: `Chaque costume devait correspondre à une coutume matrimoniale antique précise.`
  },

  {
    date: `Décembre`,
    titre: `Atelier archéologie : reconstituer une poterie`,
    photos: [
      { fichier: `img/poterie-puzzle.jpg`, legende: `Reconstitution de tessons — travail d'équipe autour du questionnaire de fouille.` }
    ],
    notabene: `À refaire en début d'année prochaine : une très bonne accroche pour parler de méthode archéologique.`
  },

  {
    date: `Janvier — Terminale`,
    titre: `Graver la mémoire`,
    photos: [
      { fichier: `img/stele-terminee.jpg`, legende: `Stèle achevée — épitaphe dédiée à « Elisabetha Secunda, Regina Britanniae ».` }
    ],
    texte: `Les musées en regorgent : les stèles funéraires font l'objet d'un soin particulier qui leur permet de traverser les siècles. Elles sont pour nous une mine d'informations.

En Terminale, les élèves ont d'abord étudié de vraies épitaphes romaines : leur évolution, leur rhétorique, les codes des abréviations, leur graphie si particulière. Puis ils ont inventé pour un personnage célèbre la leur — en latin — avant de la graver, à leur tour, dans l'argile.`,
    notabene: `Les personnages choisis allaient de la reine d'Angleterre à des figures bien plus inattendues.`
  },

  {
    date: `Terminale HLP & LCA`,
    titre: `Prométhée, ou la révolte qui n'en finit pas`,
    photos: [
      { fichier: `img/promethee-1.jpg`, legende: `Intervention « Horizons antiques » — Journées Découvrir l'Antiquité.` },
      { fichier: `img/promethee-2.jpg`, legende: `Les deux intervenantes présentent la figure de Prométhée à la classe.` }
    ],
    texte: `Voler le feu des dieux, le donner aux hommes, en payer le prix pour l'éternité : peu de figures antiques ont autant voyagé à travers les siècles que Prométhée.

Dans le cadre des Journées Découvrir l'Antiquité et de leur programme « Horizons antiques », nous avons accueilli deux jeunes chercheuses venues retracer avec nous cette figure, d'Eschyle jusqu'à Frankenstein. Une manière de voir comment un mythe grec continue, aujourd'hui encore, à nourrir notre imaginaire.`,
    notabene: `Intervention gratuite, proposée par des étudiant·e·s et jeunes chercheur·e·s de l'ENS.`,
    lien: { texte: `En savoir plus sur l'association →`, url: `https://sites.google.com/site/lesitejda/` }
  }

];
