const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authenticate = require('./middleware/authenticate');
const fs = require('fs');
const PDF = require('./models/PDF');

const app = express();

// Configuración de middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Ruta para obtener un PDF por ID
app.get('/api/pdf/:id', async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ error: 'PDF no encontrado' });
    }
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.data.length.toString()
    });
    res.send(pdf.data);
  } catch (err) {
    console.error('Error al obtener el PDF:', err);
    res.status(500).json({ error: 'Error al obtener el PDF' });
  }
});

// Función para leer y almacenar PDF en MongoDB
function storePDFInMongoDB(pdfPath, pdfName) {
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      console.error('Error al leer el archivo PDF:', err);
      return;
    }

    const newPDF = new PDF({
      name: pdfName,
      data: data
    });

    newPDF.save()
      .then(savedPDF => {
        console.log(`PDF ${pdfName} almacenado en MongoDB con ID: ${savedPDF._id}`);
        return savedPDF._id; // Devolver el ID del PDF guardado
      })
      .catch(err => {
        console.error(`Error al almacenar PDF ${pdfName} en MongoDB:`, err);
      });
  });
}

// Almacenar todos los PDFs que necesitas
const pdfFiles = [
  'CaraOCruz.pdf',
  'CartaDeDespedida.pdf',
  'CartaDelFuturo.pdf',
  'CollageDeSueños.pdf',
  'CuidadoDeLaSaludMental.pdf',
  'DesarrolloPersonalyBienestar.pdf',
  'FormulaDePrimeraSesión.pdf',
  'GuiaDeFelicidad80ConsejosSaludMental.pdf',
  'GuiaSaludMentalUnEstadoDeBienestar.pdf',
  'GuiaSaludMentalyApoyoPsicosocial.pdf',
  'IncordiandoAlmuneco.pdf',
  'InvertirEnSaludMentalOMS.pdf',
  'LaPequeñaFelicidad.pdf',
  'LaSaludMentalDelAdolescente.pdf',
  'LaTareaDePredicción.pdf',
  'SaldremosDeEstaGuiaSaludMentalPersonasEnCrisis.pdf'
];

pdfFiles.forEach(pdfFile => {
  storePDFInMongoDB(`assets/pdf/${pdfFile}`, pdfFile);
});

// Endpoint de registro de usuario
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario o email ya están en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });
    const token = jwt.sign({ username: newUser.username }, 'clave_secreta', { expiresIn: '1h' });
    newUser.token = token;

    await newUser.save();

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(400).json({ error: err.message });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ username: user.username }, 'clave_secreta', { expiresIn: '1h' });
    user.token = token;
    await user.save();

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta de eliminación de cuenta
app.delete('/delete-account', authenticate, async (req, res) => {
  const { username } = req.user;

  try {
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta de ChatGPT
app.post('/api/chat', authenticate, async (req, res) => {
  const userMessage = req.body.message;
  const apiKey = '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';

  if (!userMessage) {
    return res.status(400).json({ error: 'No se proporcionó ningún mensaje' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const chatResponse = response.data.choices[0].message.content;

    const user = await User.findOne({ username: req.user.username });

    user.messages.push({ from: 'User', text: userMessage });
    user.messages.push({ from: 'ChatGPT', text: chatResponse });

    await user.save();

    if (isEmotionalSupportResponse(chatResponse)) {
      res.json({ reply: chatResponse });
    } else {
      res.json({
        reply: 'Soy un asistente de ayuda emocional. ¿Hay algo más en lo que pueda ayudarte?'
      });
    }
  } catch (error) {
    console.error('Error al obtener respuesta de ChatGPT:', error);
    res.status(500).json({ error: 'Error al comunicarse con ChatGPT' });
  }
});

// Función para verificar si la respuesta es de apoyo emocional
function isEmotionalSupportResponse(message) {
  const emotionalKeywords = ['hola', 'ánimo', 'triste', 'ansiedad', 'preocupado', 
    'deprimido', 'estres', 'consejo', 'ayuda', 'buenos dias', 'buenas noches', 'hablar'];
  const lowerCaseMessage = message.toLowerCase();

  return emotionalKeywords.some(keyword => lowerCaseMessage.includes(keyword));
}

// Ruta para recuperar mensajes anteriores
app.get('/api/chat/messages', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    res.json({ messages: user.messages });
  } catch (error) {
    console.error('Error al recuperar mensajes:', error);
    res.status(500).json({ error: 'Error al recuperar mensajes' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
