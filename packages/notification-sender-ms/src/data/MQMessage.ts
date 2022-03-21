export class MQMessage {
    private payload: string;
    private attributes: string[];

    public getAttributes(): string[] { return this.attributes; }

    constructor(payload: string) {
        this.payload = payload;
        this.attributes = this.payload.split('#');
    }
}