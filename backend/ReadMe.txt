Attention , pour la sécurité de l'application , certaines ressources ne sont pas disponible sur le repo GitHub : 

- Créez un dossier "images" dans le dossier "backend". Ce dossier contiendra les images publiées par les utilisateurs. 

- Ce projet contient des variables d'environnement : Renommez le fichier ".env-exemple" en ".env"

        Dans ce fichier (.env) : La variable DB_URL correspond à l'adresse de la base de données souhaitée.

                                 La variable JWT_KEY correspond à la clé secrète du token d'authentification. 

        Vous pouvez alors connecter votre base de données et rédiger la clé secrète que vous voulez.

- Pour lancer le projet : Merci d'utiliser la ligne de commande et de vous situer sur le dossier concerné. 

        - Lancement du frontend (dossier frontend) : "npm start" 

        - Lancement du backend (dossier backend) : "npm install" pour installer les dépendances.

                                                   "nodemon server" pour lancer le serveur.

- Pour se créer un compte , j'ai ajouté un middleware password validator , voici la syntaxe à respecter pour le mot de passe : 

        - 5 Caractères minimum / 25 maximum.
        - 2 Majuscules minimum.
        - 2 Chiffres minimum.
        - Pas d'espace.

- Ce projet contient aussi un middleware "Helmet" dans mon app.js qui interfère avec les CORS , j'ai rajouté :

        "res.setHeader('Cross-Origin-Resource-Policy','same-site')" Afin que les images puissent être lues. 


