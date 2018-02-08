const pusherConfig = {
    appId: '468619',
    key: '851333eb651b2537896c',
    secret: '491d44f1c5071173cd4e',
    cluster: 'us2',
    encrypted: true
}
const serverDetails = {
    port: process.env.PORT || 3000
}

module.exports = {
    pusherConfig: pusherConfig,
    serverDetails: serverDetails
}