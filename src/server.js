import express from "express";
//import userRouter from './routes/user.router.js';
//import petRouter from './routes/pet.router.js'; // Comenta o elimina esta línea
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
// import { loggerMid } from "./middlewares/loggerMid.js";
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//app.use('/users', userRouter);
//app.use('/pets', petRouter); // Comenta o elimina esta línea
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
