var notion_package = require("@notionhq/client");
const notion = new notion_package.Client({ auth: process.env.NOTION_API_KEY })
const databaseId = "3d9914a07dd546babd0e8f741c9ebfa7"

async function getLearnings() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 3,
      filter: {
              property: "Tags",
              multi_select: {
                contains: "learnings",
              }
          },
      sorts: [
        {
          property: 'next_for_review',
          direction: 'ascending',
        },
      ],
    });

    console.log(response.results);

    var results = [];

    response.results.forEach((page) => {
      results.push(page.url)});

    console.log(results);
    return results;

  } catch (error) {
    console.error(error.body)
  }
}

/*
Get the learnings from Lambda, then send the email
*/

const learnings = getLearnings();
console.log(learnings);

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });

exports.handler = async function (event) {
  var params = {
    Destination: {
      ToAddresses: ["sharang.phadke@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: learnings.join("\n") },
      },

      Subject: { Data: "Your Insights" },
    },
    Source: "sharang.phadke@gmail.com",
  };

  return ses.sendEmail(params).promise()
};
