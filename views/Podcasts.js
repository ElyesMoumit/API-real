// Importez  les composants simples pour construire la page
// Construire la page
// Retourner la page en question

export class Podcasts {
    html() {
        return `
        <p>Podcasts</p>
        `

    }
    
 // La fonction qui sert effectivement à demander la permission
handlePermission(permission) {

    // On affiche ou non le bouton en fonction de la réponse
    if (Notification.permission === 'denied' || Notification.permission === 'default') {
        console.log('permission denied');
        console.log('lelel');
    } else {
        console.log('permission accepted');
        const img = "/asset/notifications@2x.jpg";
        const titre = 'faire les courses';
        const text = 'Coucou ! Votre tâche "' + titre + '" arrive maintenant à échéance.';
        const notification = new Notification('Liste de trucs à faire', {
            body: text,
            icon: img
        });
    }
    Notification.requestPermission((permission) => {
        handlePermission(permission);
})
}
}