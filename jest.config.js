module.exports = {
    verbose: true,
    moduleNameMapper: {
        '\\.(css|less|scss|sass|svg|png)$': 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    errorOnDeprecated: true,
};