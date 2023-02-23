const mysql = require('mysql');
const { saveRequestDetails } = require('../../../services/request.service');

jest.setTimeout(3000);
const mockQuery = jest.fn();
jest.mock('mysql', () => ({
    createConnection: () => ({ 
        connect: () => undefined,
        query: mockQuery
    }),
  
}));

describe('Save Request payload ', () => {
    it('should save request data in database', async () => {
        const data = {
            name: 'test'
        };
        const results = await saveRequestDetails(data);
        console.log(results);
        expect(results[0]).toEqual(1);
    });
});