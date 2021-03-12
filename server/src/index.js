const app = require('./app')
const port = process.env.PORT || 3001

// const secret = 'oF2xeLLRhY6kFldKsmQuR3dx'
// const accessToken = "ya29.a0AfH6SMAYOzD49PLpjV1jeuyKnsuibA5Du-3S-go0sGAHNXWAv-YtcZrn05kOKIabc7cwrm3NMfnVg7YsmDQkonn6hLnP_gAStum4-RWa60haisyrK8Ao2pJ55SQsraUBrhgn8pDxlcEjCfjLVN0I9F4bdxLi"
// const jwt = require('jsonwebtoken')
// const decoded = jwt.decode(accessToken, {complete: true})
// console.log(decoded)

app.listen(port, () => {
  console.log(`App is running on a port ${port}`)
})
