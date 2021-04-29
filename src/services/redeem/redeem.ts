import ApiService from '../api';
import { REDEEM_POINTS } from '../api/endpoints';

class RedeemService {
  static async redeemKlaps(payload: any) {
    return await ApiService.post(REDEEM_POINTS, payload);
  }
}
export default RedeemService;
