import swaggerJsdoc from 'swagger-jsdoc'

const port = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: '3.0.4',
        info: {
            title: 'API Localité',
            description: 'Documentation essentielle de l\'API REST pour la gestion des localités.',
            version: '1.0.0',
        },
        servers: [{
            url: `http://localhost:${port}/`,
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
                Service: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Identifiant unique du service.',
                            example: 1
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date et heure du service.',
                            example: '2025-12-25T14:30:00Z'
                        },
                        duration_m: {
                            type: 'integer',
                            description: 'Durée du service en minutes.',
                            example: 60
                        },
                        location: {
                            type: 'string',
                            description: 'Nom de la localité où le service a eu lieu.',
                            example: "Clinic Lausanne"
                        },
                        dog: {
                            type: 'string',
                            description: 'Nom du chien concerné par le service.',
                            example: "Charlie"
                        },
                    },
                },
                ServiceInput: {
                    type: 'object',
                    properties: {
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date et heure du service (optionnel lors de la création/modification, mais recommandé).',
                            example: '2025-12-25T14:30:00Z'
                        },
                        duration_m: {
                            type: 'integer',
                            description: 'Durée du service en minutes.',
                            example: 60
                        },
                        location_id: {
                            type: 'integer',
                            description: 'ID de la localité (obligatoire).',
                            example: 1
                        },
                        dog_id: {
                            type: 'integer',
                            description: 'ID du chien (obligatoire).',
                            example: 5
                        },
                    },
                    required: ['location_id', 'dog_id'],
                },
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
            '/locality/{id}': {
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
            '/service': {
                get: {
                    tags: ['Service'],
                    summary: 'Récupérer une liste de services ou filtrer par critères',
                    operationId: 'getService',
                    parameters: [{
                        name: 'id',
                        in: 'query',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Filtrer par ID du service.'
                    }, {
                        name: 'date',
                        in: 'query',
                        schema: {
                            type: 'string',
                            format: 'date-time'
                        },
                        description: 'Filtrer par date du service.'
                    }, {
                        name: 'duration_m',
                        in: 'query',
                        schema: {
                            type: 'integer'
                        },
                        description: 'Filtrer par durée du service en minutes.'
                    }, {
                        name: 'location',
                        in: 'query',
                        schema: {
                            type: 'string'
                        },
                        description: 'Filtrer par nom de la localité.'
                    }, {
                        name: 'dog',
                        in: 'query',
                        schema: {
                            type: 'string'
                        },
                        description: 'Filtrer par nom du chien.'
                    }, ],
                    responses: {
                        '200': {
                            description: 'Récupération réussie des services.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Le ou les services ont bien été récupéré.s !'
                                            },
                                            body: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Service'
                                                }
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Mauvaise requête.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: "Il manque l'information..."
                                            },
                                            body: {
                                                type: 'string',
                                                example: `http://localhost:${port}/service?id=`
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'Le service avec ce ou ces paramètres n\'existe pas.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: 'Service non trouvée'
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
            },
            '/service/create': {
                post: {
                    tags: ['Service'],
                    summary: 'Créer un nouveau service',
                    operationId: 'createService',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ServiceInput'
                                }
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Service créé avec succès.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Le service a bien été créé !'
                                            },
                                            body: {
                                                $ref: '#/components/schemas/Service'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Champs obligatoires manquants.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: "Les champs 'location_id' et 'dog_id' sont obligatoires."
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Erreur interne du serveur ou échec de la création.'
                        },
                    },
                },
            },
            '/service/{id}/update': {
                patch: {
                    tags: ['Service'],
                    summary: 'Mettre à jour un service existant par ID',
                    operationId: 'updateService',
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer'
                        },
                        description: 'L\'ID du service à mettre à jour.'
                    }, ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ServiceInput'
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Service mis à jour avec succès.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Le service a bien été mis à jour !'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Le service avec cet ID n\'existe pas.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: 'Service non trouvée'
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
            '/service/{id}/delete': {
                delete: {
                    tags: ['Service'],
                    summary: 'Supprimer un service par ID',
                    operationId: 'deleteService',
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer'
                        },
                        description: 'L\'ID du service à supprimer.'
                    }, ],
                    responses: {
                        '200': {
                            description: 'Service supprimé avec succès.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Le service a bien été supprimé !'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Le service avec cet ID n\'existe pas.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                example: 'Service non trouvée'
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