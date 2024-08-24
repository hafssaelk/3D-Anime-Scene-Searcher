import express from 'express';
import fetch from 'node-fetch';
import { Buffer } from 'buffer'; // Explicitly import Buffer

const app = express();

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const body = Buffer.from(arrayBuffer);

        res.set('Content-Type', response.headers.get('content-type'));
        res.send(body);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
});
