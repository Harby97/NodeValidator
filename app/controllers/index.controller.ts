import { IndexService } from "../domain/index.service";
import { Client } from "@elastic/elasticsearch";
import { Request, Response } from "express";
import { validate } from 'class-validator';

export class IndexController {
    private readonly indexService: IndexService;


    constructor() {
        this.indexService = new IndexService();
    }

    // public async create(req: Request, res: Response): Promise<void> {
    //     try {
    //         // Validar el cuerpo de la solicitud
    //         const requestBody: RootValidation = req.body;
    //         const validationErrors = await validate(requestBody);

    //         console.log(validationErrors)
    //         // Verificar si hay errores de validación
    //         if (validationErrors.length > 0) {
    //             res.status(400).json({ errors: validationErrors });
    //         }


    //         res.status(200).send(requestBody);

    //     }
    //     catch (error) {
    //         console.error('Error en el controlador configureMappingsController:', error);
    //         res.status(500).json({ error: 'Error interno del servidor.' });
    //     }
    // }



    public async createIndex(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const { indexName, body } = req.body;
        const client = new Client({
            node: 'https://11c518f47cf74399bb5a0494e89743f4.us-east-2.aws.elastic-cloud.com:443',
            cloud: { id: '2ced684cdd264276a63844e94c78341d:dXMtZWFzdC0yLmF3cy5lbGFzdGljLWNsb3VkLmNvbSQxMWM1MThmNDdjZjc0Mzk5YmI1YTA0OTRlODk3NDNmNCRmNjdlYzNmNTMxZDE0MmMwYjE5NjcwMTAxZDkzMmIxMw==' },
            auth: {
                apiKey: 'aUFraEZZNEIwRFMxNXowUXFvLWE6TTR2Nmo1blhTc0tENXh3UklvendZZw=='
            },
        });
        try {
            console.log("hola");
            /* 
                        const resp = await client.index(
                            indexName,
                            mappings,
                        ); */

            const searchResult = await client.indices.create({
                index: 'my_index', // Replace with your desired index name
                body: {
                    mappings: {
                        properties: {
                            // Define your document properties here
                            // Example:
                            title: { type: 'text' },
                            content: { type: 'text' },
                        },
                    },
                },
            });

            console.log(searchResult)
            //const resp = await client.info();

            //console.log(resp);

            // await this.indexService.createIndex(indexName, mappings);
            res.status(201).send("Índice creado correctamente.");
        } catch (error) {
            console.log("adios");
            res.status(500).send("Ocurrió un error: " + error);
        }
    }

    // public async createDocumento(req: Request, res: Response): Promise<void> {
    //     console.log(req.body)
    //     const { indexName, type, body } = req.body;
    //     const client = new Client({
    //         node: 'https://11c518f47cf74399bb5a0494e89743f4.us-east-2.aws.elastic-cloud.com:443',
    //         cloud: { id: '2ced684cdd264276a63844e94c78341d:dXMtZWFzdC0yLmF3cy5lbGFzdGljLWNsb3VkLmNvbSQxMWM1MThmNDdjZjc0Mzk5YmI1YTA0OTRlODk3NDNmNCRmNjdlYzNmNTMxZDE0MmMwYjE5NjcwMTAxZDkzMmIxMw==' },
    //         auth: {
    //             apiKey: 'aUFraEZZNEIwRFMxNXowUXFvLWE6TTR2Nmo1blhTc0tENXh3UklvendZZw=='
    //         },
    //     });
    //     try {
    //         console.log("hola");
    //         /* 
    //                     const resp = await client.index(
    //                         indexName,
    //                         mappings,
    //                     ); */
    //         let searchResult: any;
    //         if (type == "bulk") {
    //             /*                 const dataset = [{
    //                                 id: 1,
    //                                 text: 'If I fall, don\'t bring me back.',
    //                                 user: 'jon',
    //                                 date: new Date()
    //                             }, {
    //                                 id: 2,
    //                                 text: 'Winter is coming',
    //                                 user: 'ned',
    //                                 date: new Date()
    //                             }, {
    //                                 id: 3,
    //                                 text: 'A Lannister always pays his debts.',
    //                                 user: 'tyrion',
    //                                 date: new Date()
    //                             }, {
    //                                 id: 4,
    //                                 text: 'I am the blood of the dragon.',
    //                                 user: 'daenerys',
    //                                 date: new Date()
    //                             }, {
    //                                 id: 5, // change this value to a string to see the bulk response with errors
    //                                 text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
    //                                 user: 'arya',
    //                                 date: new Date()
    //                             }] */
    //             const dataset = [{
    //                 id: 1,
    //                 text: 'If I fall, don\'t bring me back.',
    //                 user: 'jon',
    //                 date: new Date()
    //             }]

    //             const operations = dataset.flatMap(doc => [{ index: { _index: 'tweets4' } }, doc])
    //             searchResult = await client.bulk({ refresh: true, operations });
    //         } else if (type == "single") {
    //             searchResult = await client.index({
    //                 "index": 'game-of-thrones4',
    //                 "document": {
    //                     "id": 1,
    //                     "text": 'If I fall, don\'t bring me back.',
    //                     "user": 'jon',
    //                     "date": new Date()
    //                 }
    //             });
    //         }



    //         console.log(searchResult)
    //         //const resp = await client.info();

    //         //console.log(resp);

    //         // await this.indexService.createIndex(indexName, mappings);
    //         res.status(201).send("Índice creado correctamente.");
    //     } catch (error) {
    //         console.log("adios");
    //         res.status(500).send("Ocurrió un error: " + error);
    //     }
    // }


    // public async query(req: Request, res: Response): Promise<void> {
    //     console.log(req.body)
    //     const { query } = req.body;
    //     const client = new Client({
    //         node: 'https://11c518f47cf74399bb5a0494e89743f4.us-east-2.aws.elastic-cloud.com:443',
    //         cloud: { id: '2ced684cdd264276a63844e94c78341d:dXMtZWFzdC0yLmF3cy5lbGFzdGljLWNsb3VkLmNvbSQxMWM1MThmNDdjZjc0Mzk5YmI1YTA0OTRlODk3NDNmNCRmNjdlYzNmNTMxZDE0MmMwYjE5NjcwMTAxZDkzMmIxMw==' },
    //         auth: {
    //             apiKey: 'aUFraEZZNEIwRFMxNXowUXFvLWE6TTR2Nmo1blhTc0tENXh3UklvendZZw=='
    //         },
    //     });
    //     try {
    //         console.log("hola");

    //         const searchResult = await client.sql.query({
    //             query: query,
    //         });

    //         console.log(searchResult)
    //         res.status(201).send("Índice creado correctamente." + searchResult);
    //     } catch (error) {
    //         console.log("adios");
    //         res.status(500).send("Ocurrió un error: " + error);
    //     }
    // }

    // public async querySearch(req: Request, res: Response): Promise<void> {
    //     console.log(req.body)
    //     const { indexName, match } = req.body;
    //     const client = new Client({
    //         node: 'https://11c518f47cf74399bb5a0494e89743f4.us-east-2.aws.elastic-cloud.com:443',
    //         cloud: { id: '2ced684cdd264276a63844e94c78341d:dXMtZWFzdC0yLmF3cy5lbGFzdGljLWNsb3VkLmNvbSQxMWM1MThmNDdjZjc0Mzk5YmI1YTA0OTRlODk3NDNmNCRmNjdlYzNmNTMxZDE0MmMwYjE5NjcwMTAxZDkzMmIxMw==' },
    //         auth: {
    //             apiKey: 'aUFraEZZNEIwRFMxNXowUXFvLWE6TTR2Nmo1blhTc0tENXh3UklvendZZw=='
    //         },
    //     });
    //     try {
    //         console.log("hola");

    //         const searchResult = await client.search({
    //             index: indexName,
    //             query: {
    //                 match: match
    //             }
    //         }, { meta: true })

    //         console.log(searchResult)
    //         res.status(201).send("Índice creado correctamente." + searchResult);
    //     } catch (error) {
    //         console.log("adios");
    //         res.status(500).send("Ocurrió un error: " + error);
    //     }
    // }

}