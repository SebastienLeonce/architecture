export default {
    post: {
        tags: ["Auth"],
        description: "Register",
        operationId: "registerAuth",
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