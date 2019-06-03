import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}
}
