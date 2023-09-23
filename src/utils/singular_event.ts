type SingularEventCallback<Payload, Response> = (payload: Payload) => Response;

export class SingularEvent<Payload, Response> {
  private subscription: SingularEventCallback<Payload, Response> | null = null;

  public subscribe(callback: SingularEventCallback<Payload, Response>): void {
    if (this.subscription) {
      console.error(
        `SinglularEvent can only have one subscription at a time! Overwriting previous subscritption`
      );
    }
    this.subscription = callback;
  }

  public unsubscribe(): void {
    this.subscription = null;
  }

  public fire(payload: Payload): Response | null {
    if (!this.subscription) {
      console.error(
        `Fired SingularEvent even though no one subscribed! Returning null`
      );
      return null;
    }

    return this.subscription(payload);
  }
}
