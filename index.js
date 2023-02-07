const http = require('http')

const PORT = 3000

const server = http.createServer()

const friends = [
    {
        id: 0,
        name: "Olivier Messiaen"
    },
    {
        id: 1,
        name: "Sergei Rachmaninoff"
    },
    {
        id: 2,
        name: "Johann Sebastian Bach"
    }
]

server.on('request', (req, res)=>{
    const items = req.url.split('/')
    if (req.method === 'POST' && items[1]  === 'friends') { 
        req.on('data', (data) => {
            const friend = data.toString()
            console.log('Request data: ', friend)
            friends.push(JSON.parse(friend))
        })
        req.pipe(res) // this echoes the posted data, back to the client.  
        
        /* This piece of code is the post message to pass via browser console to simulate the POST with an echo request:
        
        fetch('http://localhost:3000/friends', {
            method: 'POST',
            body: JSON.stringify({id: 3, name: 'Igor Stravinsky'})
        })
        .then((response) => response.json())
        .then((friend) => console.log(friend))
        
        */ 
    } else if (req.method === 'GET' && items[1]  === 'friends') {    
        /* res.writeHead(200,{
        'ContentType': 'application/json',
        }) */
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        if (items.length === 3) {
            friendsIndex = Number(items[2])
            res.end(JSON.stringify(friends[friendsIndex]))  
        } else {
            res.end(JSON.stringify(friends))            
        }
    } else if (req.method === 'POST' && items[1]=== 'messages') {
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