Pour lancer le projet , merci d'utiliser la ligne de commande et de vous situer sur le dossier concerné. 

Lancement du frontend : npm start 

Lacement du backend : nodemon server 

Ce projet contient des variables d'environnement. Les noms des variables se trouvent dans le fichier ".env-exemple"

Ce projet contient aussi un middleware Helmet qui interfère avec les CORS j'ai rajouté :

"res.setHeader('Cross-Origin-Resource-Policy','same-site')" Afin que les images puissent être lu. 


