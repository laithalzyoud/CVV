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

import { emit } from "cluster";

/**
 * Create position transaction
 * @param {org.cvv.position.createPosition} positionData
 * @transaction
 */

function    createPosition(positionData) {
 
    var positionRegistry = {};

    return getAssetRegistry('cvv.position.position')
    
        .then(function(registry){

            positionRegistry = registry;
 
            var posArr = (positionData.positionName).split(" ");
            var  positionId = positionData.employerId.substr(0,3);
            for (var i =0; i < posArr.length ; i++)
            positionId += posArr[i].charAt(0);
            var  factory = getFactory();
            var  pos = factory.newResource('org.cvv.position','position',positionId);
            pos.positionName = positionData.positionName;
            pos.employerId= positionData.employerId;

            return positionRegistry.add(position);

        }).then (function(){

            var event = getFactory().newEvent('org.cvv.position','positionCreated');
            event.positionId = positionData.positionId;
            emit(event);


        });
}

/**
 * Assign position transaction
 * @param {org.cvv.position.assignPosition} positionData
 * @transaction
 */

 function   AssignPosition(positionData) {

    var positionRegistry = {};
    return getAssetRegistry('org.cvv.position.position')
    .then(function(registry){

        positionRegistry = registry;
        return positionRegistry.get(positionData.positionId)})
        .then (function(position){

            if (!position) throw new Error("Position ID: " + positionData.positionId + " does not exist.");
            var factory = getFactory();
            var relationship = factory.newRelationship('org.cvv.employee','Employee',positionData.employeeId);
            position.owner = relationship;
            return positionRegistry.update(position);

        })
        .then(function(){

            var event = getFactory().newEvent('org.cvv.position','positionAssigned');
            event.positionId = positionData.positionId;
            event.employeeId = positionData.employeeId;
            emit(event);

        })
        .catch (function(error){

            throw new Error(error);
        });


    }


/**
 * Revoke position transaction
 * @param {org.cvv.position.revokePosition} positionData
 * @transaction
 */

function revokePosition (positionData) {

    var positionRegistry = {};
    return getAssetRegistry('org.cvv.position.position')
    .then(function(registry){

        positionRegistry = registry;
        return positionRegistry.get(positionData.positionId)})
        .then (function(position){

            if (!position) throw new Error("Position ID: " + positionData.positionId + " does not exist.");
            var factory = getFactory();
            var relationship = factory.newRelationship('org.cvv.employee','Employee',null);
            position.owner = relationship;
            return positionRegistry.update(position);

        })
        .then(function(){

            var event = getFactory().newEvent('org.cvv.position','positionRevoked');
            event.positionId = positionData.positionId;
            event.employeeId = positionData.employeeId;
            emit(event);

        })
        .catch (function(error){

            throw new Error(error);
        });

}
