import { model, Model, Document, Schema } from "mongoose";

type Reply = {
    date: Date,
    reply_username: string,
    comments: string,
    like: number,
}

export interface IContent extends Document {
    username: string,
    timestamp: Date,
    content: string,
    imageUrls: string[],
    reply: Reply[],
    like: number,
    geolocation: {
        lat: number,
        lng: number,
    },
}

const ReplySchema: Schema = new Schema({
    timestamp: { type: Date, default: Date.now },
    username: { type: String, required: true },
    comments: { type: String, required: false },
    like: { type: Number, default: 0 }
})

const ContentSchema: Schema = new Schema({
    username: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    content: { type: String, required: true },
    imageUrls: { type: [String], required: false },
    reply: { type: [ReplySchema], required: false },
    like: { type: Number, default: 0 },
    geolocation: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
});

export const ContentModel: Model<IContent> = model<IContent>('content', ContentSchema);