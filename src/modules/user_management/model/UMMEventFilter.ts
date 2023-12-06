class UMMEventFilter {
    private eventTypes : EventType[];
    constructor() {
        this.eventTypes = [];
    }
    addEventType(eventType : EventType) : void {
        this.eventTypes.push(eventType);
    }
    removeEventType(eventType : EventType) : void {
        let index = this.eventTypes.indexOf(eventType);
        if (index !== -1) {
            this.eventTypes.splice(index, 1);
        }
    }
    getEventTypes() : EventType[] {
        return this.eventTypes.map((t)=>t);
    }
}