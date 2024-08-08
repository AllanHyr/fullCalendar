require("date-format-lite"); // add date format
const moment = require('moment');
 
class Events {
    constructor(connection, table) {
        this._db = connection;
        this.table = "events";
    }
    async getAll(params) {
        // Utilisation de moment pour définir les dates de début et de fin de semaine
        let day = moment(params.startDate);
        let start_date = day.clone().startOf('week');
        let end_date = day.clone().endOf('week');
        
        // Construction de la requête SQL
        let query = "SELECT * FROM ?? WHERE `start_date` >= ? AND `end_date` <= ?";
        let queryParams = [
            this.table, start_date.toISOString(), end_date.toISOString()
        ];
        
        // Exécution de la requête
        let result = await this._db.query(query, queryParams);
        
        // Traitement des résultats
        result.forEach((entry) => {
            // Formatage de la date et de l'heure avec moment
            let startMoment = moment(entry.start_date);
            let endMoment = moment(entry.end_date);
    
            // Assignation de l'ID de ressource
            entry.resourceId = entry.section_id + '_' + startMoment.day();
    
            // Titre de l'événement
            entry.title = entry.text;
    
            entry.start = day.format("YYYY-MM-DD")+ " " + entry.start_date.format("hh:mm");
    
            if (endMoment.format("HH:mm") === '00:00') {
                entry.end = day.format("YYYY-MM-DD") + " 23:59"; // Fin de journée si l'heure est minuit
            } else {
                entry.end = day.format("YYYY-MM-DD")+ " " + entry.end_date.format("hh:mm");
            }
        });
        
        return result;
    }
}
 
module.exports = Events;