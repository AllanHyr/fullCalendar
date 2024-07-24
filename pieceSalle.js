require("date-format-lite"); // add date format
 
class PieceSalle {
    constructor(connection, table) {
        this._db = connection;
        this.table_1 = "pieces";
        this.table_2 = "salles";
        this.table_3 = "batiments";
    }
 
    async getAll(params) {    
        let pieces = [];
        let salles = [];
        let batiments = [];
        let query = "SELECT * FROM ??";
        let queryParams;
    
        // Get all pieces
        queryParams = [this.table_1];
        let result = await this._db.query(query, queryParams);
        result.forEach(entry => {
            pieces.push({
                id: entry.id,
                title: entry.title,
                groupId: entry.fk_salles
            });
        });
    
        // Get all salles
        queryParams = [this.table_2];
        result = await this._db.query(query, queryParams);
        result.forEach(entry => {
            salles.push({
                id: entry.id,
                title: entry.title,
                groupId: entry.fk_batiments
            });
        });
    
        // Get all batiments
        queryParams = [this.table_3];
        result = await this._db.query(query, queryParams);
        result.forEach(entry => {
            batiments.push({
                id: entry.id,
                title: entry.title,
                salles: []
            });
        });
    
        // Add pieces to their corresponding salles
        salles.forEach(salle => {
            salle.pieces = pieces.filter(piece => piece.groupId === salle.id);
        });
    
        // Add salles to their corresponding batiments
        batiments.forEach(batiment => {
            batiment.salles = salles.filter(salle => salle.groupId === batiment.id);
        });
    
        return batiments;
    }
}
 
module.exports = PieceSalle;