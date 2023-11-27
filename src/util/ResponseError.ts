export default class ResponseError extends Error {
  private status: number;
  private responseMessage: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.responseMessage = 'internal server error';
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
