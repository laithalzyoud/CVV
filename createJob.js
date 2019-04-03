/**
 * Sample transaction
 * @param {org.cvv.job.createJob} jobData
 * @transaction
 */



function    createJob(jobData) {

    /**
     * 1. Validate the schedule data
     * If the date is a past date then throw an error
     */
    // var timeNow = new Date().getTime();
    // var schedTime = new Date(flightData.schedule).getTime();
    // if(schedTime < timeNow){
    //     throw new Error("Scheduled time cannot be in the past!!!");
    // }

    // Get the Asset Registry

    return getAssetRegistry('cvv.job.Job')
    
        .then(function(jobRegistry){
            // Now add the Flight - global function getFactory() called
            var  factory = getFactory();

            var  NS =  'cvv.job';

            // Solution to exercise - Removed hardcoded value & invoked
            // generate the flight ID
            // 2.1 Set the flightNumber, flightId ... 
            var  jobId = '111'//generatejobId(flightData.flightNumber,flightData.schedule);
            var  job = factory.newResource(NS,'Job',jobId);
            job.jobName = 'Software Developer';

            NS2='cvv.employer'
            var sup_id='112'
            
            var superVisor= factory.newResource(NS2,'Supervisor', sup_id);
            var fname='sanad';
            var lname='nimer';
            var deptname='cs';
            var emp_id='MIC001';
            var comp_name='microsoft';
            var comp_phone='0790773046';

            var contact=factory.newConcept(NS2,"Contact");
            contact.email="sanad.nimer@hotmail.com";
            contact.mobilenumber="+962790773046";
            contact.address="41, Mazen Al-Ajlouni";

            superVisor.contactInfo=contact;
            superVisor.firstName=fname;
            superVisor.lastName=lname;
            superVisor.deptName=deptname;
            superVisor.employerId=emp_id;
            superVisor.companyName=comp_name;
            superVisor.companyPhoneNo=comp_phone;

            job.supervisor=superVisor;


            

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