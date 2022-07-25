export class Services {
    static async getRequest(
        endpoint: string
    ): Promise<Response> {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        const options = {
            method: 'GET',
            headers: headers,
        };

        console.debug('GET -> ' + endpoint);
        console.debug('OPTIONS -> ' + options);

        return await fetch(endpoint, options);
    }
}
