import { AngularmService, memoryDAO, entityType } from 'angularm';

export let describeDomain = (angularm: AngularmService) => {

  angularm.setupDomain(
    memoryDAO(
      entityType('student', 'students', {id: 'code'})
        .propertyType('code', 'integer')
        .propertyType('name', 'string')),
    memoryDAO(
      entityType('client', 'clients', {id: 'id'})
        .propertyType('id', 'string')
        .propertyType('age', 'string')),
    memoryDAO(
      entityType('car', 'cars', {id: 'id'})
        .propertyType('code', 'number')
        .propertyType('name', 'string'))
  );
};