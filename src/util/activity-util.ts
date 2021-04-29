export type ActivityStatus = 'pending' | 'rejected' | 'approve';

export function getStatusColor(status: ActivityStatus) {
  switch (status) {
    case 'pending':
      return 'orange';
    case 'rejected':
      return 'red';
    case 'approve':
      return 'green';
    default:
      return 'orange';
  }
}

export type Activity = {
  description: string;
  id: number;
  projectName: string;
  project_id: number;
  duration: number;
  performed_on: string;
  status: ActivityStatus;
  points_requested: number;
  points_granted: number;
  user_id: number;
};
