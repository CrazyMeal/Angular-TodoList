Examen-AIA-Paquet
=================

Ce projet a été réalisé pour l'examen d'Application Internet Avancée
Il s'agit d'une appli web permettant de faire une TodoList. Une Todo possède un titre et un état (réalisée ou non).

La frontend est réalisé avec AngularJS et le backend est fait avec Spring boot.

 - les Todo non validées sont en clair, les validées sont rayées et plus foncées
 - valider une Todo se fait avec la coche
 - éditer la Todo avec le crayon
 - la supprimer avec la croix
 - le ratio Todo validées/Totalité des Todos se visualise grace à la progressbar.
  
Toute modification/supression/ajout est synchronisée avec le serveur, donc il n'y a pas besoin de rafraichir la page ou autre.

Pour exécuter l'application, il suffit d'importer le projet en tant que projet Maven, si jamais il y a une erreur Maven, faire un "Maven -> Update Project".
