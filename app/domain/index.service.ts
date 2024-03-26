import { ElasticsearchService } from "../infraestructure/elasticsearch.service";
import { IndexName } from "./types";
import { Mappings } from "./types";

export class IndexService {

    public async createIndex(indexName: IndexName, mappings: Mappings): Promise<void> {
        const elasticsearchService = new ElasticsearchService();
        console.log("hii", indexName)
        await elasticsearchService.createIndex(indexName, mappings);
    }
}