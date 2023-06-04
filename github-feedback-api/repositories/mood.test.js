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
        it("this test should save a mood to the database", () => {
            const mood = { feedbackId: 1, id: 1, mood: "Sad" };
      
            moodRepository.saveMood(mood);
      
            expect(dbProviderMock.add).toHaveBeenCalled();
        });
      
        it("this test should save a mood with the correct table name", () => {
            const mood = { feedbackId: 1, id: 1, mood: "Sad" };
    
            moodRepository.saveMood(mood);
    
            expect(dbProviderMock.add).toHaveBeenCalledWith(
                "mood",
                expect.any(Object)
            );
        });
      
        it("this test should save a mood with the correct data", () => {
            const mood = { feedbackId: 1, id: 1, mood: "Sad" };
      
            moodRepository.saveMood(mood);
      
            expect(dbProviderMock.add).toHaveBeenCalledWith(
                expect.any(String),
                {
                    feedback_id: expect.any(Number),
                    id: expect.any(Number),
                    mood: expect.any(String)
                }
            );
        });
    });

    describe("saveMoods", () => {
        it("this test should save multiple moods to the database", () => {
            const moods = [
                { feedbackId: 1, id: 1, mood: "Neutral" },
                { feedbackId: 2, id: 2, mood: "Sick" }
            ];
      
            moodRepository.saveMoods(moods);
      
            expect(dbProviderMock.addMany).toHaveBeenCalled();
        });
      
        it("this test should save multiple moods with the correct table name", () => {
            const moods = [
                { feedbackId: 1, id: 1, mood: "Neutral" },
                { feedbackId: 2, id: 2, mood: "Sick" }
            ];
      
            moodRepository.saveMoods(moods);
      
            expect(dbProviderMock.addMany).toHaveBeenCalledWith(
                "mood",
                expect.any(Array)
            );
        });
      
        it("this test should save multiple moods with the correct data", () => {
            const moods = [
                { feedbackId: 1, id: 1, mood: "Neutral" },
                { feedbackId: 2, id: 2, mood: "Sick" }
            ];
      
            moodRepository.saveMoods(moods);
      
            expect(dbProviderMock.addMany).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([
                    expect.objectContaining({
                    feedback_id: expect.any(Number),
                    id: expect.any(Number),
                    mood: expect.any(String)
                    })
                ])
            );
        });
    });
});