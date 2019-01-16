export class DbPlayer {
  pId: string;
  pEmail: string;
  pPassword: string;
  pRecoveryToken: string;
  pRole: 'Admin' | 'DM' | 'Player';
}
