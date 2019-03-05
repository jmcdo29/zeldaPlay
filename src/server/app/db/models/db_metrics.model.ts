export class DbMetrics {
  id: string;
  method: ('GET' | 'POST') | ('PUT' | 'PATCH') | 'DELETE';
  route: string;
  responseStatus: number;
  responseTime: number;
}
