export default {
    post: {
        tags: ["Auth"],
        description: "Login",
        operationId: "loginAuth",
        parameters: [],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/login",
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