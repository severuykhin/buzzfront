import { isScreenName } from './Helpers'

it('Correctly determines is string like screen_name', () => {
    expect(isScreenName('senler')).toBe(true); 
    expect(isScreenName('senler_test')).toBe(true);
    expect(isScreenName('senler_')).toBe(true);

    expect(isScreenName('')).toBe(false); 
    expect(isScreenName('_____')).toBe(false); 
    expect(isScreenName('yep')).toBe(false); 
    expect(isScreenName('_test')).toBe(false); 
    expect(isScreenName('строка')).toBe(false);
    expect(isScreenName('строка_test')).toBe(false);
    expect(isScreenName('sтрока_test')).toBe(false);
    expect(isScreenName('строкаtets')).toBe(false);
});