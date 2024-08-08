const express = require("express");
const passport = require("passport");
const {
  getAllRutasRealizadas,
  getRutasRealizadasById,
  createRutasRealizadas,
  updateRutasRealizadas,
  deleteRutasRealizadas,
} = require("../controllers/RutasRealizadasController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rutas Realizadas
 *   description: Operaciones relacionadas con las rutas realizadas.
 */

/**
 * @swagger
 * /api/rutas-realizadas:
 *   get:
 *     summary: Obtiene todas las rutas realizadas
 *     tags: [Rutas Realizadas]
 *     responses:
 *       200:
 *         description: Lista de rutas realizadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RutaRealizada'
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getAllRutasRealizadas);

/**
 * @swagger
 * /api/rutas-realizadas/{id}:
 *   get:
 *     summary: Obtiene una ruta realizada por ID
 *     tags: [Rutas Realizadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ruta realizada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ruta realizada encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RutaRealizada'
 *       404:
 *         description: Ruta realizada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", getRutasRealizadasById);

/**
 * @swagger
 * /api/rutas-realizadas:
 *   post:
 *     summary: Crea una nueva ruta realizada
 *     tags: [Rutas Realizadas]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RutaRealizada'
 *     responses:
 *       201:
 *         description: Ruta realizada creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RutaRealizada'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRutasRealizadas
);

/**
 * @swagger
 * /api/rutas-realizadas/{id}:
 *   put:
 *     summary: Actualiza una ruta realizada por ID
 *     tags: [Rutas Realizadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ruta realizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RutaRealizada'
 *     responses:
 *       200:
 *         description: Ruta realizada actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RutaRealizada'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Ruta realizada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateRutasRealizadas
);

/**
 * @swagger
 * /api/rutas-realizadas/{id}:
 *   delete:
 *     summary: Elimina una ruta realizada por ID
 *     tags: [Rutas Realizadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ruta realizada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ruta realizada eliminada
 *       404:
 *         description: Ruta realizada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteRutasRealizadas
);

module.exports = router;
