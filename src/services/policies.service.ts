import { Client } from '@/interfaces/clients.interface';
import { POLICIES_COMPANY_API } from '@/config/environment';
import { Policy } from '@/interfaces/policy.interface';
import axios from 'axios';

class PoliciesService {
  public getPolicies = async (): Promise<Policy[]> => {
    try {
      const response = await axios.get(POLICIES_COMPANY_API);

      const { policies } = response.data;

      return policies;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getPolicyByClientName = async (
    clientName: string,
  ): Promise<Policy[] | null> => {
    try {
      const response = await axios.get(POLICIES_COMPANY_API);

      const { policies } = response.data;

      const filteredPolicy: Policy[] = policies.filter(
        (policy: Policy) => policy.clientId === clientName,
      );

      return filteredPolicy;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getClientByPolicyId = async (name: string): Promise<Client | null> => {
    try {
      const response = await axios.get(POLICIES_COMPANY_API);

      const { policies } = response.data;

      /* const filteredPolicy = policies.filter(
        (policy: Policy) => client.name === name,
      ); */

      return policies;
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export default PoliciesService;
