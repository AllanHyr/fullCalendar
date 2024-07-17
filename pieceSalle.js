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
                title: entry.title,
                groupId: entry.fk_batiments
            }
            salles.push(newPiece);
        });
        
        query = "SELECT * FROM ??";
        queryParams = [
            this.table_3
        ];
    
        result = await this._db.query(query, queryParams);
        
        result.forEach(entry => {
            let newBatiments = {
                id: entry.id,
                title: entry.title
            }
            batiments.push(newBatiments);
        });
    
        return { pieces, salles, batiments };
    }
    
}
 
module.exports = PieceSalle;