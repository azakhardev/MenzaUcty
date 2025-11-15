export default {
    api: {
        input: {
            target: 'http://localhost:8080/v3/api-docs.yaml',
        },
        output: {
            mode: 'tags-split',
            target: 'src/api/generated.ts',
            schemas: 'src/api/models',
            client: 'axios',
            override: {
                mutator: {
                    path: 'src/api/axios.ts',
                    name: 'api'
                }
            }
        },
    },
};
