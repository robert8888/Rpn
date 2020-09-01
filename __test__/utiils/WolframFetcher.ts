import fetch, {Headers} from "node-fetch";

export default class WolframFetcher {
    private readonly apiKey: string;
    private readonly link: string;

    constructor() {
        // this api key is created for testing library
        // is public so it can happen that it will be blocked for some reasons
        // if api wolfram api fetch don't work
        // pleas first check that this key is still valid

        this.apiKey = '9ART3R-U4H7KLU639';
        this.link = 'http://api.wolframalpha.com/v2/query?input=';
    }

    public getResultFor(input){
        let data = this.fetch(input);
        return data
            .then(response => response.text())
            .then(str => this.findResult(str));
    }

    private fetch(input){
        const headers = new Headers();
        headers.append('Content-Type', 'text/xml');
        const init = <any>{
            method: 'GET',
            headers: headers,
            cache: 'default'
        };
        const link = this.getLink(input);
        return fetch(link, init);
    }

    private getLink(input){
        input = encodeURIComponent(input);
        return this.link + input +"&&appid="+ this.apiKey;
    }


    private findResult(text){
        const patterns = {
            DecimalForm: /<pod title='Decimal form'.*?<plaintext>(.*?)<\/plaintext>/gs,
            Approximation : /<pod title='Decimal approximation'.*?<plaintext>(.*?)<\/plaintext>/gs,
            Result: /<pod title='Result'.*?<plaintext>(.*?)<\/plaintext>/gs,
        }
        for(let pattern of Object.values(patterns)){
            const result = pattern.exec(text);
            if(result && result[1]){
                return result[1]
            }

        }
        return null;
    }
}