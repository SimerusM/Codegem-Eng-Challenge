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
        it("this test should save feedback to the database", async () => {
            const feedbackData = {
                source: "User",
                feedback: "This is some feedback for the manager"
            };
      
            const id = await feedbackRepository.saveFeedback(feedbackData);
      
            expect(dbProviderMock.add).toHaveBeenCalledWith(
                "feedback",
                expect.objectContaining(feedbackData)
            );
            expect(id).toBe(1);
        });
      
        it("this test should return the ID of the saved feedback", async () => {
            const feedbackData = {
                source: "Manager",
                feedback: "Another feedback for the manager"
            };
      
            const id = await feedbackRepository.saveFeedback(feedbackData);
      
            expect(id).toBe(1);
        });
    });
});






