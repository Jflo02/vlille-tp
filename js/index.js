//Variables globales
let term = '';

//Fonctions
const getStations = async () => {
    console.log("je suis dans gestStations")
    // @ts-ignore
    const request = await axios.get(`https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=${term}`)
        .then(response => afficherTableau(response.data.records));
    return request;
}

const buttonClick = () => {
    console.log('jai cliqué sur le button')
    if (window.navigator.onLine) {
        console.log('je suis en ligne')
    } else {
        console.log('je suis hors ligne')
    }
}

const isOnline = () => {
    console.log(window.navigator.onLine)
    if (window.navigator.onLine) {
        return true
    } else {
        return false
    }
}

const setErrorMessage = (errorMessage) => {
    console.log('jy suis')
    errorDiv.style.display = 'block';
    errorDiv.innerHTML = errorMessage;
}

const chercherStation = () => {
    console.log('je suis dans chercherStation')
    // @ts-ignore
    if (document.getElementById('inputStation').value == '') {
        setErrorMessage('Veuillez remplir le champ de recherche')
    }
    // @ts-ignore
    else if (document.getElementById('inputStation').value.length < 3) {
        setErrorMessage('Veuillez indiquer au moins 3 charactères')
    }
    // @ts-ignore
    else if (document.getElementById('inputStation').value.length > 50) {
        setErrorMessage('Veuillez indiquer 50 charactères maximum')
    }
    else {
        if(isOnline()) {

            // @ts-ignore
            console.log(document.getElementById('inputStation').value.length)
            console.log('je vais chercher une station')
            // @ts-ignore
            const stationCherchee = document.getElementById('inputStation').value;
            console.log(stationCherchee);
            term = stationCherchee;
            tbodyRef.innerHTML = '';
            getStations();
        }
        else {
            setErrorMessage('Vous semblez être hors ligne, recherche des stations impossible')
        }
    }
}

const afficherTableau = (stations) => {
    //si il n'y a aucune stations, on affiche un msg d erreur
    stations.length == 0 ? setErrorMessage('Désolé,  nous n\'avons trouvé aucun résultat correspondant à votre recherche') :
        errorDiv.style.display = "none";
    stations.forEach(station => {
        tbodyRef.insertRow().innerHTML =
            // @ts-ignore
            '<tr class="table-secondary">' +
            '<th scope="row">' + station.fields.commune + '</th>' +
            '<td>' + station.fields.nom + '</td>' +
            ((station.fields.etat == 'EN SERVICE') ? '<td class="text-success"> Oui </td>' : '<td class="text-danger"> Non </td>') +
            ((parseInt(station.fields.nbvelosdispo) == 0) ? '<td class="text-danger">' + station.fields.nbvelosdispo + '</td>' : '<td>' + station.fields.nbvelosdispo + '</td>') +
            ((parseInt(station.fields.nbplacesdispo) == 0) ? '<td class="text-danger">' + station.fields.nbplacesdispo + '</td>' : '<td>' + station.fields.nbplacesdispo + '</td>') +
            '</tr>';
    });
}

//Code principal
const errorDiv = document.getElementById('errorMessage');
errorDiv.style.display = "none";
const tbodyRef = document.getElementById('tableauVlille').getElementsByTagName('tbody')[0]