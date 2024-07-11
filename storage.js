require("date-format-lite"); // add date format
 
class Storage {
    constructor(connection, table) {
        this._db = connection;
        this.table = "events";
    }
 
    // get events from the table, use dynamic loading if parameters sent
    async getAll(params) {
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table
        ];
 
        let result = await this._db.query(query, queryParams);
        
        result.forEach((entry) => {
            // format date and time
            entry.resourceId = entry.section_id
            entry.title = entry.text
            entry.start = entry.start_date.format("YYYY-DD-MM hh:mm");
            entry.end = entry.end_date.format("YYYY-DD-MM hh:mm");
        });
        return result;
    }
 
    // create new event
    async insert(data) {
        let result = await this._db.query(
            "INSERT INTO ?? (`start_date`, `end_date`, `text`, `section_id`) VALUES (?,?,?,?)",
            [this.table, data.start_date, data.end_date, data.text, data.section_id]);
 
        return {
            action: "inserted",
            tid: result.insertId
        }
    }
 
    // update event
    async update(id, data) {
        await this._db.query(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?",
            [this.table, data.start_date, data.end_date, data.text, id]);
 
        return {
            action: "updated"
        }
    }
 
    // delete event
    async delete(id) {
        await this._db.query(
            "DELETE FROM ?? WHERE `id`=? ;",
            [this.table, id]);
 
        return {
            action: "deleted"
        }
    }
}
 
module.exports = Storage;