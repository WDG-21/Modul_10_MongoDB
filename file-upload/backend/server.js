import express from 'express';
import cors from 'cors';
import upload from './middlewares/upload.js';
// import path from 'path';

const app = express();

app.use(cors());
// app.use(express.json());

app.use(express.static('upload'));

app.get('/', (req, res) => {
  res.send('Running');
});

app.post('/file-upload', upload.single('my-file'), (req, res) => {
  const filepath = `${req.protocol}://${req.host}/${req.file.filename}`;
  // const filepath = path.join(`${req.protocol}://${req.host}`, req.file.filename);

  // console.log(req.files);

  res.json({ message: 'File upload successful', filepath });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(3000, () => console.log(` File Upload server listening on port 3000 `));
