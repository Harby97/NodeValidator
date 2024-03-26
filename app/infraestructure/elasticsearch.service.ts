import { Client } from "@elastic/elasticsearch";

export class ElasticsearchService {
    private readonly client: Client;

    constructor() {
        this.client = new Client({
            node: "http://localhost:9200",
        });
    }

    public async createIndex(indexName, mapping): Promise<void> {
        console.log("data", indexName, mapping)
        await this.client.indices.create(
            indexName,
            mapping
        );
    }
}