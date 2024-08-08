const express = require("express");
const passport = require("passport");
const {
  getAllComentarios,
  getComentarioById,
  createComentario,
  updateComentario,
  deleteComentario,
} = require("../controllers/ComentarioController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Operaciones relacionadas con los comentarios.
 */

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Obtiene todos los comentarios
 *     tags: [Comentarios]
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getAllComentarios);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   get:
 *     summary: Obtiene un comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", getComentarioById);

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [Comentarios]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       201:
 *         description: Comentario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createComentario
);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   put:
 *     summary: Actualiza un comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateComentario
);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   delete:
 *     summary: Elimina un comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentario eliminado
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComentario
);

module.exports = router;
