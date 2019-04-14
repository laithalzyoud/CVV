import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Employee} from './org.cvv.employee';
// export namespace org.cvv.position{
   export class position extends Asset {
      positionId: string;
      positionName: string;
      employerId: string;
      owner: Employee;
   }
   export class createPosition extends Transaction {
      positionName: string;
      employerId: string;
   }
   export class assignPosition extends Transaction {
      positionId: string;
      employeeId: string;
   }
   export class revokePosition extends Transaction {
      positionId: string;
      currentEmployeeId: string;
      terminationCause: string;
      punctualityRating: number;
      teamworkRating: number;
      performanceRating: number;
      cultureRating: number;
   }
   export class positionCreated extends Event {
      positionId: string;
   }
   export class positionAssigned extends Event {
      positionId: string;
      employeeId: string;
   }
   export class positionRevoked extends Event {
      positionId: string;
      employeeId: string;
   }
// }
