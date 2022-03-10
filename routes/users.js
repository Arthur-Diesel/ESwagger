const express = require("express");

const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
      filename: "./db/db.db"
    }
});

const router = express.Router();

/**
 * @swagger
 *
 * /users:
 *      get:
 *          responses:
 *              200:
 *                  description: Retorna os dados de todos os usuários.
 */
router.get('/', async (req, res) => {
    res.status(200).json({data: await knex.select().from('users')})
})

/**
 * @swagger
 *
 * /users/{id}:
 *      get:
 *          parameters:
 *          - in: path
 *            name: id
 *            schema:
 *             type: integer
 *            required: true
 *            description: id de um usuário.
 *          responses:
 *              200:
 *                  description: Retorna os dados de um usuário referente ao id informado.
 */
router.get('/:id', async (req, res) => {
    res.status(200).json({data: await knex.select().where('id', req.params.id).from('users')})
})

/**
 * @swagger
 *
 * /users:
 *      post:
 *       requestBody:
 *        required: true
 *        content:  
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            first_name:
 *             type: string
 *             description: Primeiro nome do usuário.
 *             example: Arthur
 *             required: true
 *            last_name:
 *             type: string
 *             description: Último nome do usuário.
 *             example: Ogg
 *             required: false
 *            email:
 *             type: string
 *             description: Email do usuário.
 *             example: arthurdiesel@outlook.com
 *             required: true
 *       responses:
 *        201:
 *         description: Adiciona um usuário com os dados informados.   
 */
router.post('/', async (req, res) => {
    res.status(201).json({data: await knex('users').insert(req.body)})
})

/**
 * @swagger
 *
 * /users/{id}:
 *      put:
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *         required: true
 *         description: id de um usuário.
 *       requestBody:
 *        required: true
 *        content:  
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            first_name:
 *             type: string
 *             description: Primeiro nome do usuário.
 *             example: Arthur
 *             required: false
 *            last_name:
 *             type: string
 *             description: Último nome do usuário.
 *             example: Ogg
 *             required: false
 *            email:
 *             type: string
 *             description: Email do usuário.
 *             example: arthurdiesel@outlook.com
 *             required: true
 *       responses:
 *        201:
 *         description: Atualiza um usuário com os dados informados.   
 */
router.put('/:id', async (req, res) => {
    res.status(200).json({data: await knex('users').where('id', req.params.id).update(req.body)})
})

/**
 * @swagger
 *
 * /users/{id}:
 *      delete:
 *          parameters:
 *          - in: path
 *            name: id
 *            schema:
 *             type: integer
 *            required: true
 *            description: id de um usuário.
 *          responses:
 *              200:
 *                  description: Deleta os dados de um registro com o id informado.
 */
router.delete('/:id', async (req, res) => {
    res.status(200).json({data: await knex('users').where('id', req.params.id).del()})
})

module.exports = router;