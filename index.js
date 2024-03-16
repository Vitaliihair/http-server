const http = require('http');



const PORT = 4000;

const server = http.createServer();

let friends = [
    {
        id: 0,
        name: 'Nikola Tesla'
    },
    {
        id: 1,
        name: 'Isaak Newton'
    },
    {
        id: 2,
        name: 'Albert Einstein'
    }
]

class Friend {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      
    }
  }
  
  const friend1 = new Friend(3, 'Freddy Krueger');
  const friend2 = new Friend(4, 'Jason Voorhees');

  friends.push(friend1);
friends.push(friend2)

server.on('request', (req, res) => {
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = {
                id: friends[friends.length - 1].id + 1,
                name: JSON.parse(data.toString()).name
            };
            friends.push(friend);
            res.end(JSON.stringify(friend));
        })


        // req.pipe(res);
    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        if (items.length === 3) {
            const friendNumber = Number(items[2])
            res.end(JSON.stringify(friends[friendNumber]))
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>First msg</li>')
        res.write('<li>Second msg</li>')
        res.write('</ul>');
        res.write('</body>');
        res.write('<html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
})

function removeFriendById(id) {
    friends = friends.filter(friend => friend.id !== id);
  }
 
  removeFriendById(2);
  removeFriendById(0);
  


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

















