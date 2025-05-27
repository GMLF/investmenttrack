const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API online 🚀');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.post('/investments', async (req, res) => {
  try {
    const { ticker, quantity, pricePaid, userId } = req.body;

    const investment = await prisma.investment.create({
      data: {
        ticker,
        quantity,
        pricePaid,
        userId,
      },
    });

    res.status(201).json(investment);
  } catch (error) {
    console.error('Erro ao criar investimento:', error);
    res.status(500).json({ error: 'Erro ao criar investimento' });
  }
});


app.get('/users/:id/investments', async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const investments = await prisma.investment.findMany({
      where: { userId },
    });

    res.json(investments);
  } catch (error) {
    console.error('Erro ao buscar investimentos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar investimentos' });
  }
});

app.get('/investments', async (req, res) => {
  try {
    const investments = await prisma.investment.findMany();
    res.json(investments);
  } catch (error) {
    console.error('Erro ao listar investimentos:', error.message);
    res.status(500).json({ error: 'Erro ao listar investimentos' });
  }
});

app.get('/dashboard/:userId', async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const investments = await prisma.investment.findMany({
      where: { userId },
    });

    const totalInvested = investments.reduce((sum, inv) => sum + (inv.quantity * inv.pricePaid), 0);
    const totalQuantity = investments.reduce((sum, inv) => sum + inv.quantity, 0);
    const uniqueTickers = [...new Set(investments.map(inv => inv.ticker))];

    res.json({
      totalInvested,
      totalQuantity,
      totalAssets: uniqueTickers.length,
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard:', error.message);
    res.status(500).json({ error: 'Erro ao gerar dashboard' });
  }
});
