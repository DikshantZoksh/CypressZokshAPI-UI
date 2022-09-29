/// <reference types = "Cypress" />



describe('get API user tests',()=> {
    it('Get users',() => {
        cy.request({
            url : 'https://gorest.co.in/public/v2/users',
            method : 'GET',
            headers : {
                'Authorization' : "Bearer 59dff6c8ff6de4ee2251e86b1ab9283f8935af1ef3de30f402bb7f3c09a9e39e"
            }
        }).then((res)=> {
            expect(res.status).to.be.eq(200)
            //expect(res.body[0].id).to.be.eq(2382)
        })
        

    })
})