/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * 
 * @param {org.cvv.position.createPosition} positionData
 * @transaction
 */



function    createJob(positionData) {

    /**
     *  Validate the schedule data
     * If the date is a past date then throw an error
     */
    // var timeNow = new Date().getTime();
    // var schedTime = new Date(flightData.schedule).getTime();
    // if(schedTime < timeNow){
    //     throw new Error("Scheduled time cannot be in the past!!!");
    // }

    // Get the Asset Registry

    return getAssetRegistry('cvv.position.position')
    
        .then(function(positionRegistry){
            // Now add the Flight - global function getFactory() called
            var  factory = getFactory();

            var  NS =  'cvv.position';

            // Solution to exercise - Removed hardcoded value & invoked
            // generate the flight ID
            // 2.1 Set the flightNumber, flightId ... 
            var  positionId = '111'//generatejobId(flightData.flightNumber,flightData.schedule);
            var  position = factory.newResource(NS,'position',positionId);
            position.positionName = 'Software Developer';
            position.employerId='MIC22001';

            NS2='cvv.employer'
            //var sup_id='112'
            
            // var superVisor= factory.newResource(NS2,'Supervisor', sup_id);
            // var fname='sanad';
            // var lname='nimer';
            // var deptname='cs';
            // var emp_id='MIC001';
            // var comp_name='microsoft';
            // var comp_phone='0790773046';

            // var contact=factory.newConcept(NS2,"Contact");
            // contact.email="sanad.nimer@hotmail.com";
            // contact.mobilenumber="+962790773046";
            // contact.address="41, Mazen Al-Ajlouni";

            // superVisor.contactInfo=contact;
            // superVisor.firstName=fname;
            // superVisor.lastName=lname;
            // superVisor.deptName=deptname;
            // superVisor.employerId=emp_id;
            // superVisor.companyName=comp_name;
            // superVisor.companyPhoneNo=comp_phone;

            //job.supervisor=superVisor;


            

            // Flight asset has an instance of the concept
            // 2.2 Use the factory to create an instance of concept
            //var route = factory.newConcept(NS,"Route");

            // 2.3 Set the data in the concept 'route'
            // route.origin = flightData.origin;
            // route.destination = flightData.destination;
            // route.schedule = flightData.schedule;

            // 2.4 Set the route attribute on the asset
            //flight.route = route;
            

            // 3 Emit the event FlightCreated
            // var event = factory.newEvent(NS, 'FlightCreated');
            // event.flightId = flightId;
            // emit(event);

            // 4. Add to registry
            return jobRegistry.add(job);
        });
}