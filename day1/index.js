module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let faces = ["נ - Nun", "ג - Gimmel"," ה - Hay"," ש - Shin"]
    let index = Math.floor(Math.random() * 4);
    try {
        let face = faces[index];
        context.res = {
            status: 200,
            body: face
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: `An error occured - ${error}`
        };
    }
    
};