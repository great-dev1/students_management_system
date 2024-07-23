// test_supabase_function.ts
import { superoak } from 'https://deno.land/x/superoak/mod.ts';
import { assertEquals } from 'https://deno.land/std@0.105.0/testing/asserts.ts';
import { handler } from '../students/index.ts'; // Adjust the path accordingly

const mockQueryObject = async () => ({
  rows: [
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
  ],
});
const mockConnection = {
  queryObject: mockQueryObject,
  release: () => {},
};
const mockPool = {
  connect: async () => mockConnection,
};

// Wrapper function to call the handler with the mock pool
async function testHandler(req: Request) {
  return handler({...req, pool: mockPool});
}

Deno.test('GET /students', async () => {
  const request = await superoak(testHandler);

  await request
    .get('/')
    .expect('Content-Type', /application\/json/)
    .expect(200)
    .then((response) => {
      assertEquals(response.body, [
        { id: 1, name: 'Student 1' },
        { id: 2, name: 'Student 2' },
      ]);
    });
});