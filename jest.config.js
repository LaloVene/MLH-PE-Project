module.exports = {
    verbose: true,
    moduleNameMapper: {
        '\\.(css|less|scss|sass|svg)$': 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    errorOnDeprecated: true,
};