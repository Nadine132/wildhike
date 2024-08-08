const express = require("express");
const passport = require("passport");
const {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
} = require("../controllers/RutaController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rutas
 *   description: Operaciones relacionadas con las rutas.
 */

/**
 * @swagger
 * /api/rutas:
 *   get:
 *     summary: Obtiene todas las rutas
 *     tags: [Rutas]
 *     responses:
 *       200:
 *         description: Lista de rutas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ruta'
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getAllRutas);

/**
 * @swagger
 * /api/rutas/{id}:
 *   get:
 *     summary: Obtiene una ruta por ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ruta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ruta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ruta'
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", getRutaById);

/**
 * @swagger
 * /api/rutas:
 *   post:
 *     summary: Crea una nueva ruta
 *     tags: [Rutas]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ruta'
 *     responses:
 *       201:
 *         description: Ruta creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ruta'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post("/", passport.authenticate("jwt", { session: false }), createRuta);

/**
 * @swagger
 * /api/rutas/{id}:
 *   put:
 *     summary: Actualiza una ruta por ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ruta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ruta'
 *     responses:
 *       200:
 *         description: Ruta actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ruta'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateRuta
);

/**
 * @swagger
 * /api/rutas/{id}:
 *   delete:
 *     summary: Elimina una ruta por ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ruta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ruta eliminada
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteRuta
);

module.exports = router;
