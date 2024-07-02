require("date-format-lite"); // add date format
 
class Events {
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
            let date = new Date(entry.start_date);
            entry.resourceId = entry.section_id + '_' + date.getDay();
            entry.title = entry.text
            entry.start = "2024-05-31 " + entry.start_date.format("hh:mm");
            entry.end = "2024-05-31 " + entry.end_date.format("hh:mm");
        });
        return result;
    }
}
 
module.exports = Events;