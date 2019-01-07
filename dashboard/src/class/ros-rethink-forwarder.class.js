

const r = require('rethinkdbdash');

class RosRethinkForwarder {

    constructor(config) {
        this.rdb = r(config)
        this.init().then(() => {
            this.ready = true
        })
    }

    async init(){
        try{
            var histories = await this.rdb.table('car_history').getAll().run();
            console.log("RethinkDB tables and indexes are available, RosRethinkForwarder Ready...");
            return histories
        }catch(err){
            await this.rdb.dbCreate(config.db).run();
            await this.rdb.tableCreate('car_history').run();
            await this.rdb.tableCreate('car_video').run();
            await this.rdb.tableCreate('car_instructions').run();
            var histories = await this.rdb.table('car_history').getAll().run();
            console.log("RethinkDB tables and indexes are available, RosRethinkForwarder Ready...");
            return histories
        }
    }

    async store(type, data) {
        if(this.ready) {

        }
    }

}

export default RosRethinkForwarder

