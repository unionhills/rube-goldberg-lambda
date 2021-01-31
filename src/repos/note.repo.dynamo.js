const dynamoose = require("dynamoose");

class DynamoNoteRepository {
    static #instance;
    #model;

    static getInstance() {
        if (!DynamoNoteRepository.instance) {
            DynamoNoteRepository.instance = new DynamoNoteRepository();
        }

        return DynamoNoteRepository.instance;
    }

    constructor() {
        this.model = this.createModel();
    }

    createModel() {
        const NoteSchema = new dynamoose.Schema({
            _id: { type: String },
            subject: { type: String },
            body: { type: String },
            correlationId: { type: String },
            trace: { type: Array, schema: [String] }
        }, {
            saveUnknown: true,
            timestamps: true
        });

        return dynamoose.model('Note', NoteSchema);
    }

    async findAll() {
        try {
            const docs = await this.model.find({}).exec();

            console.log(`found docs=\n${docs}`);
            return docs;
        } catch (err) {
            err.stack;
        }
    }

    async findById(id) {
        try {
            const doc = await this.model.findById(id).exec();

            console.log(`found doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }

    async create(newNote) {
        try {
            const doc = await this.model.create(newNote);

            console.log(`created doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }
}

module.exports = DynamoNoteRepository;
