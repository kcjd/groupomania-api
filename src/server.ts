import http from 'http'
import app from './app'

const port = process.env.PORT || 5500

app.set('port', port)

const server = http.createServer(app)

server.on('listening', () => {
  console.log(`Listening on port ${port}`)
})

server.listen(port)
