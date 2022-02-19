export default {
    put: {
        tags: ["User"],
        description: "Update user",
        operationId: "putUser",
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
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/getUser",
                    }
                }
            }
        },
        responses: {
            201: {
                description: "User was updated",
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