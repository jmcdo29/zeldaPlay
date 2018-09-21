import { sendApp } from '../../src/utils/sendApp';

test('should call res.send() with the index.html file', () => {
  const sendFile = jest.fn();
  const res = {
    sendFile
  };
  sendApp({}, res as any, jest.fn());
  expect(sendFile.mock.calls).toHaveLength(1);
  expect(sendFile.mock.calls[0][0]).toBe('./index.html');
});
