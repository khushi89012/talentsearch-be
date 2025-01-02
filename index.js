// Importing express module
import express from 'express';
import { generateTestCase } from './controller.js';
import cors from 'cors'

// Initialize the app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/generate-test-case',generateTestCase)

// Set up server to listen on a port
const PORT =  8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});