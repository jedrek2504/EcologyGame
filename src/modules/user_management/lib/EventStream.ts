class EventStreamEvent extends Event {
    public data: any
    constructor ({ type, data } : {type: string, data: any}) {
      super(type)
      this.data = data
    }
}
class EventStream extends EventTarget {
    private static _instance: EventStream
    public static getInstance () : EventStream {
      if (!this._instance) this._instance = new EventStream()
      return this._instance
    }

    public emit (type : string, data?: any) : void {
      this.dispatchEvent(new EventStreamEvent({ type, data }))
    }
}