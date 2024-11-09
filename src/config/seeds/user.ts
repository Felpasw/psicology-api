import mongoose from 'mongoose';
import UserModel from '../tableModels/user';  
import {config} from 'dotenv'

config()

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fovabzu.mongodb.net/psicology?retryWrites=true&w=majority`;

mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

  const userSeedData = [
  {
    username: 'adminUser',
    email: 'admin@example.com',
    password: '$2a$12$Kk.xFxGWbIp79MsZ2MRihehCnRk6Me2ABF4Ej1HsRc2MctvA/fVUq',  
  },
 
];

const seedUsers = async () => {
  try {
    await UserModel.deleteMany({});
    await UserModel.insertMany(userSeedData);
    console.log('Dados de seed inseridos com sucesso.');
  } catch (error) {
    console.error('Erro ao executar o seed:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
