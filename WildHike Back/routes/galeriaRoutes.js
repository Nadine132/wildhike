const express = require("express");
const passport = require("passport");
const {
  getAllGalerias,
  getGaleriaById,
  createGaleria,
  updateGaleria,
  deleteGaleria,
} = require("../controllers/GaleriaController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Galerias
 *   description: Operaciones relacionadas con las galerías.
 */

/**
 * @swagger
 * /api/galerias:
 *   get:
 *     summary: Obtiene todas las galerías
 *     tags: [Galerias]
 *     responses:
 *       200:
 *         description: Lista de galerías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Galeria'
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getAllGalerias);

/**
 * @swagger
 * /api/galerias/{id}:
 *   get:
 *     summary: Obtiene una galería por ID
 *     tags: [Galerias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la galería
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Galería encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Galeria'
 *       404:
 *         description: Galería no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", getGaleriaById);

/**
 * @swagger
 * /api/galerias:
 *   post:
 *     summary: Crea una nueva galería
 *     tags: [Galerias]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Galeria'
 *     responses:
 *       201:
 *         description: Galería creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Galeria'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createGaleria
);

/**
 * @swagger
 * /api/galerias/{id}:
 *   put:
 *     summary: Actualiza una galería por ID
 *     tags: [Galerias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la galería
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Galeria'
 *     responses:
 *       200:
 *         description: Galería actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Galeria'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Galería no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateGaleria
);

/**
 * @swagger
 * /api/galerias/{id}:
 *   delete:
 *     summary: Elimina una galería por ID
 *     tags: [Galerias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la galería
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Galería eliminada
 *       404:
 *         description: Galería no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteGaleria
);

module.exports = router;
