const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("PUT /api/concerts", () => {
    let concertId;
    before(async () => {
        const testConcert = new Concert({
            performer: "Test Performer",
            genre: "Test Genre",
            price: 50,
            day: 1,
            image: "test-image.jpg"
        });
        await testConcert.save();
        concertId = testConcert._id;
    });
    it("/:id should update chosen document and return success", async () => {
        const res = await request(server)
            .put(`/api/concerts/${concertId}`)
            .send({ performer: "Updated Performer" });
        const updatedConcert = await Concert.findById(concertId);
        expect(res.status).to.equal(200);
        expect(updatedConcert.performer).to.equal("Updated Performer");
    });
    after(async () => {
        await Concert.deleteMany();
    });
});
