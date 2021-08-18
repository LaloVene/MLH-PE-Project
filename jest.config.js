module.exports = {
    verbose: true,
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    errorOnDeprecated: true,
};