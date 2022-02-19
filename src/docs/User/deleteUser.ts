export default {
    delete: {
        tags: ["User"],
        description: "Delete an user",
        operationId: "deleteUser",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/User/properties/_id"
                },
                required: true,
                description: "A single user id",
            },
        ],
        responses: {
            200: {
                description: "User is destroyed",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean"
                                }
                            }
                        }
                    }
                }
            },
            404: {
                description: "User is not found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error"
                        }
                    }
                }
            }
        }
    }
};