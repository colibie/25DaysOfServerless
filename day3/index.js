const cloudinary = require('cloudinary');

cloudinary.v2.config({ 
    cloud_name: 'chidera', 
    api_key: '936829418472969', 
    api_secret: 'IDYdfXXPRwHM6tJosmCEVQn6_Zo' 
  });

module.exports = async function (context, req) {
    //assign url: https://github.com/Je-ni/25DaysOfServerless/blob/master/cheta_schem.jpg?raw=true
    let files = req.body.head_commit && req.body.head_commit.added
    if (files){
        for (file of files){
            let splitFile = file.split('.');
            let end = splitFile[splitFile.length - 1];
            context.log(splitFile, end)
            if (["png","jpg", "jpeg"].includes(end)) {
                //upload to cloudinary
                let url = `${req.body.repository.url}/blob/${req.body.repository.default_branch}/${file}?raw=true`
                context.log(file, url)
                await cloudinary.v2.uploader.upload(url, function(err, result){
                    if (err) context.res = {status: 500, body: err}
                    context.res = {
                        status: 200,
                        body: "Image uploaded successfully to " + result.url
                    }
                })
            }else {
                context.res = {
                    status: 400,
                    body: 'No image found'
                }
            }
        }
    }else {
        context.res = {
            status: 400,
            body: 'No image found'
        }
    }
};