

const generateGreeting = (name) => `Hello ${name}`;


test('It should return greeting', () => {
    const result = generateGreeting('Rehan');

    expect(result).toBe('Hello Rehan');
});