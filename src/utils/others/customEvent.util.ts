export type functionEvent = (details?: unknown) => unknown

export class CustomMessageEventApp {
  private readonly eventName: string
  private callback: functionEvent

  constructor (eventName: string) {
    this.eventName = 'custom:' + eventName
    this.callback = () => {}
  }

  public sendMessage (params?: { detail?: unknown | null }) {
    const customEvent = new CustomEvent(this.eventName, { detail: params?.detail })
    document.dispatchEvent(customEvent)
  }

  public listenEvent (callback: functionEvent) {
    this.callback = callback
    document.addEventListener(this.eventName, callback)
  }

  public removeEvent () {
    document.removeEventListener(this.eventName, this.callback)
  }
}