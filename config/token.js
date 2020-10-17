module.exports = {
  tokenConfig: {
    secretOrPublicKey: process.env.SECRET_OR_PUBLICKEY,
    options: {
      expiresIn: '24h',
    },
  },
}
