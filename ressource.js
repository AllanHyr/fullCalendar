require("date-format-lite"); // add date format
 
class Ressource {
    constructor(connection, table) {
        this._db = connection;
        this.table_1 = "pieces";
        this.table_2 = "salles";
    }
 
    // get events from the table, use dynamic loading if parameters sent
    async getAll(params) {
        let ressources = [];
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table_1
        ];
    
        let result = await this._db.query(query, queryParams);
        
        // Utilisez map pour créer un tableau de promesses
        let promises = result.map(async (entry) => {
            let query = "SELECT * FROM ?? WHERE id=?";
            let queryParams = [this.table_2, entry.fk_salles];
            
            let result2 = await this._db.query(query, queryParams);
            
            result2.forEach((entry2) => {
                let newResource = {
                    id: entry.id,
                    title: entry.title,
                    building: entry2.title,
                    children: [
                        { id: entry.id + '_1', title: 'Lundi' },
                        { id: entry.id + '_2', title: 'Mardi' },
                        { id: entry.id + '_3', title: 'Mercredi' },
                        { id: entry.id + '_4', title: 'Jeudi' },
                        { id: entry.id + '_5', title: 'Vendredi' },
                        { id: entry.id + '_6', title: 'Samedi' },
                        { id: entry.id + '_7', title: 'Dimanche' }
                    ]
                };
                ressources.push(newResource);
            });
        });
    
        // Attendre que toutes les promesses soient résolues
        await Promise.all(promises);
    
        return ressources;
    }
}
 
module.exports = Ressource;