import nats, { Stan } from "node-nats-streaming";
// singleton class
class NatsWrapper {
  private _client?: Stan;
  // ts getter
  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    console.log("In the nats wrapper: trying connection");

    this._client = nats.connect(clusterId, clientId, { url });
    // // graceful shutdown, but we don't want it here, because
    // // some method in hidden file can burry the whole program, bad design
    // this._client.on("close", () => {
    //   console.log("NATS connection closed!");
    //   process.exit();
    // });
    // process.on("SIGINT", () => this.client.close());
    // process.on("SIGTERM", () => this.client.close());

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
