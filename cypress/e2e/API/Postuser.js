// /// <reference types = "Cypress" />

// //const { default: allureWriter } = require('@shelex/cypress-allure-plugin/writer')
// const jsondata = require('../../fixtures/Testuser.json')

// describe('Post user tests',()=>{

//     it('create a user',()=>{
        
//         cy.request({

//             method : 'POST',
//             url : 'https://gorest.co.in/public/v2/users',
//             headers : {
//                 'Authorization' : "Bearer 59dff6c8ff6de4ee2251e86b1ab9283f8935af1ef3de30f402bb7f3c09a9e39e"
//             },
//             body : {
//                 "name" : jsondata.name,
//                 "email" : jsondata.email,
//                 "gender": jsondata.gender,
//                 "status" : jsondata.status
//             }
//         }).then((res)=>{
//             expect(res.status).to.be.eq(201)
//             expect(res.body).has.property('name',jsondata.name)
//             expect(res.body).has.property('email',jsondata.email)
//             expect(res.body).has.property('gender',jsondata.gender)
//             expect(res.body).has.property('status',jsondata.status)
//         })


//     })




// })