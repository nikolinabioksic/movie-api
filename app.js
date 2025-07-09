const express = require('express');
const sequelize = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

require('./models/Genre');
require('./models/Movie');

const genreRoutes = require('./routes/genreRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
app.use(express.json());

// Swagger setup (opcionalno)
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Movie API', version: '1.0.0' }
  },
  apis: ['./routes/*.js']
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Rute
app.use('/genres', genreRoutes);
app.use('/movies', movieRoutes);

// Sync i start servera
sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log('Server running on port 3000\nSwagger: http://localhost:3000/api-docs'));
});
