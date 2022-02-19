export default {
    get: {
        tags: ["User"],
        description: "Get users",
        operationId: "getUsers",
        parameters: [],
        responses: {
            200: {
                description: "Users were obtained",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/getUser"
                            }
                        }
                    }
                }
            }
        }
    }
};