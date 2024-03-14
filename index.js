import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
//Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
} else {
  // const __dirname = path.resolve();
  // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//Listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

//Conected to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });
