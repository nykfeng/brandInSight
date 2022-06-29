module.exports.logoStorage = ( req, res, next, storagePath)=> {
    storagePath.params.folder = `BrandInSight/brands/${brandId}`;
    next();
};