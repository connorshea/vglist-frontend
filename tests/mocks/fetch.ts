/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';

let fetchSpy: any;

export const fetchMock = {
  setup(): void {
    if (!global.fetch) {
      global.fetch = fetch as any;
    }

    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(fetch as any);
  },
  teardown(): void {
    fetchSpy.mockRestore();
  },
};
