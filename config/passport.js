const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// 引入自己配置的keys参数
const keys = require('../config/keys')
// 引入model:User
const mongoose = require('mongoose')
const User = mongoose.model('users')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.privateSecret

module.exports = function (passport) {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // jwt-payload 是自己配置的‘规则’
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err)
    )
  }))
}
