import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.cvv.employee{
   export class Employee extends Participant {
      employeeId: string;
      firstName: string;
      lastName: string;
      PhoneNo: string;
      email: string;
      address: string;
      employer: string;
   }
// }
