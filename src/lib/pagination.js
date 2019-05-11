module.exports = {
    getArrayPages: (current_page, page_amount) => {
        const pageStart = Math.floor((current_page-1)/page_amount)*page_amount+1
        let pages = [];
        for(let i = pageStart; i<pageStart+page_amount; i++){
            pages.push(i)
        }
        return pages
    }

}