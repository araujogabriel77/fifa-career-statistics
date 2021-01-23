import express from 'express';

import teamRouter from './routes/team.routes';

const app = express();

app.use(express.json());

app.use('/teams', teamRouter);


app.listen(3333, () => {
    console.log('tamo on');
});


