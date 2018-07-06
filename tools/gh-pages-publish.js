const ghpages = require('gh-pages');

/**
 * This configuration will avoid logging the GH_TOKEN if there is an error.
 */
ghpages.publish('docs', {

    repo: 'https://' + process.env.GH_TOKEN + '@github.com/rand0me/redux-appinsights-middleware.git',
    silent: true
}, () => console.log("Done."));