module.exports.logoStorage = ( req, res, next, storagePath)=> {
    console.log(req.body);
    // const brandId = req.params.id;
    storagePath.params.folder = `BrandInSight/brands/${brandId}`;
    next();
};