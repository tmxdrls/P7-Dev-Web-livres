Pour lancer le projet , merci d'utiliser la ligne de commande et de vous situer sur le dossier concerné. 

- Lancement du frontend : npm start 

- Lacement du backend : nodemon server 

- Ce projet contient des variables d'environnement. Les noms des variables se trouvent dans le fichier ".env-exemple"

- Pour se créer un compte , j'ai ajouté un middleware password validator , voici les conditions à respecter pour le mot de passe : 

        - 5 Caractères minimum / 25 maximum.
        - 2 Majuscules minimum.
        - 2 Chiffres minimum.
        - Pas d'espaces.
        

- Ce projet contient aussi un middleware Helmet qui interfère avec les CORS j'ai rajouté :

"res.setHeader('Cross-Origin-Resource-Policy','same-site')" Afin que les images puissent être lu. 


