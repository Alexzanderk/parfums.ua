const cheerio = require('cheerio');
const axios = require('axios');

class Parser {
	constructor({product, author, comment}) {
		this.product = product;
		this.author = author;
		this.comment = comment;
	}
    
	getUrls(urls) { 
		this.urls = urls;
		return this;
	}
    
	async getParse() {
		let result = await Promise.all(this.urls.map(url => axios
			.get(url)
			.then(({data}) => data)
			.catch(err => console.log(err)))
        );
    
        let arrData = [];
        result.forEach(html => {
            this.$ = cheerio.load(html);
            
            let arrComments = [];
            let arrAuthors = [];
            let product = this.$(this.product).text();
            
            this.$(this.comment).each((i, el) => {
                const comment = this.$(el).text();
                arrComments.push(comment);
            });
            
            this.$(this.author).each((i, el) => {
                const author = this.$(el).text();
                arrAuthors.push(author);
            });
            
            let obj = {
                product,
                author: arrAuthors,
                comment: arrComments
            };
            arrData.push(obj);
            
        });
        
        return arrData
	}
    
}

module.exports = Parser;