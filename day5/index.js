//fetch wishes using axios
//for each wish, get data, perform language analysis on it
const axios = require('axios');
const {get_language, get_sentiments} = require('./cognitives');

module.exports = async function (context, req) {
    let dataUrl = 'https://christmaswishes.azurewebsites.net/api/Wishes';
    try {
        let getData = await axios.default.get(dataUrl);
        let data = getData.data;
        //get language
        let languageDocuments = {
            "documents" : []
        }
        for (let index = 0; index < data.length; index++) {
            let text = data[index] && (data[index].message || data[index].mssage);
            let document = {
                id: index + 1,
                text
            }
            languageDocuments.documents.push(document)
        }

        let getLanguage = await get_language(languageDocuments);
        let language = getLanguage.data;

        //get sentiments
        let sentimentDocuments = {
            "documents" : []
        }
        for (let index = 0; index < data.length; index++) {
            let text = data[index] && (data[index].message || data[index].mssage);
            let document = {
                id: index + 1,
                language: language.documents && language.documents[index] 
                            && language.documents[index].detectedLanguages[0].iso6391Name,
                text
            }
            sentimentDocuments.documents.push(document)

        }
        let getSentiment = await get_sentiments(sentimentDocuments);
        let sentiment = getSentiment.data;

        //classify as naughty or nice
        let santaList = []
        for (let index = 0; index < data.length; index++) {
            let who = data[index].who;
            let state = sentiment.documents[index].score >= 0.5 ? 'Nice' : 'Naughty';
            let child = {
                who, 
                state
            }
            santaList.push(child)
        }
        context.res = {
            status: 200,
            body: santaList
        };
    } catch (error) {
        context.log(error)
        context.res = {
            status: 500,
            body: "An error occurred - "+ error
        };
    }
};