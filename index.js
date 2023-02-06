const http = require('http')

const PORT = 3000

const server = http.createServer()

server.on('request', (req, res)=>{
    if (req.url === '/friends') {    
        /* res.writeHead(200,{
        'ContentType': 'application/json',
        }) */
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        res.end(JSON.stringify({
            id: 1,
            name: "Olivier Messiaen",
            age: 82
        }))
    } else if (req.url === '/messages') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'html')

        res.write('<html>')
        res.write('<body>')
        res.write('<ul>')
        res.write('<li> Hola Olivier! </li>')
        res.write('<li> Compusite hoy?? </li>')
        res.write('</li>')
        res.write('<body>')
        res.write('</body>')
        res.write('</html>')
    } else {
        res.statusCode = 404
        res.end()
    }
})

server.listen(PORT,() => {
    console.log(`Listening to the port ${PORT}`)
})