# Groupomania (API)

Réseau social interne pour Groupomania, entreprise spécialisée dans la grande distribution (MVP).

## Tech Stack

NodeJS, TypeScript, Express, Prisma, MySQL

## Fonctionnalités

### Authentification

- Authentification par token JWT
- Mots de passe hashés avec Bcrypt
- Gestion des rôles (_user_, _moderator_)

### CRUD

- Publications
- Commentaires
- Likes
- Abonnements
- Profil utilisateur
- Signalements

### Autres

- Upload de fichiers avec Multer
- Validation des données avec Yup

### Sécurité

- Helmet
- Rate Limit

## Variables d'environnement

Avant de démarrer le projet, vous devez ajouter les variables d'environnement suivantes dans un fichier .env.

`DATABASE_URL = mysql://USER:PASSWORD@HOST:PORT/DATABASE`

`TOKEN_SECRET = XXXXXXXX`

## Démarrage

Pour commencer, assurez-vous d'avoir créé une base de données MySQL vide et d'avoir renseigné son URL dans le fichier .env.

#### Installer les dépendances

```bash
npm install
```

#### Migrer la base de données

```bash
npx prisma migrate deploy
```

#### Insérer les données initiales

```bash
npx prisma db seed
```

#### Démarrer le serveur

```bash
npm start
```
