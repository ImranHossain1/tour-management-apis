const Package = require("../models/package");

exports.getPackageService= async (filters,queries)=>{
    const packages = await Package.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
    const totalPackages = await Package.countDocuments(filters)
    const pageCount = Math.ceil(totalPackages / queries.limit)
    return {totalPackages, pageCount, packages};
}
exports.getPackageByIdService= async (packageId)=>{
    const packages = await Package.findById(packageId)
    const result = await Package.updateOne(
        {_id: packageId},
        {
            $inc: {viewCount : 1}
        }
    )
    return {packages,result}
}

exports.getTreandingPackagesService = async()=>{
    const packages = await Package.find().sort({viewCount:-1}).limit(3)
    return packages
}
exports.getCheapestPackagesService = async()=>{
    const packages = await Package.find().sort({cost:1}).limit(3)
    return packages
}
exports.createPackageService = async (data) => {
    const package = await Package.create(data);
    return package;
  };

  exports.updatePackageByIdService = async (packageId, data) => {
    const result = await Package.updateOne(
        {_id: packageId}, 
        {$set: data},
        {
            runValidators: true,
        }
    );
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
  };
  
  exports.bulkUpdatePackageService = async (data) => {
    const packages = [];
    data.ids.forEach((package) => {
      packages.push(Package.updateOne({ _id: package.id }, package.data));
    });
    const result = await Promise.all(packages);
    return result;
  };

  // ----------------------Delete Services ------------------------------
  exports.deletePackageByIdService = async (id) => {
    const result = await Package.deleteOne({ _id: id });
    return result;
  };
  exports.bulkDeletePackageService = async (ids) => {
    const result = await Package.deleteMany({_id: ids});
    return result;
  };