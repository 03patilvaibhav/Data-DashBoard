const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://vp29981:Vpatil21@test.oobcjgf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', async () => {
  console.log('Connected to MongoDB');
});

// Define route to fetch project data
app.get('/api/projects', async (req, res) => {
  try {
    const projectCollection = db.collection('project');
    const documents = await projectCollection.find({}).toArray();

    // Extract required keys and their values
    const data = documents.map(doc => ({
      Intensity: doc.intensity,
      Likelihood: doc.likelihood,
      Relevance: doc.relevance,
      Year: doc.end_year,
      Country: doc.country,
      Topics: doc.topic,
      Region: doc.region,
      City: doc.city
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
console.log(data)
// Handle connection errors
db.on('error', console.error.bind(console, 'connection error:'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
