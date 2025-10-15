# 🧠 Application de Quiz Interactive

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<div align="center">
  <h3>🎯 Une expérience de quiz moderne, interactive et engageante</h3>
  <p>Testez vos connaissances avec une interface élégante et des animations fluides</p>
</div>

---

## 📋 Table des Matières

- [🎯 Aperçu du Projet](#-aperçu-du-projet)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies Utilisées](#️-technologies-utilisées)
- [🚀 Installation et Configuration](#-installation-et-configuration)
- [📁 Structure du Projet](#-structure-du-projet)
- [🎮 Utilisation](#-utilisation)
- [📱 Interface Utilisateur](#-interface-utilisateur)
- [🧪 Tests](#-tests)
- [🚀 Déploiement](#-déploiement)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)
- [👥 Auteurs](#-auteurs)

---

## 🎯 Aperçu du Projet

L'**Application de Quiz Interactive** est une application web moderne développée avec React et TypeScript qui offre une expérience de quiz immersive et engageante. Conçue avec une interface utilisateur élégante et des animations fluides, cette application permet aux utilisateurs de tester leurs connaissances de manière interactive.

### 🌟 Points Forts

- **Interface Moderne** : Design épuré avec Tailwind CSS
- **Animations Fluides** : Transitions élégantes avec Framer Motion
- **Responsive Design** : Adapté à tous les appareils
- **Performance Optimisée** : Construction rapide avec Vite
- **Type Safety** : Développé en TypeScript pour une meilleure robustesse

---

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- ✅ Design moderne et responsive utilisant Tailwind CSS
- ✅ Animations fluides avec Framer Motion
- ✅ Navigation intuitive entre les questions
- ✅ Affichage clair des questions et des réponses
- ✅ Barre de progression pour suivre l'avancement
- ✅ Thème sombre/clair avec persistance des préférences

### 📝 Gestion des Questions
- ✅ Affichage des questions une par une
- ✅ Options de réponse multiples
- ✅ Feedback immédiat après chaque réponse
- ✅ Système de score en temps réel
- ✅ Chronomètre optionnel pour chaque question
- ✅ Mélange aléatoire des questions et réponses

### 🏆 Système de Score
- ✅ Calcul automatique des points
- ✅ Affichage du score final avec statistiques détaillées
- ✅ Historique des performances
- ✅ Classement des meilleurs scores
- ✅ Sauvegarde locale des résultats

### 👤 Expérience Utilisateur
- ✅ Interface intuitive et facile à utiliser
- ✅ Messages de feedback personnalisés
- ✅ Possibilité de recommencer le quiz
- ✅ Sauvegarde automatique de la progression
- ✅ Gestion des noms d'utilisateurs

---

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI moderne
- **TypeScript** - Typage statique pour JavaScript
- **React Router** - Navigation côté client
- **React Context** - Gestion d'état global

### Styling & Animations
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animations
- **CSS Modules** - Styles modulaires

### Outils de Développement
- **Vite** - Outil de build rapide
- **ESLint** - Linter JavaScript/TypeScript
- **Prettier** - Formatage de code
- **Axios** - Client HTTP

### Hooks Personnalisés
- **useLocalStorage** - Persistance des données locales
- **useQuiz** - Logique métier du quiz
- **useTheme** - Gestion des thèmes

---

## 🚀 Installation et Configuration

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn ou pnpm

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/quiz-app.git
cd quiz-app
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configurer l'environnement**
```bash
cp .env.example .env.local
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Ouvrir l'application**
```
http://localhost:5173
```

### Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Construit l'application pour la production |
| `npm run preview` | Prévisualise la build de production |
| `npm run lint` | Exécute ESLint |
| `npm run type-check` | Vérifie les types TypeScript |
| `npm run test` | Lance les tests |

---

## 📁 Structure du Projet

```
quiz-app/
├── public/                     # Fichiers statiques
│   ├── assets/                 # Images et icônes
│   └── vite.svg               # Favicon
├── src/                       # Code source
│   ├── components/            # Composants réutilisables
│   │   ├── Footer.tsx         # Pied de page
│   │   ├── Layout.tsx         # Layout principal
│   │   ├── Navbar.tsx         # Barre de navigation
│   │   ├── ProgressBar.tsx    # Barre de progression
│   │   └── Quiz.tsx           # Composant principal du quiz
│   ├── contexts/              # Contextes React
│   │   └── ThemeContext.tsx   # Gestion des thèmes
│   ├── hooks/                 # Hooks personnalisés
│   │   └── useLocalStorage.ts # Hook pour localStorage
│   ├── pages/                 # Pages principales
│   │   ├── AcceuilPage.tsx    # Page d'accueil
│   │   ├── Home.tsx           # Page d'accueil
│   │   └── Results.tsx        # Page des résultats
│   ├── types/                 # Définitions TypeScript
│   │   └── index.ts           # Types globaux
│   ├── utils/                 # Fonctions utilitaires
│   │   └── api.ts             # Appels API
│   ├── App.tsx                # Composant racine
│   ├── main.tsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── .env.example              # Variables d'environnement exemple
├── .gitignore               # Fichiers ignorés par Git
├── package.json             # Dépendances et scripts
├── README.md               # Documentation
├── tailwind.config.js      # Configuration Tailwind
├── tsconfig.json          # Configuration TypeScript
└── vite.config.ts         # Configuration Vite
```

---

## 🎮 Utilisation

### 🏠 Page d'Accueil
1. Entrez votre nom d'utilisateur
2. Sélectionnez le niveau de difficulté (optionnel)
3. Cliquez sur "Commencer le Quiz"

### 📝 Pendant le Quiz
1. Lisez attentivement chaque question
2. Sélectionnez votre réponse parmi les options proposées
3. Cliquez sur "Suivant" pour passer à la question suivante
4. Suivez votre progression avec la barre en haut

### 🏆 Résultats
1. Consultez votre score final
2. Examinez les statistiques détaillées
3. Comparez avec vos performances précédentes
4. Recommencez le quiz ou partagez vos résultats

---

## 📱 Interface Utilisateur

### 🎨 Design System

- **Couleurs Primaires** : Indigo et Violet
- **Typographie** : Inter (système)
- **Espacement** : Système basé sur 4px
- **Animations** : Transitions fluides et micro-interactions

### 📱 Responsive Breakpoints

| Breakpoint | Largeur | Description |
|------------|---------|-------------|
| `sm` | 640px+ | Téléphones en mode paysage |
| `md` | 768px+ | Tablettes |
| `lg` | 1024px+ | Ordinateurs portables |
| `xl` | 1280px+ | Écrans larges |
| `2xl` | 1536px+ | Très grands écrans |

### 🌙 Mode Sombre

L'application supporte automatiquement le mode sombre avec :
- Détection automatique des préférences système
- Commutateur manuel dans la navigation
- Persistance des préférences utilisateur

---

## 🧪 Tests

### Lancer les Tests

```bash
npm run test
# ou
yarn test
# ou
pnpm test
```

### Couverture de Tests

```bash
npm run test:coverage
```

### Types de Tests

- **Tests Unitaires** : Composants individuels
- **Tests d'Intégration** : Flux utilisateur complets
- **Tests E2E** : Scénarios utilisateur réels

---

## 🚀 Déploiement

### 🌐 Build de Production

```bash
npm run build
```

### 📦 Plateformes Supportées

- **Vercel** (Recommandé)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### 🔧 Configuration pour Vercel

1. Connectez votre repository GitHub
2. Configurez les variables d'environnement
3. Déployez automatiquement à chaque push

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

---

## 🤝 Contribution

Nous accueillons les contributions ! Voici comment participer :

### 📋 Processus de Contribution

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Committez** vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. **Poussez** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrez** une Pull Request

### 📝 Guidelines de Code

- Utilisez TypeScript pour tous les nouveaux fichiers
- Suivez les conventions ESLint et Prettier
- Ajoutez des tests pour les nouvelles fonctionnalités
- Documentez les nouvelles APIs

### 🐛 Signaler des Bugs

Utilisez les [Issues GitHub](https://github.com/votre-username/quiz-app/issues) avec le template approprié.

---

## 📈 Roadmap

### 🔜 Prochaines Fonctionnalités

- [ ] **Multijoueur** - Défis entre amis
- [ ] **Catégories** - Questions par thème
- [ ] **Difficultés** - Niveaux progressifs
- [ ] **Badges** - Système de récompenses
- [ ] **API Externe** - Questions depuis des APIs
- [ ] **PWA** - Application web progressive
- [ ] **Analytics** - Statistiques avancées

### 🎯 Améliorations Techniques

- [ ] **Tests E2E** avec Playwright
- [ ] **Optimisation** des performances
- [ ] **Accessibilité** WCAG 2.1
- [ ] **Internationalisation** (i18n)

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2024 [Votre Nom]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Auteurs

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/votre-username">
          <img src="https://github.com/votre-username.png" width="100px;" alt="Avatar"/><br>
          <sub><b>Votre Nom</b></sub>
        </a><br>
        <small>💻 Développeur Principal</small>
      </td>
    </tr>
  </table>
</div>

---

## 🙏 Remerciements

- **React Team** pour l'excellente bibliothèque
- **Tailwind CSS** pour le framework CSS
- **Framer Motion** pour les animations
- **Vite** pour l'outil de build rapide
- **Communauté Open Source** pour l'inspiration

---

## 📞 Contact

- **Email** : mohammedbouzi177@gmail.com
- **LinkedIn** : [my Profil linkding](https://www.linkedin.com/in/mouhamed-bouzayan-9a7222344/)
- **Twitter** : [@VotreHandle](https://twitter.com/VotreHandle)
- **Portfolio** : [votre-site.com](https://portfoliomohamedbouzayan.netlify.app/)

---

<div align="center">
  <h3>⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !</h3>
  <p>Fait avec ❤️ par Mouhamed Bouzayan </p>
</div>
