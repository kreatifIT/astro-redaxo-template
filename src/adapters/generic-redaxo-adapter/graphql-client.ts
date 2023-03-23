import type { DocumentNode } from 'graphql';
import env from '@helpers/env.json';

export type GraphQLResponse = {
    data: any;
    errors?: any;
};

export default class GraphQLClient {
    private cache = new Map<string, any>();
    public async query(
        query: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return new Promise((resolve) => {
            const cacheKey = JSON.stringify({
                query: query.loc?.source.body,
                variables,
                clangId,
            });

            if (this.cache.has(cacheKey) && this.cache.get(cacheKey)) {
                const cachedData = JSON.parse(this.cache.get(cacheKey));
                if (
                    cachedData &&
                    cachedData.data &&
                    Object.keys(cachedData.data).length > 0
                ) {
                    resolve(cachedData);
                }
            }
            this.executeRequest(
                {
                    query: query.loc?.source.body,
                    variables,
                },
                clangId,
            ).then((res) => {
                resolve(res);
                this.cache.set(cacheKey, JSON.stringify(res));
            });
        });
    }

    public async mutate(
        mutation: DocumentNode,
        variables: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return this.executeRequest(
            {
                mutation: mutation.loc?.source.body,
                variables,
            },
            clangId,
        );
    }

    private getGraphQLEndpoint(clangId: string): string {
        const redaxoEndpoint = env.REDAXO_ENDPOINT;
        if (!redaxoEndpoint) {
            throw new Error(
                'REDAXO_ENDPOINT is not defined. Please set it in your .env file.',
            );
        }
        const url = new URL(env.REDAXO_ENDPOINT);
        url.pathname = `${url.pathname}/${clangId}/`;
        return url.toString();
    }

    private executeRequest(
        body: Record<string, any>,
        clangId: string,
    ): Promise<GraphQLResponse> {
        return fetch(this.getGraphQLEndpoint(clangId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.text();
            })
            .then((res) => {
                if (res.errors) {
                    console.error(
                        'GraphQL request failed. Response:\n',
                        JSON.stringify(res.errors, null, 2),
                    );
                    if (!!import.meta.env.DEBUG) {
                        //throw error with query name
                        throw new Error(
                            'Failed to fetch API at request ' + body.query,
                        );
                    }
                }
                return res;
            })
            .catch((err) => {
                return { errors: err, data: {} };
            });
    }
}
