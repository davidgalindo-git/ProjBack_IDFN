import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.4',
        info: {
            title: 'WhatTheDog API',
            description: 'API REST pour gérer les données de clients, chiens, services et localités (rechercher, ajouter, modifier, supprimer).',
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
                        id: {
                            type: 'integer',
                            description: 'Identifiant unique de la localité.',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Paris'
                        },
                        postal_code: {
                            type: 'string',
                            example: '75001'
                        },
                        postal_code_complement: {
                            type: 'string',
                            nullable: true,
                            example: null
                        },
                        toponym: {
                            type: 'string',
                            example: 'Paris'
                        },
                        canton_code: {
                            type: 'string',
                            example: 'FR-75'
                        },
                        language_code: {
                            type: 'string',
                            example: 'fr'
                        },
                    },
                },
                LocalityInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Paris'
                        },
                        postal_code: {
                            type: 'string',
                            example: '75001'
                        },
                        postal_code_complement: {
                            type: 'string',
                            nullable: true,
                            example: null
                        },
                        toponym: {
                            type: 'string',
                            example: 'Paris'
                        },
                        canton_code: {
                            type: 'string',
                            example: 'FR-75'
                        },
                        language_code: {
                            type: 'string',
                            example: 'fr'
                        },
                    },
                    required: ['name', 'postal_code', 'toponym', 'canton_code', 'language_code'],
                },
            },
        },
        paths: {
            '/locality': {
                get: {
                    tags: ['Localité'],
                    summary: 'Récupérer une liste de localités ou filtrer par critères',
                    operationId: 'getLocality',
                    parameters: [{
                        name: 'name',
                        in: 'body',
                        schema: {
                            type: 'json'
                        },
                        description: 'Filtrer par nom de localité (correspondance partielle).'
                    }, {
                        name: 'postal_code',
                        in: 'body',
                        schema: {
                            type: 'json'
                        },
                        description: 'Filtrer par code postal.'
                    }, {
                        name: 'postal_code_complement',
                        in: 'body',
                        schema: {
                            type: 'json'
                        },
                        description: 'Filtrer par complément de code postal.'
                    }, {
                        name: 'toponym',
                        in: 'body',
                        schema: {
                            type: 'json'
                        },
                        description: 'Filtrer par toponyme.'
                    }, {
                        name: 'canton_code',
                        in: 'body',
                        schema: {
                            type: 'json'
                        },
                        description: 'Filtrer par code de canton.'
                    }, {
                        name: 'language_code',
                        in: 'body',
                        schema: {
                            type: 'json'
                        },
                        description: 'Filtrer par code de langue.'
                    }, ],
                    responses: {
                        '200': {
                            description: 'Récupération réussie des localités.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Les localités ont bien été trouvés'
                                            },
                                            body: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Locality'
                                                }
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'Aucune localité trouvée.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: 'Aucune localité n\'a été trouvé'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur interne du serveur.'
                        },
                    },
                },
                post: {
                    tags: ['Localité'],
                    summary: 'Créer une nouvelle localité',
                    operationId: 'setLocality',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/LocalityInput'
                                }
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Localité créée avec succès.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'La localité Paris à bien été ajoutée'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur interne du serveur ou échec de l\'ajout.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: 'Aucune localité n\'a été ajoutée'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            },
            '/locality/{id}/update': {
                patch: {
                    tags: ['Localité'],
                    summary: 'Mettre à jour une localité existante par ID',
                    operationId: 'updateLocality',
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer'
                        },
                        description: 'L\'ID de la localité à mettre à jour.'
                    }, ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/LocalityInput'
                                },
                                examples: {
                                    updateName: {
                                        value: {
                                            name: 'Nouveau Nom de Localité'
                                        }
                                    }
                                }
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Localité mise à jour avec succès.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'La localité Nouveau Nom de Localité à bien été modifiée'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'La localité avec cet ID n\'existe pas.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: 'La localité avec l\'ID 123 n\'existe pas...'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur interne du serveur ou échec de la mise à jour.'
                        },
                    },
                },
            },
            '/locality/{id}': {
                delete: {
                    tags: ['Localité'],
                    summary: 'Supprimer une localité par ID',
                    operationId: 'deleteLocality',
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer'
                        },
                        description: 'L\'ID de la localité à supprimer.'
                    }, ],
                    responses: {
                        '200': {
                            description: 'Localité supprimée avec succès.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'La localité avec l\'ID 123 à bien été supprimée'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'La localité avec cet ID n\'existe pas.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: 'La localité avec l\'ID 123 n\'existe pas...'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur interne du serveur ou échec de la suppression.'
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const openApiSpecification = swaggerJsdoc(options);
export {openApiSpecification};