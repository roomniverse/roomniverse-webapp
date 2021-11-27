import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class PostsCollection {
  constructor() {
    this.name = 'PostsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      image: String,
      user: String,
      date: Number,
      summary: String,
      meta: Number,
    }, {
      extraText: { type: String, optional: true },
      extraImages: { type: Array, optional: true },
      optional: true,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.username`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Posts = new PostsCollection();
