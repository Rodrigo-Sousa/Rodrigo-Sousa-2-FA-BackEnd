export const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
        "title": "Descrição de como utilizar a API de autenticação em 2 fatores.",
        "description": "Desenvolvido uma API, que valida o token do usuário. Para que seja atribuido mais uma etapa de autenticação, quando o usuáiro inserir os dados para acessar uma página.",
        "version": "1.0.0"
    },
    "host": "http://localhost:3002",
    "tags": [
        {
            "usuário": "user",
            "description": "Criar usuário, com chave temporária."
        }
    ],
    "paths": {
        "/api": {
            "get": {
                "tags": [
                    "user"
                ],
                "summary": "Exibir a inicialização da API",
                "description": "Mostrando mensagem se a API foi inicializada, e uma saudação de boas vindas.",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Operação realizada com sucesso",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/User"
                            }
                        }
                    },
                    "400": {
                        "description": "Ocorreu um erro"
                    }
                }
            },
        },
        "/api/registro": {
            "post": {
                "tags": [
                    "user"
                ],
                "summary": "Cadastrar um novo usuário.",
                "description": "Registrando um novo usuário no arquivo meuBancoDados.json",
                "consumes": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Saldo atualizado com sucesso"
                    },
                    "400": {
                        "description": "Ocorreu um erro"
                    }
                }
            }
        },
        "/api/verificar": {
            "post": {
                "tags": [
                    "user"
                ],
                "summary": "Verificando se o usuário está cadastrado.",
                "description": "Realizando a verificação se o usuário está devidamente cadastrado no arquivo. Alterando a chave gerada de forma temporária, assim que o mesmo verificar o acesso.",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "userId": "body",
                        "token": "body",
                        "description": "Informando o Id do usuário, e a chave temporária, para alterar e inserir a definitiva.",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Verificar"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Contado apagada com sucesso."
                    },
                    "400": {
                        "description": "Ocorreu um erro"
                    }
                }
            }
        },
        "/api/validar": {
            "post": {
                "tags": [
                    "user"
                ],
                "summary": "Validando se o token do usuário.",
                "description": "Validando se o token inserido é o que o aplicativo autenticador informou e se o mesmo está no tempo de vida útil.",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "userId": "body",
                        "token": "body",
                        "description": "Informando o Id do usuário, e o token do usuário gerado pelo aplicativo autenticador e se o mesmo é valido.",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Validar"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Contado apagada com sucesso."
                    },
                    "400": {
                        "description": "Ocorreu um erro"
                    }
                }
            }
        }
    },
    "definitions": {
        "User": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string",
                    "example": "Bem vindo a aplicação em duplo fator. Exemplo"
                }
            }
        },
        "Verificar": {
            "type": "object",
            "properties": {
                "userId": {
                    "type": "number",
                    "example": "0ec43adc-a222-49be-b2e1-835c1b2eb3df"
                },
                "token": {
                    "type": "number",
                    "example": 573304
                }
            }
        },
        "Validar": {
            "type": "object",
            "properties": {
                "userId": {
                    "type": "number",
                    "example": "0ec43adc-a222-49be-b2e1-835c1b2eb3df"
                },
                "token": {
                    "type": "number",
                    "example": 148015
                }
            }
        }
    }
};