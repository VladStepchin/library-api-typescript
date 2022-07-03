import got from "got";

class StatConnector {

    public url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getStats() {
        const { stats }:{stats:number} = await got.get(this.url).json();
        return stats;
    }
}

export default StatConnector
