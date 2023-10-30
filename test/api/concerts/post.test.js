const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Concert = require("../../../models/concert.model");

const expect = chai.expect;
const request = chai.request;

chai.use(chaiHttp);

describe("POST /api/concerts", () => {
    it("/ should add a new concert", async () => {
        const newConcert = {
            performer: "New Performer",
            genre: "New Genre",
            price: 70,
            day: 3,
            image: "new-image.jpg"
        };
        const res = await chai.request(server).post("/api/concerts").send(newConcert);
        expect(res.status).to.equal(200);
        const savedConcert = await Concert.findOne({ performer: "New Performer" }); // Check that the concert has been saved to the DB
        expect(savedConcert).to.not.be.null;
    });
    after(async () => {
        await Concert.deleteMany();
    });
});