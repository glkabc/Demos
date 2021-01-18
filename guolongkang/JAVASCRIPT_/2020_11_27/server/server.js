const express = require('express');

let app = express();
let port = 3000;

app.get('/data',(req, res) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.writeHead(200, {'Content-Type':'text'});
   res.write(`Lo! 'tis a gala night
    Within the lonesome latter years!
 An angel throng, bewinged, bedight
    In veils, and drowned in tears,
 Sit in a theatre, to see
    A play of hopes and fears,
 While the orchestra breathes fitfully
    The music of the spheres.
 Mimes, in the form of God on high,
    Mutter and mumble low,
 And hither and thither fly-
    Mere puppets they, who come and go
 At bidding of vast formless things
    That shift the scenery to and fro,
 Flapping from out their Condor wings
    Invisible Woe!`);
    res.end();
})

app.listen(port, () => {
    console.log("Runing: http://localhost:" + port + "  ....")
})