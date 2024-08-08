const express = require("express");
const passport = require("passport");
const {
  getAllFavoritos,
  getFavoritoById,
  createFavorito,
  updateFavorito,
  deleteFavorito,
} = require("../controllers/FavoritoController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Operaciones relacionadas con los favoritos.
 */

/**
 * @swagger
 * /api/favoritos:
 *   get:
 *     summary: Obtiene todos los favoritos
 *     tags: [Favoritos]
 *     responses:
 *       200:
 *         description: Lista de favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorito'
 *       500:
 *         description: Error en el servidor
 */
router.get("/", getAllFavoritos);

/**
 * @swagger
 * /api/favoritos/{id}:
 *   get:
 *     summary: Obtiene un favorito por ID
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del favorito
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorito'
 *       404:
 *         description: Favorito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", getFavoritoById);

/**
 * @swagger
 * /api/favoritos:
 *   post:
 *     summary: Crea un nuevo favorito
 *     tags: [Favoritos]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorito'
 *     responses:
 *       201:
 *         description: Favorito creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorito'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createFavorito
);

/**
 * @swagger
 * /api/favoritos/{id}:
 *   put:
 *     summary: Actualiza un favorito por ID
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del favorito
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorito'
 *     responses:
 *       200:
 *         description: Favorito actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorito'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Favorito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateFavorito
);

/**
 * @swagger
 * /api/favoritos/{id}:
 *   delete:
 *     summary: Elimina un favorito por ID
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del favorito
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorito eliminado
 *       404:
 *         description: Favorito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteFavorito
);

module.exports = router;
