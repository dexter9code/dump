import express from 'express';

const app = express();
app.use(express.json({limit: '10kb'}));

const EMAIL = `admin@org.com`;
const PASSWORD = `admin12345`;

app.post(`/login`, async (req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.json({
      message: `Error Email or Password Missing`,
    });
    return;
  }
  if (email === EMAIL && password === PASSWORD) {
    res.json({
      message: `Success`,
      token: `nGirn4U5jA`,
      name: `John`,
    });
  } else {
    res.json({
      message: `Invalid Email or Password`,
    });
  }
});

app.get('/user-info', async (req, res, next) => {
  res.json({
    message: `Success`,
    email: EMAIL,
    name: `John`,
  });
});

const PORT = 8989;
app.listen(PORT, () => console.log(`listening on the PORT ${PORT}`));
