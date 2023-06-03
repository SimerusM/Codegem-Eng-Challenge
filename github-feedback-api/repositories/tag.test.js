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
        it("this test should save a single tag to the database on success", () => {
        const tag = { feedbackId: 1, id: 1, name: "Imapctful Work" };

        tagRepository.saveTag(tag);

        expect(dbProviderMock.add).toHaveBeenCalledWith(
            tagRepository.tableName,
            {
                feedback_id: tag.feedbackId,
                id: tag.id,
                name: tag.name
            }
        );
        });
    });

    describe("saveTags", () => {
        it("this test should save multiple tags to the database on success", () => {
        const tags = [
            { feedbackId: 1, id: 1, name: "Mentorship" },
            { feedbackId: 2, id: 2, name: "Learning" }
        ];

        tagRepository.saveTags(tags);

        const expectedEntities = tags.map(tag => ({
            feedback_id: tag.feedbackId,
            id: tag.id,
            name: tag.name
        }));

        expect(dbProviderMock.addMany).toHaveBeenCalledWith(
            tagRepository.tableName,
            expectedEntities
        );
        });
    });
});
