import ApiService from '../api';
import { REDEEM_KLAPS } from '../api/endpoints';

class RedeemService {
  static async redeemKlaps(payload: any) {
    return await ApiService.post(REDEEM_KLAPS, payload);
  }
}
export default RedeemService;
