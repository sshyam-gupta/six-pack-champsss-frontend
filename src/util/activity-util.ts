export type ActivityStatus = 'pending' | 'rejected' | 'approved';

export function getStatusColor(status: ActivityStatus | RedemptionStatus) {
  switch (status) {
    case 'pending':
      return 'orange';
    case 'rejected':
      return 'red';
    case 'approved':
    case 'completed':
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
  user_name: string;
};

export type RedemptionStatus = 'pending' | 'completed';

export type Redemption = {
  id: number;
  user_id: number;
  user_name: string;
  points: number;
  status: RedemptionStatus;
  reward_id?: number;
  created_at: string;
  updated_at: string;
};
