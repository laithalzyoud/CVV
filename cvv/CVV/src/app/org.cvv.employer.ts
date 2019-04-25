import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.cvv.employer{
   export class Employer extends Participant {
      employerId: string;
      companyName: string;
      companyPhoneNo: string;
      email: string;
      address: string;
   }
// }
