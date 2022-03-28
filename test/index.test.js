const chai=require("chai")
const chaiHttp=require("chai-http")
const should=chai.should()
const server=require("../app")  
const jwtMidware=require("../middlewere/jwtmidware")

chai.use(chaiHttp)

describe("api movesni testdan o'tkazish " ,()=>{
it("get orqali api moviesni korish" , (done)=>{
    chai.request(server)
    .get("/api/movies")
    .end((err,res)=>{
        if (err){
            console.log("bunday router mavzud emas");
        }
        res.should.have.status(200)
        done()
    })
})
})


describe("autentifikatsiya qismini  testdan o'ykazish" ,()=>{
    before((done)=>{
        chai.request(server)
        .post("/authenticate")
        .send({ username:"Azizbek" ,password:"12345"        })
        .end((err , res)=>{
            console.log(token)
            res.should.have.status(200)
            done()
        })
    })
})


// describe("/api moviesga token bilan kiritish test" ,()=>{
//     it ("get metodida" , (done)=>{
//         chai.request(server)
//         .get("/api/movies")
//         .set("x-access-token" , token)
//         .end((err , res)=>{
//             res.should.have.status(200)
//             res.body.should.be.an("array")
//             done()
//         }) 

//     })
// })
describe("autentificate qismini testdan o'tqazish" , ()=>{
    before((done) => {
        chai.request(server)
        .post("/user/aut")
        .send({username: "Aziz" , password: "12345"})
        .end((err , res)=>{
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1ha3RhYiIsImlhdCI6MTY0ODQ1NzM4OCwiZXhwIjoxNjQ4NDU3NjI4fQ.p0pkfGIKeEg6YFQgog8hK205Jlt5g9OYjmUtfmfc3fw"
            console.log(token);
            done()
        })
    });
    describe("/api moviesga kirish" , ()=>{
        it('get metodi yordamida', (done) => {
            chai.request(server)
            .get("/api/movies")
            .set("x-access-token" , token)
            .end((err , res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
        });
    })

    describe("kino qo'shishni testlash" , ()=>{
        it("kino qo'shish" , ()=>{
            const movies = {
                title: "Kino", 
                country: "USA",
                year: "1547"
            }

            chai.request(server)
            .post("/api/directors")
            .set("x-access-token" , token)
            .send(movies)
            .end((err , res)=>{
                res.should.have.status(200)
                res.should.be.a("object")
                res.should.have.property(title)
                res.should.have.property(country)
                res.should.have.property(year)
            })
            
    })
})
})
