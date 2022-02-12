# JS LIB

Ce répertoire contient les fichiers JavaScript des librairies personnalisées par exemple (qui ne peuvent pas s'installer pas avec Yarn)

Pour une librairie installée avec Yarn, il faut la rajouter dans le `gulpfile.js` dans la variable `jsVendorSRC`

Tout le contenu de ce répertoire est automatiquement compilé via Gulp dans le fichier `./dist/vendors.js`
