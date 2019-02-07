const differenceBy = require('lodash/differenceBy');

const Parser = require('../services/parser');
const { Comments } = require('../models');
const parser = new Parser({
    product: '.productpage__title',
    comment: '[itemprop="reviewBody"]',
    author: '.comment_name_author'
});

module.exports = {
    showMainPage(req, res) {
        res.render('index', {
            id: 'main-page'
        });
    },

    async getPostsUrls(req, res) {
        let urls = req.body.posts_url.split(/\r\n/g);
        let data = await parser.getUrls(urls).getParse();
        let validData = [];

        data.forEach(productWithComments => {
            for (
                let index = 0;
                index < productWithComments.comment.length;
                index++
            ) {
                let obj = {};
                obj.product_name = productWithComments.product;
                obj.author = productWithComments.author[index];
                obj.comment = productWithComments.comment[index];

                validData.push(obj);
            }
        });

        res.render('index', {
            data: validData
        });
    },

    saveComments(req, res) {
        const { product_name, author, comment } = req.body;
        let dataForSave = [];

        for (let index = 0; index < author.length; index++) {
            let obj = {};
            obj.product_name = product_name[index];
            obj.author = author[index];
            obj.comment = comment[index];

            dataForSave.push(obj);
        }

        Comments.insertMany(dataForSave)
            .then(resData => {
                res.render('index', {
                    data: resData
                });
            })
            .catch();
    }
};
