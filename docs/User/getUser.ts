export default {
    get: {
        tags: ["User"],
        description: "Get a user",
        operationId: "getUser",
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
                description: "User is obtained",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/getUser"
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