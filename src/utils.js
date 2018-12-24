import { normalize, schema } from 'normalizr';

/**
 * Returns a new object whose keys are the values of the unique property in each object, in an array of objects
 * Example: IP: sampleArray = [{userId: 1, name:'abc'},{userId: 2, name:'def'}]
 * To Call: normalizeItems(sampleArray, 'userId');
 * OP: {1: {userId: 1, name:'abc'}, 2:{userId: 2, name:'def'}}
 * @param items - type: array, to be normalized
 * @param idAttribute - type: string, property to be used as the normalized object's key
 */

export const normalizeItems = (items, idAttribute) => normalize(items || [], [new schema.Entity('items', {}, { idAttribute: idAttribute || 'id' })]).entities.items;

export const getDate = date => `${new Date(date).getDate()}-${new Date(date).getDay()}-${new Date(date).getFullYear()} ${new Date(date).getHours()}:${new Date(date).getMinutes()} `;
