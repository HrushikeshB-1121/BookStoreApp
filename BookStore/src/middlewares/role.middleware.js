export function userRole(req,res,next){
    req.body.role = "user";
    next();
}

export function adminRole(req,res,next){
    req.body.role = "admin";
    next();
}