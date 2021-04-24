export type ActivityStatus = 'PENDING' | 'REJECTED' | 'APPROVED';

export function getStatusColor(status: ActivityStatus) {
  switch (status) {
    case 'PENDING':
      return 'orange';
    case 'REJECTED':
      return 'red';
    case 'APPROVED':
      return 'green';
    default:
      return 'orange';
  }
}

export type Activity = {
  description: string;
  id: number;
  projectName: string;
  duration: string;
  timestamp: string;
  status: ActivityStatus;
  points: number;
  userName: string;
};
