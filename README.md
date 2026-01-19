# Projet Backend "What The Dog"

Code à tester disponible sur sur la branche `main`.

## Auteurs
Fabian Rostello, Nathan Filipowitz, Imad El Khattabi et David Galindo (SI-CA2a)
## Description
Concevoir une API permettant de gérer toutes les données d'une entreprise qui soigne les chiens de ses clients.

## Pré-requis
### Git - version control system (VCS)
- **Installation** : https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- **Vérification** :
```bash
git --version
```

### JetBrains IntelliJ - Integrated Development Environment (IDE)
- **Installation** : https://www.jetbrains.com/help/idea/installation-guide.html
- **Vérification** :
```bash
webstorm --version
```

### NPM - Gestion de dépendances pour Java script
- **Installation** : [Il est recommendé d'installer NPM en même temps que Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
  [se réferer à l'installation de Node JS](https://nodejs.org/en/download/).
- **Vérification** :
```bash
npm --version
```

## Packages utilisés
- express
- dotenv
- mysql2
- nodemon

### Configuration

#### Comment mettre en place la base de donnée ?
Exécutez le fichier `Documentation/Base de donnee/create_insert_whatthedogs_db.sql`

## Déploiement
1. Créer un fichier `.env` à la racine du dossier avec:
```env
HOST=localhost
USER=votre_utilisateur
PASSWORD=votre_mot_de_passe
DATABASE=whatthedog
PORT=3000
```

2. exécutez `npm install`
3. exécutez `npm run start`

## Structure du dossier

```shell
├───db
├───Documentation
│   └───Base de donnee
├───model
├───node_modules
├───routes
└───service
```

