module.exports = class WeatherStack{

    #hostname="api.weatherstack.com"

    /**
     *
     * @param http {http} инстанс http
     * @param apiToken {string} токен доступа к апи сервиса Weatherstack
     */
    constructor(http, apiToken) {
        this.http = http;
        this.apiToken = apiToken;
    }

    /**
     *
     * @param city {string} город
     * @returns {Promise<Object>} информация о текущей погоде в указанном городе
     */
    getCurrent(city){
        const options = {
            host: this.#hostname,
            path: `/current?access_key=${this.apiToken}&query=${city}}`,
            method: 'GET'
        };

        return new Promise((resolve, reject) => {
            let result = '';
            const req = this.http.request(options, res => {
                res.on('data', data => {
                    result+=data;
                })
                res.on('end', () => {
                    resolve(JSON.parse(result).current);
                })
            });

            req.on('error', (error) => {
                reject(error);
            })

            req.end();
        })
    }

    getForecast(city){
        const options = {
            host: this.#hostname,
            path: `/forecast?access_key=${this.apiToken}&query=${city}}`,
            method: 'GET'
        };

        return new Promise((resolve, reject) => {
            let result = '';
            const req = this.http.request(options, res => {
                res.on('data', data => {
                    result+=data;
                })
                res.on('end', () => {
                    resolve(JSON.parse(result));
                })
            });

            req.on('error', (error) => {
                reject(error);
            })

            req.end();
        })
    }

}