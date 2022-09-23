const express = require ('express');
const packageController = require('../controller/package.controller');
const router = express.Router();

router.route('/bulk-update').patch(packageController.bulkUpdatePackage)
router.route('/bulk-delete').delete(packageController.bulkDeletePackage)

router.route('/trending').get(packageController.getTrendingPackages)
router.route('/cheapest').get(packageController.getCheapestPackages)

router.route('/')
.get(packageController.getPackage)
.post(packageController.createPackage)

router.route("/:id")
.get(packageController.getPackageById)
.patch(packageController.updatePackageById)
.delete(packageController.deletePackageById)
module.exports = router 