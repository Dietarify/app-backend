export default class ResponseError extends Error {
  private status: number;
  private responseMessage: string;

  constructor(status: number, message: string, responseMessage?: string) {
    super(message);
    this.status = status;
    this.responseMessage = responseMessage ?? message;
  }

  setResponseMessage(message: string) {
    this.responseMessage = message;
    return this;
  }

  getResponse(): [number, any] {
    return [
      this.status,
      {
        status: 'failed',
        message: this.responseMessage,
        data: null,
      },
    ];
  }
}
