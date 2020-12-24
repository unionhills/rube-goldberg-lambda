import * as dynamoose from "dynamoose";

export class DynamoNoteRepository {
    static #instance;
    #model;

    constructor() {
        this.model = this.createModel();
    }

    static getInstance() {
        if (!MongoNoteRepository.instance) {
            MongoNoteRepository.instance = new MongoNoteRepository();
        }

        return MongoNoteRepository.instance;
    }

    #createModel() {
        const NoteSchema = new dynamoose.Schema({
            id: { type: String },
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
/*
    public async findAll(): Promise<INoteDocument[]> {
        try {
            const docs = await this.model.find({}).exec();

            console.log(`found docs=\n${docs}`);
            return docs;
        } catch (err) {
            err.stack;
        }
    }

    public async findById(id: string): Promise<INoteDocument> {
        try {
            const doc = await this.model.findById(id).exec();

            console.log(`found doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }
*/
     async create(newNote) {
        try {
            const doc = await this.model.create(newNote);

            console.log(`created doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }
/*
    public async update(id: string, note: INote): Promise<INoteDocument> {
        try {
            const doc = await this.model.findByIdAndUpdate(id, note);

            console.log(`updated doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }

    public async delete(id: string): Promise<INoteDocument> {
        try {
            const doc = await this.model.findByIdAndDelete(id).exec();

            console.log(`deleted doc =\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }
*/
}
