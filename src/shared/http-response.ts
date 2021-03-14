export class HttpResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  message?: string;

  constructor(success: boolean, data: T, timestamp: string, message?: string) {
    this.success = success;
    this.data = data;
    this.timestamp = timestamp;
    this.message = message;
  }
}
