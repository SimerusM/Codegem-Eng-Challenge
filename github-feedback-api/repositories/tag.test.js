const TagRepository = require("./tag.js");
const DatabaseFactory = require("../providers/database");

jest.mock("../providers/database", () => ({
    getDatabaseProvider: jest.fn()
}));

describe("TagRepository", () => {
    let tagRepository;
    let dbProviderMock;

    beforeEach(() => {
        dbProviderMock = {
            add: jest.fn(),
            addMany: jest.fn()
        };

        DatabaseFactory.getDatabaseProvider.mockReturnValue(dbProviderMock);

        tagRepository = new TagRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("saveTag", () => {
        it("this test should save a tag to the database", () => {
            const tag = { feedbackId: 1, id: 1, name: "Imapctful Work" };
      
            tagRepository.saveTag(tag);
      
            expect(dbProviderMock.add).toHaveBeenCalled();
        });

        it("this test should save a tag with the correct table name", () => {
            const tag = { feedbackId: 1, id: 1, name: "Imapctful Work" };
      
            tagRepository.saveTag(tag);
      
            expect(dbProviderMock.add).toHaveBeenCalledWith(
                "tag",
                expect.any(Object)
            );
        });
      
        it("this test should save a tag with the correct data", () => {
            const tag = { feedbackId: 1, id: 1, name: "Imapctful Work" };
      
            tagRepository.saveTag(tag);
      
            expect(dbProviderMock.add).toHaveBeenCalledWith(
                expect.any(String),
                {
                    feedback_id: expect.any(Number),
                    id: expect.any(Number),
                    name: expect.any(String)
                }
            );
        });
    });

    describe("saveTags", () => {
        it("this test should save multiple tags to the database", () => {
            const tags = [
                { feedbackId: 1, id: 1, name: "Mentorship" },
                { feedbackId: 2, id: 2, name: "Learning" }
            ];
      
            tagRepository.saveTags(tags);
      
            expect(dbProviderMock.addMany).toHaveBeenCalled();
        });

        it("this test should save multiple tags with the correct table name", () => {
            const tags = [
                { feedbackId: 1, id: 1, name: "Mentorship" },
                { feedbackId: 2, id: 2, name: "Learning" }
            ];
      
            tagRepository.saveTags(tags);
      
            expect(dbProviderMock.addMany).toHaveBeenCalledWith(
              "tag",
              expect.any(Array)
            );
        });
      
        it("this test should save multiple tags with the correct data", () => {
            const tags = [
                { feedbackId: 1, id: 1, name: "Mentorship" },
                { feedbackId: 2, id: 2, name: "Learning" }
            ];
      
            tagRepository.saveTags(tags);
      
            expect(dbProviderMock.addMany).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining([
                    expect.objectContaining({
                    feedback_id: expect.any(Number),
                    id: expect.any(Number),
                    name: expect.any(String)
                    })
                ])
            );
        });
    });
});
