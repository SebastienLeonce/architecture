export default {
    post: {
        tags: ["User"],
        description: "Create user",
        operationId: "postUser",
        parameters: [],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/newUser",
                    }
                }
            }
        },
        responses: {
            201: {
                description: "User was created",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/getUser"
                        }
                    }
                }
            }
        }
    }
};