const Octokit = require("@octokit/rest");
const { github_token } = require('./config')
module.exports = async function (context, req) {
    let issue = req.body.action
    if (issue === 'created' || issue === 'opened'){
        let creator = req.body.sender.login;
        let owner = req.body.repository.owner.login;
        let repo = req.body.repository.name;
        let issue_number = req.body.issue.number
        let body = `Hiii ${creator} :), thanks a lot for opening this issue.

                    I hope you have a happy holidays.🚀`
        try {
            const octokit = Octokit({
                auth: process.env['GITHUB_tOKEN'] || github_token,      
                baseUrl: 'https://api.github.com',                        
                log: {
                debug: () => {},
                info: () => {},
                warn: console.warn,
                error: console.error
                },
                request: {
                agent: undefined,
                fetch: undefined,
                timeout: 0
                }
            })
            let data = await octokit.issues.createComment({
                owner,
                repo,
                issue_number,
                body
                })
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: data
            };
        } catch (error) {
            context.res = {
                status: error.status,
                body: error
            };
        }
    }else {
        context.res = {
            body: "no action required - issue not created"
        }
    }
};