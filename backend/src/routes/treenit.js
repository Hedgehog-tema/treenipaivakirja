import { Router } from 'express';
import { readTreenit, writeTreenit, getNextId } from '../storage.js';
import { validateTreeni } from '../validate.js';

const router = Router();

// GET /api/treenit — list all
router.get('/', async (req, res, next) => {
  try {
    const treenit = await readTreenit();
    res.json(treenit);
  } catch (err) {
    next(err);
  }
});

// GET /api/treenit/:id — one
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const treenit = await readTreenit();
    const treeni = treenit.find((t) => t.id === id);
    if (!treeni) {
      return res.status(404).json({ error: 'Treeniä ei löytynyt' });
    }
    res.json(treeni);
  } catch (err) {
    next(err);
  }
});

// POST /api/treenit — create
router.post('/', async (req, res, next) => {
  try {
    const errors = validateTreeni(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const treenit = await readTreenit();
    const newTreeni = {
      id: await getNextId(),
      laji: req.body.laji,
      kesto: req.body.kesto,
      matka: req.body.matka ?? 0,
      syke: req.body.syke ?? 0,
      fiilis: req.body.fiilis ?? '',
      paiva: req.body.paiva,
      muistiinpanot: req.body.muistiinpanot ?? '',
    };

    treenit.push(newTreeni);
    await writeTreenit(treenit);
    res.status(201).json(newTreeni);
  } catch (err) {
    next(err);
  }
});

// PUT /api/treenit/:id — update
router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const treenit = await readTreenit();
    const index = treenit.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Treeniä ei löytynyt' });
    }

    const errors = validateTreeni(req.body, { partial: true });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updated = { ...treenit[index], ...req.body, id };
    treenit[index] = updated;
    await writeTreenit(treenit);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/treenit/:id — delete
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const treenit = await readTreenit();
    const index = treenit.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Treeniä ei löytynyt' });
    }

    treenit.splice(index, 1);
    await writeTreenit(treenit);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;