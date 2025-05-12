import { type Document, type FlattenMaps, type Types } from 'mongoose';

declare global {
  type LeanDocument<T extends Document = string> = FlattenMaps<
    Omit<T, keyof Document> & { _id: Types.ObjectId }
  >;
}
