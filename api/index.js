import express from 'express';
import sharp from 'sharp';
import multer from 'multer';

const app = express();
app.use(express.json());

// const upload = multer({dest: 'assets/'});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    },
  }),
}).single('user_img');

app.post(`/upload-img`, upload, async (req, res, next) => {
  res.send({
    message: `Success`,
  });
});

app.listen(5050, () => console.log(`listening on local host 5050`));
