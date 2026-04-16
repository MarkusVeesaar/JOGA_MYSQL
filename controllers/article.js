const con = require('../utils/db');

const getAllArticles = async (req, res) => {
    const [articles] = await con.promise().query("SELECT * FROM article")
  res.render("index", { articles: articles });
};


const getArticleBySlug = (req, res) => {
    let query = `SELECT * FROM article WHERE slug="${req.params.slug}"`;

    con.query(query, (err, result) => {
        if (err) throw err;
        let article = result[0];
        let query2 = `SELECT name FROM author WHERE id="${article.author_id}"`;

        con.query(query2, (err, authorResult) => {
            if (err) throw err;

            article.author_name = authorResult[0].name;

            console.log(article);

            res.render('article', {
                article: article
            });
        });
    });
};

const getAuthorByIdAndArticles = async (req, res) => {
    const [articles] = await con.promise().query(`SELECT * FROM article WHERE author_id="${req.params.author_id}"`)
    const [author] = await con.promise().query(`SELECT * FROM author WHERE id="${req.params.author_id}"`)
    const authorData = author[0];
    authorData.articles = articles;
    res.render("author", { author: authorData });
};

module.exports = {
    getAllArticles,
    getArticleBySlug,
    getAuthorByIdAndArticles
};
