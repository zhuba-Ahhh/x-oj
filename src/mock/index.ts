const mocks = [
  {
    url: '/api/user',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: 1,
          name: 'John Doe'
        }
      }
    }
  }
];

export default mocks;