import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.4',
        info: {
            title: 'API Localité',
            description: 'Documentation essentielle de l\'API REST pour la gestion des localités.',
            version: '1.0.0',
        },
        servers: [{
            url: 'http://localhost:3000/',
        }, ],
        components: {
            schemas: {
                Locality: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Clinique de Lausanne' },
                        postal_code: { type: 'string', example: '1000' },
                        postal_code_complement: { type: 'string', example: 'A' },
                        toponym: { type: 'string', example: 'Lausanne' },
                        canton_code: { type: 'string', example: 'VD' },
                        language_code: { type: 'string', example: 'FR' },
                    },
                },
                LocalityInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Clinique de Lausanne' },
                        postal_code: { type: 'string', example: '1000' },
                        postal_code_complement: { type: 'string', example: 'A' },
                        toponym: { type: 'string', example: 'Lausanne' },
                        canton_code: { type: 'string', example: 'VD' },
                        language_code: { type: 'string', example: 'FR' },
                    },
                    required: ['name', 'postal_code', 'postal_code_complement', 'toponym', 'canton_code', 'language_code'],
                },
                components: {
                    schemas: {
                        Dog: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer', example: 12 },
                                name: { type: 'string', example: 'Rex' },
                                sex: { type: 'string', example: 'M' },
                                is_mixed: { type: 'integer', example: 1 },
                                birthdate: { type: 'string', format: 'date', example: '2020-06-01' },
                                is_sterilized: { type: 'integer', example: 1 },
                                is_deceased: { type: 'integer', example: 0 },
                                client_name: { type: 'string', example: 'Dupont' },
                                race_name: { type: 'string', example: 'Labrador' },
                            }
                        },

                        DogInput: {
                            type: 'object',
                            required: ['name', 'sex'],
                            properties: {
                                name: { type: 'string', example: 'Rex' },
                                sex: { type: 'string', example: 'M' },
                                is_mixed: { type: 'integer', example: 1 },
                                birthdate: { type: 'string', format: 'date', example: '2020-06-01' },
                                is_sterilized: { type: 'integer', example: 1 },
                                is_deceased: { type: 'integer', example: 0 },
                                client_name: { type: 'string', example: 'Dupont' },
                                race_name: { type: 'string', example: 'Labrador' },
                            }
                        }
                    }
                }
            },
        },
        paths: {
            '/locality': {
                get: {
                    tags: ['Localité'],
                    summary: 'Rechercher des localités (avec filtres optionnels)',
                    parameters: [
                        { name: 'name', in: 'body', schema: { type: 'json' }, description: 'Filtrer par nom.' },
                        { name: 'postal_code', in: 'body', schema: { type: 'json' }, description: 'Filtrer par code postal.' },
                        { name: 'postal_code_complement', in: 'body', schema: { type: 'json' }, description: 'Filtrer par code postal.' },
                        { name: 'canton_code', in: 'body', schema: { type: 'json' }, description: 'Filtrer par code de canton.' },
                        { name: 'language_code', in: 'body', schema: { type: 'json' }, description: 'Filtrer par code de langue.' },
                    ],
                    responses: {
                        '200': { description: 'Succès - Liste des localités récupérée.', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' }, body: { type: 'array', items: { $ref: '#/components/schemas/Locality' } } } } } } },
                        '404': { description: 'Aucune localité trouvée pour les critères donnés.' },
                        '500': { description: 'Erreur interne du serveur.' },
                    },
                },
                post: {
                    tags: ['Localité'],
                    summary: 'Créer une nouvelle localité',
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/LocalityInput' } } },
                    },
                    responses: {
                        '200': { description: 'Succès - Localité créée.', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string', example: 'La localité Paris à bien été ajoutée' } } } } } },
                        '500': { description: 'Erreur interne du serveur ou échec de l\'ajout.' },
                    },
                },
            },
            '/locality/{id}/update': {
                patch: {
                    tags: ['Localité'],
                    summary: 'Mettre à jour une localité par ID',
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID de la localité à mettre à jour.' },
                    ],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/LocalityInput' } } },
                    },
                    responses: {
                        '200': { description: 'Succès - Localité mise à jour.' },
                        '404': { description: 'Localité non trouvée.' },
                        '500': { description: 'Erreur interne du serveur ou échec de la mise à jour.' },
                    },
                },
            },
            '/locality/{id}': {
                delete: {
                    tags: ['Localité'],
                    summary: 'Supprimer une localité par ID',
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID de la localité à supprimer.' },
                    ],
                    responses: {
                        '200': { description: 'Succès - Localité supprimée.' },
                        '404': { description: 'Localité non trouvée.' },
                        '500': { description: 'Erreur interne du serveur ou échec de la suppression.' },
                    },
                },
            },
            paths: {
                '/dogs': {
                    get: {
                        tags: ['Dogs'],
                        summary: 'Récupérer les chiens avec filtres',
                        parameters: [
                            { name: 'name', in: 'query', schema: { type: 'string' } },
                            { name: 'sex', in: 'query', schema: { type: 'string' } },
                            { name: 'is_mixed', in: 'query', schema: { type: 'integer' } },
                            { name: 'birthdate', in: 'query', schema: { type: 'string', format: 'date' } },
                            { name: 'is_sterilized', in: 'query', schema: { type: 'integer' } },
                            { name: 'is_deceased', in: 'query', schema: { type: 'integer' } },
                            { name: 'client_name', in: 'query', schema: { type: 'string' } },
                            { name: 'race_name', in: 'query', schema: { type: 'string' } },
                        ],
                        responses: {
                            200: {
                                description: 'Liste des chiens',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                message: { type: 'string' },
                                                body: {
                                                    type: 'array',
                                                    items: { $ref: '#/components/schemas/Dog' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },

                    post: {
                        tags: ['Dogs'],
                        summary: 'Créer un chien',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/DogInput' }
                                }
                            }
                        },
                        responses: {
                            201: {
                                description: 'Chien créé',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                message: { type: 'string' },
                                                body: { $ref: '#/components/schemas/Dog' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '/dogs/{id}': {
                    get: {
                        tags: ['Dogs'],
                        summary: 'Récupérer un chien par ID',
                        parameters: [
                            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                        ],
                        responses: {
                            200: {
                                description: 'Chien trouvé',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object',
                                            properties: {
                                                message: { type: 'string' },
                                                body: { $ref: '#/components/schemas/Dog' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },

                    patch: {
                        tags: ['Dogs'],
                        summary: 'Mettre à jour un chien',
                        parameters: [
                            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                        ],
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/DogInput' }
                                }
                            }
                        },
                        responses: {
                            200: {
                                description: 'Chien mis à jour'
                            }
                        }
                    },

                    delete: {
                        tags: ['Dogs'],
                        summary: 'Supprimer un chien',
                        parameters: [
                            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                        ],
                        responses: {
                            200: {
                                description: 'Chien supprimé'
                            }
                        }
                    }
                }
            }
        },
    },
    apis: ['./routes/*.js'],
};

const openApiSpecification = swaggerJsdoc(options);
export {openApiSpecification};