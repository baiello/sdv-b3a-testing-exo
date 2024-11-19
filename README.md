## Prérequis

### Sous Linux/Mac :

1. [Installer NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
2. Utiliser la version 18.16.1 de NodeJS : `nvm use 18.16.1`
3. Vérifier la version de node intallée : `node -v`

### Sous Windows :

1. [Installer NVM](https://github.com/coreybutler/nvm-windows/releases/latest)
2. Utiliser la version 18.16.1 de NodeJS : `nvm use 18.16.1`
3. Vérifier la version de node intallée : `node -v`
4. Ouvrir Powershell en mode administrateur
5. Entrer la commande "Set-ExecutionPolicy RemoteSigned" pour pouvoir gérer l’execution de scripts dans powershell
6. Fermer toutes les instances de terminal
7. Entrer la commande `npm install -g win-node-env` pour installer la gestion des variables d’environnement node pour window

## Lancement de l'API

1. `cd Back`
2. Installer les dépendances du projet : `npm install`
3. Lancer l'API : `npm run run:dev`

## Lancement de l'application Front
1. `cd Front`
2. Installer les dépendances du projet : `npm install`
3. Installer live-server : `npm install -g live-server`
4. Lancer l'application : `live-server`
