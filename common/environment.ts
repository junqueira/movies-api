export const environment = {
    server : {
        port : process.env.SERVER_PORT || 3003
    },
    db     : {
        csv : process.env.CSV || './resources/movielist.csv'
    }
}