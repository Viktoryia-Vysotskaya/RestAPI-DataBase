const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts/:id', () => {
    let concertId;
    before(async () => {
        const testConcert = new Concert({
            performer: 'Test Performer',
            genre: 'Test Genre',
            price: 50,
            day: 1,
            image: 'test-image.jpg'
        });
        await testConcert.save();
        concertId = testConcert._id;
    });
    it('should delete a specific concert by ID', async () => {
        const res = await request(server).delete(`/api/concerts/${concertId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.equal(concertId.toString());
        const deletedConcert = await Concert.findById(concertId);
        expect(deletedConcert).to.be.null;
    });
    it("should delete all concerts and return success", async () => {
        const res = await request(server).delete("/api/concerts");
        const newConcert = await Concert.findOne({ name: "Concert #1" });
        expect(res.status).to.equal(404);
        expect(newConcert).to.be.null;
    });
    it('should return 404 if concert not found', async () => {
        const res = await request(server).delete('/api/concerts/5d9f1159f8dce8d1ef2bee48');
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Not found...');
    });
    after(async () => {
        await Concert.deleteMany();
    });
});
