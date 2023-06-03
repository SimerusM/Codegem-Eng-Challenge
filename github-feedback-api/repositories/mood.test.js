const MoodRepository = require("./mood.js");
const DatabaseFactory = require("../providers/database");

jest.mock("../providers/database", () => ({
    getDatabaseProvider: jest.fn()
}));

describe("MoodRepository", () => {
    let moodRepository;
    let dbProviderMock;

    beforeEach(() => {
        dbProviderMock = {
            add: jest.fn(),
            addMany: jest.fn()
        };

        DatabaseFactory.getDatabaseProvider.mockReturnValue(dbProviderMock);

        moodRepository = new MoodRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("saveMood", () => {
        it("this test should save a single mood to the database on success", () => {
        const mood = { feedbackId: 1, id: 1, mood: "Sad" };

        moodRepository.saveMood(mood);

        expect(dbProviderMock.add).toHaveBeenCalledWith(
            moodRepository.tableName,
            {
                id: mood.id,
                feedback_id: mood.feedbackId,
                mood: mood.mood
            }
        );
        });
    });

    describe("saveMoods", () => {
        it("this test should save multiple moods to the database on success", () => {
        const moods = [
            { feedbackId: 1, id: 1, mood: "Neutral" },
            { feedbackId: 2, id: 2, mood: "Sick" }
        ];

        moodRepository.saveMoods(moods);

        const expectedEntities = moods.map(mood => ({
            id: mood.id,
            feedback_id: mood.feedbackId,
            mood: mood.mood
        }));

        expect(dbProviderMock.addMany).toHaveBeenCalledWith(
            moodRepository.tableName,
            expectedEntities
        );
        });
    });
});