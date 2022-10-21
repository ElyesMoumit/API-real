// import {Formation} from "./views/Formation.js";
import {
    Articles
} from "./views/Articles.js";
import {
    Podcasts
} from "./views/Podcasts.js";
import {
    Videos
} from "./views/Videos.js";
import {
    inscription
} from "./views/inscription.js";
document.querySelector("#send").addEventListener('click', ()=> {
    getCourses();
})
function getCourses() {
    var date = document.querySelector('#date');

    var adresse = document.querySelector('#adresse');

    let response = fetch(
        "https://labonnealternance.apprentissage.beta.gouv.fr/api/V1/formations?caller=toto@toto.fr Assou&romeDomain=M18"
    );
    response.then(response => {
        return response.json().then((data) => {
            const newData = data.results.filter((object) => {
                if (object.createdAt <= (new Date(date.value)).toISOString()) {
                    return object
                }
                const newData = data.results.filter((object) => {
                    if (object.createdAt <= (new Object(adresse.name))) {
                        return object
                    }
                })
            })

            const courses = newData.map((course) => {
                return {
                    titleCourse: course.title,
                    diplomaLevel: course.diplomaLevel,
                    company: course.company,
                    place: course.place
                }
            })
            console.log(newData);
        });
    });
}

export class Router {
    routes;
    menus;
    contentContainer;

    constructor(menus, contentContainer) {
        this.routes = {
            'articles': Articles,
            'podcasts': Podcasts,
            'inscription': inscription,
            'videos': Videos
        }
        this.menus = menus
        this.contentContainer = contentContainer;
    }

    start() {
        // affichage d'une page par défaut
        this.contentContainer.innerHTML = (new this.routes.articles).html()

        // Ecoute l'événement du click sur les menus et affiche la page correspondante
        this.menus.forEach((menu) => {
            menu.addEventListener('click', (event) => {
                this.empty(this.contentContainer)
                this.goToLink(event.target)
            })
        })
    }

    goToLink(menu) {
        switch (menu.innerText) {
            case 'Articles':
                const articles = new this.routes.articles
                this.display(articles.html())
                let request = window.indexedDB.open("articles", 1)
                request.onsuccess = (event) => {
                    console.log('success')
                }
                request.onupgradeneeded = function (event) {
                    let db = event.target.result;
                    const articles = [{
                        id: 1,
                        database: newData.map
                    }]
                    // Crée un objet de stockage pour cette base de données
                    // Possibilité de générer les id avec l'option autoIncrement
                    let objectStore = db.createObjectStore("articles", {
                        keyPath: "id"
                    });

                    //Créer un index pour rechercher les articles par auteur
                    objectStore.createIndex("authorIndex", "author", {
                        unique: false
                    });

                    //Créer un index pour rechercher les articles par titre (le titre doit être unique)
                    objectStore.createIndex("titleIndex", "title", {
                        unique: true
                    });

                    // S'assurer que l'objet de stockage a fini de se créer avant de continuer
                    objectStore.transaction.oncomplete = function (event) {
                        // Stocker les valeurs dans le nouvel objet de stockage.
                        let transaction = db.transaction(["articles"], "readwrite")
                        let articleObjectStore = transaction.objectStore("articles");
                        for (let i in articles) {
                            articleObjectStore.add(articles[i]);
                        }
                        transaction.oncomplete = (event) => {
                            alert("GG WP");
                        }
                    }
                };

                request.onerror = (event) => {
                    console.log('coup dur')

                }
                break;

            case 'Podcasts':

                const podcasts = new this.routes.podcasts
                this.display(podcasts.html())
                
                this.open();
                break

            case 'Vidéos':
                const videos = new this.routes.videos
                this.display(videos.html())
                break
            case 's\'inscrire':
                const register = new this.routes.register
                this.display(register.html())
                register.autocomplete()
                register.picture().then(r => {})
                break
        }
    }

    empty(component) {
        component.innerHTML = ""
    }

    display(html) {
        this.contentContainer.innerHTML = html
    }

    open() {
        console.log('open');
        const DBOpenRequest = window.indexedDB.open("articles", 1);

        DBOpenRequest.onsuccess = function (event) {
            console.log('connexion reussi');


            // On récupère le résultat de l'ouverture dans la variable db
            // qui sera utilisée ensuite
            const db = DBOpenRequest.result;

            // On exécute la fonction getData() afin de récupérer les données
            // de la base
            getData();

            function getData() {
                // On ouvre une transaction en lecture/écriture
                // pour récupérer des données
                const transaction = db.transaction(['articles'], "readwrite");

                // On indique le succès ou l'échec de l'opération
                transaction.oncomplete = function (event) {
                    console.log('Transaction complete');
                };

                transaction.onerror = function (event) {
                    console.log('Transaction erreur');
                };

                // On crée un magasin d'objets sur la transaction
                const objectStore = transaction.objectStore("articles");

                // On lance une requête afin d'obtenir un enregistrement
                // à partir de la clé dans le magasin d'objets
                const objectStoreRequest = objectStore.getAll();

                objectStoreRequest.onsuccess = function (event) {
                    // On indique que la requête a réussi
                    console.log(objectStoreRequest.result);
                };

            };

            function newFunction() {
                return "articles";
            }
        };
    }
}