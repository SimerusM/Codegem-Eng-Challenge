const FeedbackRepository = require("./feedback.js");
const DatabaseFactory = require("../providers/database");

jest.mock("../providers/database", () => ({
    getDatabaseProvider: jest.fn()
}));

describe("FeedbackRepository", () => {
    let feedbackRepository;
    let dbProviderMock;

    beforeEach(() => {
        dbProviderMock = {
            add: jest.fn().mockResolvedValue([1])
        };

        DatabaseFactory.getDatabaseProvider.mockReturnValue(dbProviderMock);

        feedbackRepository = new FeedbackRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("saveFeedback", () => {
        it("this test should save feedback to the database and return the id on success", async () => {
            const feedbackData = {
                source: "user",
                feedback: "Great job!"
            };

            const expectedId = 1;

            const savedId = await feedbackRepository.saveFeedback(feedbackData);

            expect(savedId).toBe(expectedId);
            expect(dbProviderMock.add).toHaveBeenCalledWith(
                feedbackRepository.tableName,
                feedbackData
            );
        });
    });
});






