const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server");
const Concert = require("../../../models/concert.model");

const expect = chai.expect;
const request = chai.request;

chai.use(chaiHttp);

describe("GET /api/concerts", () => {
    before(async () => {
        const concertOne = new Concert({
            performer: "Performer 1",
            genre: "Genre 1",
            price: 50,
            day: 1,
            image: "image1.jpg"
        });
        await concertOne.save();

        const concertTwo = new Concert({
            performer: "Performer 2",
            genre: "Genre 2",
            price: 60,
            day: 2,
            image: "image2.jpg"
        });
        await concertTwo.save();
    });
    it("GET /api/concerts should return all concerts", async () => {
        const initialCount = await Concert.countDocuments();
        const res = await chai.request(server).get("/api/concerts");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(initialCount);
    });
    it("GET /api/concerts/random should return a random concert", async () => {
        const res = await chai.request(server).get("/api/concerts/random");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
    });
    it("GET /api/concerts/:id should return a specific concert by ID", async () => {
        const concert = await Concert.findOne({ performer: "Performer 1" });
        const res = await chai.request(server).get(`/api/concerts/${concert._id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body.performer).to.equal("Performer 1");
    });
    it("GET /api/concerts/performer/:performer should return concerts by performer", async () => {
        const res = await chai.request(server).get("/api/concerts/performer/Performer 1");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].performer).to.equal("Performer 1");
    });
    it("GET /api/concerts/genre/:genre should return concerts by genre", async () => {
        const res = await chai.request(server).get("/api/concerts/genre/Genre 1");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].genre).to.equal("Genre 1");
    });
    it("GET /api/concerts/price/:price_min/:price_max should return concerts by price range", async () => {
        const res = await chai.request(server).get("/api/concerts/price/40/60");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(2);
    });
    it("GET /api/concerts/day/:day should return concerts by day", async () => {
        const res = await chai.request(server).get("/api/concerts/day/1");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].day).to.equal(1);
    });
    after(async () => {
        await Concert.deleteMany();
    });
});
