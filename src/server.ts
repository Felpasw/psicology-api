import app from './app';
import './config/moongooseFile'

const port: number = parseInt(process.env.PORT || '4000');

app.listen(port, () => {
  console.log(`Server UP: Port ${port} - Cors: ${process.env.CORS}`);
});
