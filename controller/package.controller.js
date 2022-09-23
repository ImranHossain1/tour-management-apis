const Package = require("../models/package")
const { createPackageService, getPackageService, updatePackageByIdService, deletePackageByIdService, bulkUpdatePackageService, bulkDeletePackageService, getPackageByIdService, getTreandingPackagesService, getCheapestPackagesService } = require("../services/package.services")

// ---------------------Get Controllers---------------------
exports.getPackage = async(req,res,next)=>{
    try {
        let filters = {...req.query};
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach(field=>delete filters[field])
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g,match =>`$${match}` )
        filters =  JSON.parse(filtersString)
        const queries = {}
        if(req.query.sort){
          const sortBy = req.query.sort.split(',').join(' ')
          queries.sortBy = sortBy
        }
        if(req.query.fields){
          const fields = req.query.fields.split(',').join(' ')
          queries.fields = fields
          console.log(fields)
        }
        if(req.query.page){
          const {page=0, limit=10} = req.query ;
          const skip = (parseInt(page)-1)* parseInt(limit);
          queries.skip = skip;
          queries.limit = parseInt(limit);
  
         }
        //console.log(filters,queries)
        const packages = await getPackageService(filters, queries)
        res.status(200).json({
            status:'success',
            data: packages
          })
    } catch (error) {
        res.status(400).json({
            status:'failed',
            error: error.message,
            message:"Can't get the data"
          })
    }

}
exports.getPackageById = async(req,res,next)=>{
  try {
    const {id} = req.params;
    const package = await getPackageByIdService(id)
    res.status(200).json({
      status:'success',
      data: package
    })
  } catch (error) {
    res.status(400).json({
      status:'failed',
      error: error.message,
      message:"Can't get the data"
    })
  }
}

exports.getTrendingPackages= async(req,res,next)=>{
  try {
    const package = await getTreandingPackagesService()
    res.status(200).json({
      status:'success',
      data: package
    })
  } catch (error) {
    res.status(400).json({
      status:'failed',
      error: error.message,
      message:"Can't get the data"
    })
  }
}
exports.getCheapestPackages= async(req,res,next)=>{
  try {
    const package = await getCheapestPackagesService()
    res.status(200).json({
      status:'success',
      data: package
    })
  } catch (error) {
    res.status(400).json({
      status:'failed',
      error: error.message,
      message:"Can't get the data"
    })
  }
}
// ---------------------Post Controllers---------------------
exports.createPackage =async(req,res,next)=>{
    try {
      const result = await createPackageService(req.body)
      res.status(200).json({
        status: 'success',
        message:'Data inserted successfully!',
    })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: 'Data is not inserted',
        error: error.message
      })
    }
  }
    // ----------------------Update Conttrollers ------------------------------
  exports.updatePackageById = async (req,res,next)=>{
    try {
      const {id} = req.params;
      const result = await updatePackageByIdService(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Successfully updated the package",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't update the Package",
        error: error.message
      })
    }
  }

  exports.bulkUpdatePackage = async (req,res,next)=>{
    try {
      const result = await bulkUpdatePackageService(req.body);
      res.status(200).json({
        status: "success",
        message: "Successfully updated the packages",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't update the package",
        error: error.message
      })
    }
  }


  // ----------------------Delete Controllers ------------------------------
  exports.deletePackageById = async (req,res,next)=>{
    try {
      const {id} = req.params;
      const result = await deletePackageByIdService(id);
      if(!result.deletedCount){
        return res.status(400).json({
          status : "Failed",
          error:"Couldn't delete the undefined package"
        })
      }
      res.status(200).json({
        status: "success",
        message: "Successfully Deleted the package",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't delete the package",
        error: error.message
      })
    }
  }
  exports.bulkDeletePackage = async (req,res,next)=>{
    try {
      // console.log(req.body)
      const result = await bulkDeletePackageService(req.body.ids);
      if(!result.deletedCount){
        return res.status(400).json({
          status : "Failed",
          error:"Couldn't delete the undefined package"
        })
      }
      res.status(200).json({
        status: "success",
        message: "Successfully Deleted the given packages",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't delete the packages",
        error: error.message
      })
    }
  }