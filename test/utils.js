const brokenCapabilities = {
    'browserName': 'googlechrome',
    'platformName': 'macOS 10.15',
    'browserVersion': 'latest',
    'sauce:options': {
        'name': 'Broken Google Search',
        'tags' : 'broken-search-tag'
    }
};

const workingCapabilities = {
    'browserName': 'googlechrome',
    'platformName': 'macOS 10.15',
    'browserVersion': 'latest',
    'sauce:options': {
        'name': 'Guinea-Pig Sauce',
        'tags': 'working-test'
    }
};

exports.brokenCapabilities = brokenCapabilities
exports.workingCapabilities = workingCapabilities