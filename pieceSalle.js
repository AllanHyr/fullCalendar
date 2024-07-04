require("date-format-lite"); // add date format
 
class PieceSalle {
    constructor(connection, table) {
        this._db = connection;
        this.table_1 = "pieces";
        this.table_2 = "salles";
    }
 
    async getAll(params) {
        let pieces = [];
        let salles = [];
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table_1
        ];
    
        let result = await this._db.query(query, queryParams);
        
        result.forEach(entry => {
            let newPiece = {
                id: entry.id,
                title: entry.title,
                groupId: entry.fk_salles
            }
            pieces.push(newPiece);
        });

        
        query = "SELECT * FROM ??";
        queryParams = [
            this.table_2
        ];
    
        result = await this._db.query(query, queryParams);
        
        result.forEach(entry => {
            let newPiece = {
                id: entry.id,
                title: entry.title
            }
            salles.push(newPiece);
        });
    
        return { pieces, salles };
    }
    
}
 
module.exports = PieceSalle;