const express = require('express');
const router = express.Router();
const {
     getAllCategories ,
      getCategoryById ,
       newCategory ,
        deleteCategory,
        updateCategory
    } = require('../Controllers/categoryController')
const { isAuthenticatedUser , authorizeRoles} = require('../middlewares/auth')


//router.get(`/`, getAllCategories);
router.route('/categories').get(isAuthenticatedUser ,getAllCategories)

//router.post('/new',newCategory);
router.route('/category/new').post(isAuthenticatedUser,authorizeRoles('admin'),newCategory)

//router.put('/:id', updateCategory);
router.route('/category/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateCategory)
                            .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteCategory)
                            .get(isAuthenticatedUser,authorizeRoles('admin'),getCategoryById)

//router.get('/:id',getCategoryById);

//router.delete('/:id', deleteCategory);

module.exports = router ;