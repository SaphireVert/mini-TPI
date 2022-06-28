# mini-TPI

# Manuel d'Installation
## Pré-requis
Pour installer l’application, il faut s'assurer d'avoir installé au préalable les applications suivantes sur sa machine : 
Docker, docker-compose
Make (optionnel)
## Démarrage
Commencez par cloner le projet : 

```git clone git@github.com:SaphireVert/mini-TPI.git```

Si vous avez installé make sur votre machine, il suffira de vous placer à la racine du projet et lancer la commande : 

`make up`

Autrement, vous devrez vous déplacer dans le dossier docker

`cd docker`

et utiliser la commande suivante : 

`docker-compose up --remove-orphans --build`

Note : lors du premier démarrage, la base de données importe le dump SQL, ce qui résulte en l’apparition d’une erreur de l’API qui n’arrive pas à se connecter à la base de données. Pour y remédier il suffit de relancer la commande.

# Manuel d'Utilisation
Pour utiliser le site, une fois le projet démarré rendez-vous à l’adresse “http://localhost:3000”
Vous atterrissez sur la page d’accueil du site. Vous pouvez naviguer entre les différentes pages en cliquant sur les liens de la navbar dans le header.
La page mangas vous offre la possibilité de naviguer parmi les 100 mangas grâce à une table contenant une pagination ainsi que la possibilité de choisir combien d’éléments doivent être affichés par page. 
Un y a également une barre de recherche permettant de chercher parmi les titres.
Pour accéder à la page Swagger, cliquez sur le lien “API” dans le header
